// import { Response, Request } from 'express';
// import knex from '../database/connection';

// class PointsController {
//     async index(request: Request, response: Response){
//         const {city, uf, items} = request.query;

//         const parsedItems = String(items)
//         .split(",")
//         .map(item => Number(item.trim()));

//         const points = await knex("points")
//         .join("point_items", "points.id", "=", "point_items.point_id")
//         .whereIn("point_items.item_id", parsedItems)
//         .where("city", String(city))
//         .where("uf", String(uf))
//         .distinct()
//         .select("points.*");

//         return response.json(points);
//     }

    
//     async show(request: Request, response: Response){
//         const {id} = request.params;

//         const point = await knex("points").where("id", id).first();

//         if(!point){
//             return response.status(400).json({message:"Point not found."})
//         }

//         const items = await knex("items")
//         .join("point_items", "items.id", "=", "point_items.item_id")
//         .where("point_items.point_id", id)
//         .select("items.title")

//         return response.json({point, items});
//     }

//     async create(request: Request, response: Response){
//         const {
//             name,
//             email,
//             whatsapp,
//             latitude,
//             longitude,
//             city,
//             uf,
//             items
//         } = request.body;
    
//         const trx = await knex.transaction();
    
//         const point = {
//             image: "https://www.vmcdn.ca/f/files/shared/food/adobe-stock-food-market.jpeg;w=400",
//               name,
//               email,
//               whatsapp,
//               latitude,
//               longitude,
//               city,
//               uf
//           }

//         const insertedIds = await trx("points").insert(point);
    
//         const point_id = insertedIds[0];
    
//         const pointItems = items.map((item_id: Number) => {
//             return {
//                 item_id,
//                 point_id,
//             }
//         })
    
//         await trx("point_items").insert(pointItems);

//         await trx.commit();
    
//         return response.json({
//           id: point_id,
//           ...point,  
//         })
//     }
// }

// export default PointsController

// import { Response, Request } from 'express';
// import knex from '../database/connection';

// class PointsController {
//     async index(request: Request, response: Response){
//         const {city, uf, items} = request.query;

//         const parsedItems = String(items)
//         .split(",")
//         .map((item) => Number(item.trim()));

//         const points = await knex("points")
//         .join('point_items', 'points.id', '=', 'point_items.point_id')
//         .whereIn('point_items.item_id', parsedItems)
//         .where('city', String(city))
//         .where('uf', String(uf))
//         .distinct()
//         .select('points.*');

//         const serializedPoints = points.map(point => {
//         return{
//             ...point,
//             image_url: `http://192.168.0.131:3010/uploads/${point.image}`
//         }
//     })
    
//     return response.json(serializedPoints);
//     }

    

//     async show(request: Request, response: Response){
//         const {id} = request.params;
//         console.log('id', id)

//         const point = await knex('points').where('id', id).first();
//         console.log('point', point)

//         if(!point){
//             return response.status(400).json({message:"Point not found."});
//         }

//         const serializedPoint = {
//                 ...point,
//                 image_url: `http://192.168.0.131:3010/uploads/${point.image}`
//             }
        
//         const items = await knex('items')
//         .join('point_items', 'items.id', '=', 'point_items.item_id')
//         .where('point_items.point_id', id)
//         .select('items.title')

//         return response.json({point: serializedPoint, items});
//     }

//     async create(request: Request, response: Response){
//         const {
//             name,
//             email,
//             whatsapp,
//             latitude,
//             longitude,
//             city,
//             uf,
//             items
//         } = request.body;
    
//         const trx = await knex.transaction();
    
//         const point = {
//             image: "https://www.vmcdn.ca/f/files/shared/food/adobe-stock-food-market.jpeg;w=400",
//               name,
//               email,
//               whatsapp,
//               latitude,
//               longitude,
//               city,
//               uf
//           }

//         const insertedIds = await trx("points").insert(point);
    
//         const point_id = insertedIds[0];

//         // const pointItems = items
//         // .split(",")
//         // .map((item: string) => Number(item.trim()))
//         // .map((item_id: Number) => {
//         //     return {
//         //         item_id,
//         //         point_id,
//         //     }
//         // })

//         const pointItems = items.map((item_id: Number) => {
//             return {
//                 item_id,
//                 point_id,
//             }
//         })
    
//         await trx("point_items").insert(pointItems);

//         await trx.commit();
    
//         return response.json({
//           id: point_id,
//           ...point,  
//         });
//     }
// }

// export default PointsController
import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((item) => {
      return {
        ...points,
        image_url: `http://192.168.0.13:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.13:3333/uploads/${point.image}`,
    };

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    console.log(request.body);

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;