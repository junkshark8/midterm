# Glucose Log
### Web Dev Spring24 Midterm
This is a FastAPI app to log glucose readings for my diabetic cat, Pluto (see favicon). I created it because the data for her readings currently lives on a glucometer with a tiny screen, and I'd like to have a better interface for working with the data. This full-stack project must demonstrate basic CRUD (create, read, update, delete) operations by making api calls from the frontend to the backend.

#### Backend
main.py initializes the app using FileResponse to display index.html, mounts a static file directory to load styles.css and scripts.js from the frontend, and includes an APIRouter imported from glucose.py. 

glucose.py routes response methods for CRUD operations on the pydantic model in model.py. The post method appends a new glucose object with an id, reading, and datetime to an empty list. The data is stored in the program memory rather than a cloud-based database. There is a get method for the whole list as well as for glucose objects by id. 

#### Frontend
The frontend uses plain javascript for the user to implement CRUD operations. It uses bootstrap for modal-dialog boxes and basic styling, in addition styles.css for custom styling. Something I added that wasn't modeled in the Todo app in class was a confirm delete dialog since the delete method cannot be undone.

#### Demo
The following gif demonstrates the CRUD operations of the app.
<img scr = "demo.gif">

#### Future plans
If I were to continue working on this project I would implement several things to make it better.

###### MongoDB
In class we're going to work with MongoDB, and setting up a cloud-based database is important for this app. Right now the data is stored in program memory and gets wiped every time the app is restarted.

###### Pagination
It's important to be able to sort and filter the data in a way that is user friendly, and obviously as it stands all readings exist on one page which isn't very user friendly for a large dataset. I think it'd be super important to be able to sort and filter the data by datetime, as well as by reading. Currently the readings are listed by id, but I think it'd be much better if they were listed chronologically by datetime.

###### Data Visualization
Being able to generate graphs for the glucose readings will help visualize a full glucose curve (taking a reading every 2 hours for an entire day) as well as help the user see when the pet is spiking above or dipping below the "normal" range. Ideally I'd like the user to be able to click on a reading and see where that reading falls on a graph, or choose a date and see all the readings for that date on a curve.

###### Profiles and Authentication
If this were a real app and not just something for my own diabetic cat, it would be nice to keep user data private by putting it behind a login screen. Users could create a profile for their pet, and potentially have multiple profiles for multiple pets. 

###### Frontend Framework
This app doesn't currently use a javascript framework for the frontend, which is recommended for the final project. If I end up working on this for the final project I'd use React as a framework since I've worked with it a bit before.# midterm
