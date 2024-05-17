import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI!}/talkto`);
        
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Handle error more gracefully, e.g., throw an error or return a failure status
        throw error;
    }

    // Event listeners for connection status
    const connection = mongoose.connection;

    connection.on('error', (error) => {
        console.error('Connection error:', error);
    });
}

export default connectDB;
