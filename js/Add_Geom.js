const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const cors= require('cors')
app.use(cors())
app.use(bodyParser.json());

const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'Geometry'
  });
client.connect();
/* test connection to database*/
/*
client.query(
    "SELECT * from geometries",
    function(error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result)
        console.log('Done');
      }
    }
);
*/
//////////////////////////Add geometries to database/////////////////////////////////
//Add a point to a table called geometries
app.post('/point',function (req,res){
   const point = `POINT(${req.body.lon} ${req.body.lat})`;
  // Insert the coordinates into the table
  client.query(
    'INSERT INTO points (id, point) VALUES ($1, $2)',
    [req.body.id, point],
    function(error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log('Done');
      }
    }
    );
});

//Add a line to a table called geometries
app.post('/line',(req,res)=>{
    const line =  `LINESTRING(${req.body.coord.map(c => `${c[0]} ${c[1]}`).join(', ')})`;
   client.query(
    'SELECT ST_GeomFromText($1, 4326)',
    [line],
    function(error, result) {
      if (error) {
        console.error(error);
      } else {
        client.query(
          'INSERT INTO lines (id, line) VALUES ($1, $2)',
          [req.body.id, result.rows[0].st_geomfromtext],
          function(error, result) {
            if (error) {
              console.error(error);
            } else {
              console.log('Done');
            }
          }
        );
      }
    }
  );
});

//Add a polygon to a table called geometries
app.post('/polygon',(req,res)=>{
  const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: '123456789',
    database: 'Geometry'
  });
  client.connect();
   const polygon =  `POLYGON((${req.body.coord[0].map(c => `${c[0]} ${c[1]}`).join(', ')}))`;
   client.query(
    'SELECT ST_GeomFromText($1, 4326)',
    [polygon],
    function(error, result) {
      if (error) {
        console.error(error);
      } else {
        client.query(
          'INSERT INTO polygons (id, polygon) VALUES ($1, $2)',
          [req.body.id, result.rows[0].st_geomfromtext],
          function(error, result) {
            if (error) {
              console.error(error);
            } else {
              console.log('Done');
            }
          }
        );
      }
    }
  );
});
////////////////////////Get geometries from database////////////////////////////
app.get('/geo/points/:id', (req, res) => {
  
  const id = req.params.id;
  
  client.query(
    'SELECT ST_AsText(point) FROM points WHERE id = $1',
    [id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.send({ error });
      } else {
        // Send the point geometry as a text representation to the client
        res.send({ geom: result.rows[0] });
      }
    }
  );
});
  
  
app.get('/geo/lines/:id', (req, res) => {
    const id = req.params.id;
    client.query(
      'SELECT ST_AsText(line) FROM lines WHERE id = $1',
      [id],
      (error, result) => {
        if (error) {
          console.error(error);
          res.send({ error });
        } else {
          res.send({ geom: result.rows[0] });
        }
      }
    );
});
  
  
app.get('/geo/polygons/:id', (req, res) => {
    const id = req.params.id;
    client.query(
      'SELECT ST_AsText(polygon) FROM polygons WHERE id = $1',
      [id],
      (error, result) => {
        if (error) {
          console.error(error);
          res.send({ error });
        } else {
          res.send({ geom: result.rows[0] });
        }
      }
    );
});
// Start the server
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});