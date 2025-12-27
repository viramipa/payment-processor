from payment_processor.config import Config
from payment_processor.logic import PaymentProcessor
from payment_processor.models import Payment
from payment_processor.repositories import PaymentRepository
from payment_processor.services import PaymentService

def main():
    config = Config()
    payment_processor = PaymentProcessor(config)
    payment_repository = PaymentRepository(config)
    payment_service = PaymentService(payment_processor, payment_repository)

    while True:
        print("\n1. Create payment")
        print("2. Get payment")
        print("3. Update payment")
        print("4. Delete payment")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            payment = payment_service.create_payment()
        elif choice == "2":
            payment_id = int(input("Enter payment ID: "))
            payment = payment_service.get_payment(payment_id)
        elif choice == "3":
            payment_id = int(input("Enter payment ID: "))
            payment = payment_service.update_payment(payment_id)
        elif choice == "4":
            payment_id = int(input("Enter payment ID: "))
            payment_service.delete_payment(payment_id)
        elif choice == "5":
            break
        else:
            print("Invalid choice")

if __name__ == "__main__":
    main()