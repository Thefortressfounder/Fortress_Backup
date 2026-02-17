# Build Stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o btc-node .

# Run Stage (Tiny Container)
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/btc-node .
EXPOSE 8332
CMD ["./btc-node"]
