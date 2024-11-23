# Employee Management System  

## Description  
The Employee Management System is a full-stack application built using the MERN stack. The backend provides a REST API for creating, retrieving, updating, and deleting users, along with secure login functionality via token generation.  

The frontend includes:  
- A **registration form** to create new employees.  
- A **login page** to authenticate users.  
- A **dashboard** where users can search for employees, edit details, and update records after logging in.  

## Features  
- **User Authentication**: Secure login using token-based authentication.  
- **CRUD Operations**:  
  - Create new employees via the registration form.  
  - Retrieve a list of employees.  
  - Update employee details.  
  - Delete employees.  
- **Search Functionality**: Quickly find specific employees.  
- **Responsive Dashboard**: User-friendly interface for managing employee data.  

## Technologies Used  
### Backend  
- **Node.js**: Server-side JavaScript runtime.  
- **Express.js**: Framework for building RESTful APIs.  
- **MongoDB**: Database to store employee records.  
- **JWT (JSON Web Token)**: For secure authentication.  

### Frontend  
- **React.js**: For building the user interface.  
- **JSX**: JavaScript XML syntax extension for React.  
- **Material-UI**: For designing the frontend with pre-built, responsive UI components.  

## Setup Instructions  
### Prerequisites  
Ensure you have the following installed on your system:  
- Node.js  
- MongoDB  

### Steps  
1. **Clone the Repository**:  
   ```bash
   git clone [REPOSITORY_URL]
   cd employee-management-system


2. Backend Setup:
 Navigate to the backend directory:
      cd backend

 Install dependencies:
      npm install

 Create a .env file and add the following environment variables:
       MONGO_URL=mongodb://127.0.0.1:27017/employees
       JWT_SECRET=your_secret_key

 Run the backend server:
       node index.js

3. Frontend Setup:
Navigate to the frontend directory:
cd frontend

 Install necessary dependencies:
       npm install

 Start the frontend development server:
       npm run dev

       


