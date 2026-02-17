package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/lib/pq"
)

// Database Credentials
const (
	host     = "fortress-db"
	port     = 5432
	user     = "postgres"
	password = "fortress"
	dbname   = "fortress"
)

type Asset struct {
	ID      int     `json:"id"`
	Name    string  `json:"name"`
	Symbol  string  `json:"symbol"`
	Price   float64 `json:"price"`
	Balance float64 `json:"balance"`
	Source  string  `json:"source"`
	Status  string  `json:"status"`
}

// Response from our Gateway
type GatewayPriceResponse struct {
	PriceUSD float64 `json:"price_usd"`
	Source   string  `json:"source"`
}

type StellarNodeResponse struct {
	XlmBalance string `json:"xlm_balance"`
	CvtBalance string `json:"cvt_balance"`
	Status     string `json:"status"`
}

func main() {
	// 1. Connect to the Vault
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal("Cannot connect to Vault:", err)
	}
	fmt.Println("Connected to Database & Ready for Live Signals.")

	http.HandleFunc("/api/dashboard", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		// A. FETCH THE LIST FROM DATABASE
		rows, err := db.Query("SELECT id, name, symbol, price, balance, source, status FROM assets ORDER BY id ASC")
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		defer rows.Close()

		var assets []Asset
		for rows.Next() {
			var a Asset
			if err := rows.Scan(&a.ID, &a.Name, &a.Symbol, &a.Price, &a.Balance, &a.Source, &a.Status); err == nil {
				assets = append(assets, a)
			}
		}

		// B. INJECT LIVE DATA (The "Live Wire")
		client := &http.Client{Timeout: 2 * time.Second}

		for i := range assets {
			// 1. UPDATE STELLAR & CVT (From Stellar Node)
			if assets[i].Symbol == "XLM" || assets[i].Symbol == "CVT" {
				resp, err := client.Get("http://fortress-stellar:8000/status")
				if err == nil {
					defer resp.Body.Close()
					var data StellarNodeResponse
					if json.NewDecoder(resp.Body).Decode(&data) == nil {
						if assets[i].Symbol == "XLM" {
							if val, err := strconv.ParseFloat(data.XlmBalance, 64); err == nil {
								assets[i].Balance = val
								assets[i].Status = "SYNCED (Live)"
							}
						}
						if assets[i].Symbol == "CVT" {
							if val, err := strconv.ParseFloat(data.CvtBalance, 64); err == nil {
								assets[i].Balance = val
								assets[i].Status = "SYNCED (Live)"
							}
						}
					}
				}
				continue 
			}

			// 2. UPDATE EVERYTHING ELSE (From Universal Gateway)
			// Don't check Stablecoins (USDT/USDC) price, assume $1.00 for now or add logic later
			if assets[i].Symbol != "USDT" && assets[i].Symbol != "USDC" {
				resp, err := client.Get("http://fortress-gateway:3003/api/price/" + assets[i].Symbol)
				if err == nil {
					defer resp.Body.Close()
					var data GatewayPriceResponse
					if json.NewDecoder(resp.Body).Decode(&data) == nil {
						if data.PriceUSD > 0 {
							assets[i].Price = data.PriceUSD
							assets[i].Source = "Live Market"
							assets[i].Status = "SYNCED (Gateway)"
						}
					}
				}
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(assets)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Fortress Brain v4.0 (Gateway Mode) listening on port %s...\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
