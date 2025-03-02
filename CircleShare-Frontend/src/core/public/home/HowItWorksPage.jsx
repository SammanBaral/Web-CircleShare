import BottomNav from "@/core/public/components/BottomNav";
import Navbar from "@/core/public/components/Navbar";

const HowItWorksPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6 md:py-12">
                <h1 className="text-3xl font-semibold mb-6">How It Works</h1>
                <div className="space-y-4">
                    <p>
                        Welcome to CircleShare! Our platform allows you to share and borrow items within your community. Here's how it works:
                    </p>
                    <h2 className="text-2xl font-semibold">1. Sign Up</h2>
                    <p>
                        Create an account to get started. You can sign up using your email address or social media accounts.
                    </p>
                    <h2 className="text-2xl font-semibold">2. List Your Items</h2>
                    <p>
                        List the items you want to share. Provide a clear description, upload high-quality images, and set the availability status.
                    </p>
                    <h2 className="text-2xl font-semibold">3. Browse Items</h2>
                    <p>
                        Browse items listed by other users. You can search for specific items or browse by category.
                    </p>
                    <h2 className="text-2xl font-semibold">4. Request to Borrow</h2>
                    <p>
                        When you find an item you want to borrow, send a request to the owner. The owner will review your request and approve or decline it.
                    </p>
                    <h2 className="text-2xl font-semibold">5. Pick Up and Return</h2>
                    <p>
                        Once your request is approved, arrange a time and place to pick up the item. After using it, return the item to the owner in the same condition.
                    </p>
                    <h2 className="text-2xl font-semibold">6. Leave a Review</h2>
                    <p>
                        After the transaction, leave a review for the owner and the item. This helps build trust within the community.
                    </p>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default HowItWorksPage;