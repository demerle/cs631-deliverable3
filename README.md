***Instructions on running this project locally***


*Step 1: Conda Env Setup*

Create a conda environment or some equivelant python virtual environment and install requirements.txt

Eaxmple of creating env correctly:

  `conda create -n deliverable3 python=3.14`
  
  `conda activate deliverable3`
  
 `pip install -r requirements.txt`



*Step 2: Obtain correct npm packages*

Navigate to the UI/react-version frontend code and run `npm install`


*Step 3: Run frontend*

While inside the /react-version folder, run `npm run dev` to run the frontend UI locally at http:localhost:5173


*Step 4: Run backend*

Navigate to /backend and run `uvicorn main:app` to start up the server side code

