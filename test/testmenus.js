import { describe, it, before } from 'mocha';
import uuid from 'uuid/v4';
import supertest from 'supertest';
import app from '../app';
import db from '../db/index';
import menuquery from '../db/menus';
import Menu from '../models/menus';

const request = supertest(app);
const menuId = uuid();

let globaltoken;
before('Setup DB', async () => {
  const newMenu = new Menu(menuId, 'test',
    300, 30, 'core', new Date(), 'ben', 'image/test.jpeg');
  await db.query(
    menuquery.createMenu(
      newMenu.menuId, newMenu.name,
      newMenu.price, newMenu.quantity,
      newMenu.type, newMenu.dateCreated,
      newMenu.createdBy, newMenu.imgUrl,
    ),
  );
  it('Creates a new user menu ', (done) => {
    // console.log("Ouside test globaltoken value 2 : ", globaltoken);
    request.post('/api/v1/auth/signup')
      .send({
        email: 'omasa.menu@gmail.com',
        fullName: 'Benedict Esimaje',
        phoneNo: '07062257273',
        password: 'mypassword',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Login, User credentials success', (done) => {
    request.post('/api/v1/auth/login')
      .send({
        email: 'omasa.menu@gmail.com',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        const token = JSON.parse(res.text);

        globaltoken = token.result;
        done(err);
      });
  });
});

// In this test it's expected an Menu list
describe('GET /menus', () => {
  it('returns a list of menus with token', (done) => {
    request.get('/api/v1/menus')
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of menus without token', (done) => {
    request.get('/api/v1/menus')
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('returns a list of menus invalid token', (done) => {
    request.get('/api/v1/menus')
      .set('x-access-token', 'mnsdsdmdnssndsn')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid without token', (done) => {
    request.get(`/api/v1/menus/${menuId}`)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid with token', (done) => {
    request.get(`/api/v1/menus/${menuId}`)
      .set('x-access-token', globaltoken)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid with invalid token', (done) => {
    request.get(`/api/v1/menus/${menuId}`)
      .set('x-access-token', 'sdsdffdsfsfsf')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('gets a menu based on menuid(menu doesnt exist)', (done) => {
    request.get('/api/v1/menus/122222')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the save Menu expecting status 201 of success
describe('POST /menus', () => {
  it('Creates a new menu', (done) => {
    request.post('/api/v1/menus')
      .set('x-access-token', globaltoken)
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 5,
        type: 'asasasasasa',
        imgUrl: 'image/ste.jpeg',
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Creates a new menu without token', (done) => {
    request.post('/api/v1/menus')
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 5,
        type: 'asasasasasa',
        imgUrl: 'image/ste.jpeg',
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Creates a new menu with invalid token', (done) => {
    request.post('/api/v1/menus')
      .set('x-access-token', '21233231313131313dasdsadasdasdaddasadsad')
      .send({
        name: 'amaassasala',
        price: 700000,
        quantity: 5,
        type: 'asasasasasa',
        imgUrl: 'image/ste.jpeg',
      })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Fails to create a new menu if json is empty', (done) => {
    request.post('/api/v1/menus')
      .set('x-access-token', globaltoken)
      .send({})
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Update a single menu based on menuid expecting status 201 of success
describe('PUT /menus', () => {
  it('Updates details of an existing menu', (done) => {
    request.put(`/api/v1/menus/${menuId}`)
      .set('x-access-token', globaltoken)
      .send({
        price: 700000,
      })
      .expect(201)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of an existing menu without token', (done) => {
    request.put(`/api/v1/menus/${menuId}`)
      .send({
        price: 700000,
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of an existing menu invalid token', (done) => {
    request.put(`/api/v1/menus/${menuId}`)
      .set('x-access-token', 'sddndasklndaslkndlkansnalkanflnslfkdnakldnfdaf')
      .send({
        price: 700000,
      })
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Updates details of an existing menu (menu doesnt exist)', (done) => {
    request.put('/api/v1/menus/12121212')
      .set('x-access-token', globaltoken)
      .send({
        price: 700000,
      })
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});

// Testing the Delete a single menu based on menuis expecting status 201 of success
describe('DELETE /menu', () => {
  it('Delete an existing menu', (done) => {
    request.delete(`/api/v1/menus/${menuId}`)
      .set('x-access-token', globaltoken)
      .expect(202)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing menu without token', (done) => {
    request.delete(`/api/v1/menus/${menuId}`)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing menu with invalid token', (done) => {
    request.delete(`/api/v1/menus/${menuId}`)
      .set('x-access-token', 'kjscfbskjfnndflksnflksndflknsdfknsdkfn')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
  it('Delete an existing menu (Menu doesnt exist)', (done) => {
    request.delete('/api/v1/menus/12121212121')
      .set('x-access-token', globaltoken)
      .expect(400)
      .end((err) => {
        done(err);
      });
  });
});
