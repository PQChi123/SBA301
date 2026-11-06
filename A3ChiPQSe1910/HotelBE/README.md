# Hotel Booking API

## Run locally

Run `mvn spring-boot:run` from `HotelBE` after configuring the SQL Server connection in `src/main/resources/application.properties`.

The local staff account is configured in `src/main/resources/application.properties` as `staff@hotel.local` / `ChangeMe123!`. Change these values for your environment. The JWT signing key is also configured there and must contain at least 32 bytes.

For this learning project, customer passwords are stored and compared as plain text to match the current database setup. This is not safe for a production application. Existing BCrypt hashes from a previous run will not work with plain-text comparison; reset those accounts' passwords.

## API access

- Guest: `GET /api/rooms` and `GET /api/rooms/{id}`.
- Authentication: `POST /api/auth/register` and `POST /api/auth/login`.
- Customer: use a bearer token for profile, booking creation, booking history, and cancellation endpoints.
- Staff: configure the staff credential properties and use its bearer token for customer, room, and booking administration.

Import `postman/HotelBooking.postman_collection.json` and `postman/HotelBooking.local.postman_environment.json` to exercise the API. Set the staff password to the value in `application.properties`. The room booking request uses a sample future date; select a room that is available for that date range.
