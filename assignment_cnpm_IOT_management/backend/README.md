# Python Backend with MongoDB

This project is a Python backend application that uses Flask as the web framework and MongoDB as the database. It provides a simple structure for managing user data with various endpoints for user operations.

## Project Structure

```
flask-backend-mongodb
├── app
│   ├── __init__.py                  
│   ├── models             
│   │   ├── __init__.py
│   │   └── user.py
│   ├── routes            
│   │   ├── __init__.py
│   │   └── user_routes.py
│   ├── services           
│   │   ├── __init__.py
│   │   └── user_service.py
│   ├── schemas         
│   │   ├── __init__.py
│   │   └── user_schema.py
│   ├── config           
│   │   ├── __init__.py
│   │   └── settings.py
│   ├── utils              
│   │   ├── __init__.py
│   │   └── helpers.py
│   ├── database.py       
│   ├── seed_data.py      
│
├── docs                   
│   ├── note.md
│
├── tests/
├── main.py               
├── requirements.txt       
├── .env                   
├── .gitignore             
└── README.md             

```
| **File** | **Description** |
|------------------|----------|
| `app/` | Contains all Flask source code |
| `models/` | Contains models (MongoEngine) |
| `routes/` | Contains API endpoints |
| `services/` | Contains business logic |
| `config/` | Contains application configuration |
| `utils/` | Contains utility functions |
| `database.py` | Manages MongoDB connection |
| `seed_data.py` | Contains initial seed data |
| `docs/` | Contains project documentation |
| `tests/` | Contains test cases |
| `main.py` | Entry point of the application |
| `.env` | Contains environment variables |
| `requirements.txt` | List of required libraries |
| `.gitignore` | Specifies files to ignore when pushing to Git |
| `README.md` | User guide and project documentation |


**Note:** Please refer to the [docs](docs) folder for more details on the API endpoints and database schema.

## Setup and Run

To run the application, follow the steps below:
1. Install python
2. Install pipenv `pip install pipenv`
3. Install shell `pipenv shell`
4. Install dependencies `pipenv install -r requirements.txt`
3. Run the application `python main.py`

If not use pipenv, you can also install the dependencies using `pip install -r requirements.txt` and run the application using `python main.py`.