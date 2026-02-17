package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/stellar/go/clients/horizonclient"
)

// The Address we are watching (The Treasury)
const TARGET_ADDRESS = "GBHIZCC5DPDPNWVMY6IC4LRU7TKYVFCYRZBWYAQEBANYHKL7S25OH4DW"

type StellarStatus struct {
	Address    string `json:"address"`
	XlmBalance string `json:"xlm_balance"`
	CvtBalance string `json:"cvt_balance"`
	Status     string `json:"status"`
}

func main() {
	client := horizonclient.DefaultTestNetClient

	http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		// Fetch the account details from the real Stellar Network
		accountRequest := horizonclient.AccountRequest{AccountID: TARGET_ADDRESS}
		account, err := client.AccountDetail(accountRequest)

		var xlmBal, cvtBal string = "0.00", "0.00"
		var statusMsg = "SYNCED"

		if err != nil {
			fmt.Println("Error fetching Stellar account:", err)
			statusMsg = "ERROR"
		} else {
			// Parse Balances
			for _, balance := range account.Balances {
				if balance.Asset.Type == "native" {
					xlmBal = balance.Balance
				} else if balance.Asset.Code == "CVT" {
					cvtBal = balance.Balance
				}
			}
		}

		response := StellarStatus{
			Address:    TARGET_ADDRESS,
			XlmBalance: xlmBal,
			CvtBalance: cvtBal,
			Status:     statusMsg,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Fortress Stellar Node starting on port 8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
