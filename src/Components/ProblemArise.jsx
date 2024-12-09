import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiFillLike } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing styles for react-toastify


// Dummy data for problems
const dummyProblems = [
    {
        _id: '1',
        description: 'The streetlight in our area is not working.',
        image: 'data:image/jpeg;base64,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',
        likes: 10,
    },
    {
        _id: '2',
        description: 'Potholes on the main road causing accidents.',
        image: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQz1.Fbegi4o/v1/-1x-1.webp',
        likes: 25,
    },
    {
        _id: '3',
        description: 'Garbage collection is delayed for two days.',
        image: 'https://images.deccanherald.com/deccanherald%2F2024-10-28%2Fqhwtz86f%2Ffile7xt0qmoha6q6u6v48k2.jpg?rect=0%2C66%2C3505%2C1840&w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop',
        likes: 5,
    },
    {
        _id: '4',
        description: 'Water supply has been disrupted in the area.',
        image: 'https://c8.alamy.com/comp/D2W5AA/mumbai-fort-fresh-drinking-water-supply-tank-india-D2W5AA.jpg',
        likes: 18,
    },
    {
        _id: '5',
        description: 'Lack of proper street signage on main highways.',
        image: 'https://media.istockphoto.com/id/1368944077/photo/s-curve-asphalt-road-bend.jpg?s=612x612&w=0&k=20&c=lkG-1C3OG1DtGQzejL4xmb77Q6C51POZRulGcb6y_bI=',
        likes: 15,
    },
];

function ProblemPage() {
    const [problems, setProblems] = useState(dummyProblems); // Using dummy data initially
    const [showForm, setShowForm] = useState(false);
    const [newProblem, setNewProblem] = useState({ description: '', image: null });
    const [solvedCount, setSolvedCount] = useState(0);
    const [unsolvedCount, setUnsolvedCount] = useState(0);

    useEffect(() => {
        // Simulate fetching problems and setting counts
        calculateProblemStatus(problems);
    }, [problems]);

    const calculateProblemStatus = (problems) => {
        let solved = problems.filter(problem => problem.solved).length;
        let unsolved = problems.length - solved;
        setSolvedCount(solved);
        setUnsolvedCount(unsolved);
    };

    const handleLikeDislike = (id) => {
        const updatedProblems = problems.map((problem) => {
            if (problem._id === id) {
                if (problem.liked) {
                    // If already liked, we change it to dislike (gray)
                    problem.likes -= 1;
                    problem.liked = false;
                } else {
                    // If not liked, we like it (red)
                    problem.likes += 1;
                    problem.liked = true;
                }
            }
            return problem;
        });
        setProblems(updatedProblems);
    };

    const handleProblemSubmit = async () => {
        const formData = new FormData();
        formData.append('description', newProblem.description);
        formData.append('image', newProblem.image);
        axios.post("/api/problems", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((data) => {
            console.log(data);
            toast.success('Problem submitted successfully!');
        }).catch(err => {
            console.error(err)
            toast.error('Error submitting problem!');
        })


        // Logic to submit the new problem
        setProblems([...problems, { ...newProblem, _id: String(problems.length + 1), likes: 0, liked: false }]);
        setShowForm(false);
        setNewProblem({ description: '', image: null });


    };

    return (
        <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className="p-6 mt-20  min-h-screen">
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-50">Problems</h2>
                <div className="text-sm">
                    <span className="text-green-500 font-bold">Solved: {solvedCount}</span>
                    <span className="mx-2">|</span>
                    <span className="text-red-500 font-bold">Unsolved: {unsolvedCount}</span>
                </div>
            </header>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problems.map((problem) => (
                    <div key={problem._id} className="bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gray-400 rounded-full mr-3"></div> {/* Placeholder for user avatar */}
                            <div>
                                <h4 className="font-semibold text-white">User Name</h4>
                                <p className="text-sm text-gray-400">2 hours ago</p>
                            </div>
                        </div>
                        <img src={problem.image} alt="Problem" className="w-full h-56 object-cover rounded-md mb-3" />
                        <p className="text-gray-50 mb-2">{problem.description}</p>
                        <div className="flex justify-between items-center mt-3">
                            <button
                                onClick={() => handleLikeDislike(problem._id)}
                                className={`flex items-center transition-colors duration-200 ${problem.liked ? 'text-red-600' : 'text-gray-50'
                                    }`}
                            >
                                <AiFillLike className="mr-1" /> {problem.likes}
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                                Report
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Problem Button */}
            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none transition-transform transform hover:scale-110"
            >
                <AiOutlinePlus className="text-2xl" />
            </button>

            {/* Modal Form for Adding a New Problem */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Submit a Problem</h3>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={newProblem.description}
                            onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                            placeholder="Describe your problem..."
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full mb-3"
                            onChange={(e) => setNewProblem({ ...newProblem, image: e.target.files[0] })}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProblemSubmit}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast container to render toast notifications */}
            <ToastContainer />
        </div>
    );
}

export default ProblemPage;
