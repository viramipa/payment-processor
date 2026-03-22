package payment_processor

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const (
	secretKey = "payment_processor_secret_key"
)

func GenerateToken() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(15 * time.Minute).Unix(),
	})
	return token.SignedString([]byte(secretKey))
}

func VerifyToken(tokenString string) (bool, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC);!ok {
			return nil, errors.New("invalid token method")
		}
		return []byte(secretKey), nil
	})
	if err!= nil {
		return false, err
	}
	if token.Valid {
		return true, nil
	}
	return false, errors.New("invalid token")
}

func GeneratePaymentID() (string, error) {
	b := make([]byte, 32)
	_, err := io.ReadFull(rand.Reader, b)
	if err!= nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(b), nil
}

func HashPassword(password string) (string, error) {
	hash := sha256.Sum256([]byte(password))
	return fmt.Sprintf("%x", hash), nil
}

func ValidatePassword(password, hashedPassword string) (bool, error) {
	hash := sha256.Sum256([]byte(password))
	return string(hash) == hashedPassword, nil
}

func SendEmail(subject, body string, to string) error {
	from := "payment.processor@example.com"
	auth := os.Getenv("MAILGUN_API_KEY")
	mg := mailgun.NewMailgun(auth)
	m := mg.NewMail(to, from, subject, body)
	_, err := m.Send()
	return err
}

func SendSMS(message string, to string) error {
	// Replace with your Twilio account SID and Auth Token
	accountSID := "your_account_sid"
	authToken := "your_auth_token"
	client := twilio.NewClient(accountSID, authToken)
	toNumber := twilio.NewPhoneNumber(to)
	fromNumber := twilio.NewPhoneNumber("+1234567890")
	message := twilio.NewMessage(fromNumber, toNumber, message)
	_, err := message.Send()
	return err
}

func GetIPFromRequest(r *http.Request) string {
	ip := r.Header.Get("X-Real-IP")
	if ip == "" {
		ip = r.Header.Get("X-Forwarded-For")
	}
	return ip
}