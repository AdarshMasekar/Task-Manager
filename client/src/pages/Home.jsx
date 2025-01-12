import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Para from "../components/ui/Para";

function Home(){
    return < div className="bg-gray-100 py-16">
        <div className="herosection container mx-auto grid grid-cols-10 gap-8">
            <div className="about col-span-5 flex flex-col justify-center">
                <Heading content="Streamline your tasks Boost Productivity" />
                <Para content="Join thousands of users who are organizing their work and life with TaskFlow's intuitive task management platform."/>
                <div className="action-items flex gap-4 mt-6">
                    <Button label="Get Started Free" style="bg-blue-500 hover:bg-blue-600 text-white" />
                    <Button label="Learn More" style="bg-white border border-gray-300 text-gray-700 hover:bg-gray-200" />
                </div>
                <Para content="No credit card required • Free 14-day trial" className="mt-4 text-gray-500 text-sm" />
            </div>
            <div className="signup col-span-5 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Create Your Account</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">First Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Your First Name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Last Name</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Your Last Name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Your Password" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button label="Sign Up" style="bg-green-500 hover:bg-green-600 text-white w-full" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Home;
