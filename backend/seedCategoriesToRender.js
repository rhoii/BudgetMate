// Script to seed categories to your Render backend
// This will add the 10 predefined expense categories

const axios = require('axios');

const RENDER_BACKEND_URL = 'https://budgetmate-backend-ti71.onrender.com';

// Admin credentials
const ADMIN_EMAIL = 'admin@budgetmate.com';
const ADMIN_PASSWORD = 'admin123';

// The 10 expense categories
const categories = [
    'Housing',
    'Food',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Shopping',
    'Subscription',
    'Savings',
    'Other',
];

async function seedCategoriesToRender() {
    try {
        console.log(' Starting category seeding to Render backend...\n');
        console.log('Step 1: Logging in as admin...');

        // Login to get auth token
        const loginResponse = await axios.post(
            `${RENDER_BACKEND_URL}/api/auth/login`,
            {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            }
        );

        const token = loginResponse.data.token;
        console.log(' Logged in successfully!\n');

        console.log(`Step 2: Creating ${categories.length} expense categories...\n`);

        let successCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        // Create each category
        for (const name of categories) {
            try {
                await axios.post(
                    `${RENDER_BACKEND_URL}/api/categories`,
                    { name },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                successCount++;
                console.log(`  Created: ${name}`);
            } catch (error) {
                if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
                    skippedCount++;
                    console.log(`  Skipped: ${name} (already exists)`);
                } else {
                    errorCount++;
                    console.error(`  Failed: ${name} - ${error.response?.data?.message || error.message}`);
                }
            }
        }

        console.log(`\n Done!`);
        console.log(`Successfully created: ${successCount} categories`);
        if (skippedCount > 0) {
            console.log(`Already existed: ${skippedCount} categories`);
        }
        if (errorCount > 0) {
            console.log(`Failed: ${errorCount} categories`);
        }

        console.log('\n Categories are now available on your Render backend!');
        console.log('   These categories are used for:');
        console.log('   - Budget creation and tracking');
        console.log('   - Expense categorization');
        console.log('   - Financial analytics and reporting');

    } catch (error) {
        if (error.response) {
            console.error(' Error:', error.response.data.message || error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            console.error(' Network error: Could not reach the Render backend');
            console.error('Make sure the backend URL is correct:', RENDER_BACKEND_URL);
        } else {
            console.error(' Error:', error.message);
        }
        process.exit(1);
    }
}

seedCategoriesToRender();
