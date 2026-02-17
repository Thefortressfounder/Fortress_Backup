package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// The Standard Response for The Fortress
type AssetStatus struct {
	Service   string  `json:"service"`
	Symbol    string  `json:"symbol"`
	PriceUSD  float64 `json:"price_usd"`
	Status    string  `json:"status"`
	Timestamp string  `json:"timestamp"`
}

func main() {
	// Expose the internal API for The Fortress to consume
	http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		// In the future, this will connect to a real Bitcoin RPC node.
		// For now, it serves as the "Adapter" simulating the connection.
		status := AssetStatus{
			Service:   "Bitcoin Core (Fortress Adapter)",
			Symbol:    "BTC",
			PriceUSD:  98450.00,
			Status:    "SYNCED",
			Timestamp: time.Now().Format(time.RFC3339),
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(status)
	})

	fmt.Println("Fortress Bitcoin Node starting on port 8332...")
	if err := http.ListenAndServe(":8332", nil); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}
}
