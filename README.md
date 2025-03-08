# Currency Converter with Transfer Tracking

## Technologies Used

- Next.js (App Router)
- TypeScript
- Mongoose ORM (MongoDB Atlas)
- React Query
- Material UI (MUI) for UI components

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/MrRevengerX/demo-currency-converter.git
   cd currency-converter
   ```
2. Install dependencies:
   ```sh
   bun install
   ```
3. Create a `.env` file and add:
   ```sh
   MONGODB_URI=your_mongodb_atlas_uri
   ```
4. Run the development server:
   ```sh
   bun dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/currency-records` – Fetch all transfer records
- `POST /api/currency-records` – Create a new transfer record
- `DELETE /api/currency-records` – Delete a transfer record

## Live Demo
[Hosted Demo](https://demo-currency-converter.vercel.app/)

