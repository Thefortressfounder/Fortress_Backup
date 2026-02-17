FROM golang:1.24-alpine
WORKDIR /app

# INSTALL SECURITY CERTIFICATES (Crucial for HTTPS calls)
RUN apk update && apk add --no-cache ca-certificates git

COPY . .
RUN go mod init fortress-stellar && \
    go get github.com/stellar/go/clients/horizonclient && \
    go build -o stellar-node .

CMD ["./stellar-node"]
