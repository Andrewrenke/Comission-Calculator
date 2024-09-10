# Commission calculator

This application is written in Node.js to calculate fees for "Cash In" and "Cash Out" transactions for individuals and businesses. It accepts a JSON file with transaction data and outputs the calculated fees for each transaction.

## Launch the app

### Installation steps

1. Clone the repository or download the project files.
2. Go to the project directory and install dependencies:

   ```bash
   npm install
   ```
## Run the app

   ```bash
   node App.js
   ```
   
### Ensure you set the correct path to your data file in `App.js`:

   ```javascript
   const DATA_PATH = './path/to/your/data.json';
   ```

### Run tests
   ```bash
   npx jest 
   ```
 
### Project Structure
1. App.js: Main entry point. Executes the commission calculation.
2. utils/commissions.js: Contains the logic for commission calculations.
3. data.json: Example data file with operations.