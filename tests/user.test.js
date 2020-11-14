const supertest = require('supertest')
const app = require('../app')
const JWT = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const Bcrypt = require('../helpers/bcrypt')

let access_token
let user
let dbProduct

beforeAll(async (done) => {
  console.log('masuk ke beforeAll');
  try {
    user = await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: Bcrypt.create('1234'),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'agung@mail.com',
      password: Bcrypt.create('1234'),
      role: "customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
    dbProduct = await queryInterface.bulkInsert('Products', [{
      name: 'Sepatu',
      image_url: "abcd.jpg",
      price: 100,
      stock: 10,
      UserId: user[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Baju',
      image_url: "abcd.jpg",
      price: 80,
      stock: 10,
      UserId: user[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Hairdryer',
      image_url: "abcd.jpg",
      price: 500,
      stock: 10,
      UserId: user[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
    console.log(dbProduct);
    done()
  } catch (error) {
    console.log(error, "dari Before All");
    done(error)
  }
})

afterAll(async (done) => {
  console.log('masuk ke afterAll');
  try {
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    // console.log('sudah sampai afterAll');
    done()
  } catch (error) {
    console.log(error, "dari After All");
    done(error)
  }
})

describe('User test', () => {
  const user = {
    success: {
      email: "admin@mail.com",
      password: '1234'
    },
    failed: {
      email: "seseorang@mail.com",
      password: '1234'
    },
    wrongData: {
      ada: false
    }
  }
  

  test('Login Success case', (done) => {
    supertest(app)
      .post('/login')
      .send(user.success)
      .then(({ status, body }) => {
        expect(status).toEqual(200)
        access_token = body.access_token
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
  });

  test('Login Failed case: no email in DB', (done) => {
    supertest(app)
      .post('/login')
      .send(user.failed)
      .then(({ status, body }) => {
        expect(body).toHaveProperty('msg', 'Email/Password wrong')
        expect(status).toEqual(400)
        done()
      })
  });

  test('Login Failed case: no email and password given', (done) => {
    supertest(app)
      .post('/login')
      .send(user.wrongData)
      .then(({ body, status }) => {
        expect(body).toHaveProperty('msg', "Internal server error")
        expect(status).toEqual(500)
        done()
      })
  });
});


describe('Product test', () => {

  const product = {
    success: {
      name: "Macbook",
      image_url: "Macbookpro.jpg",
      stock: 1,
      price: 20000
    },
    failed: {
      name: "",
      image_url: null,
      stock: "string",
      price: -4
    }
  }

  // Get
  test('Get all product', (done) => {
    supertest(app)
      .get('/products')
      .set('access_token', access_token)
      .then(({ status, body }) => {
        expect(status).toEqual(200)
        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              image_url: expect.any(String),
              stock: expect.any(Number),
              price: expect.any(Number),
              UserId: expect.any(Number),
            })
          ]))
        done()
      })
  })

  // Post
  test('Add product success', (done) => {
    supertest(app)
      .post('/products')
      .set('access_token', access_token)
      .send(product.success)
      .then(({ status, body }) => {
        expect(status).toEqual(201)
        expect(body).toHaveProperty('msg', `Success add ${product.success.name}`)
        done()
      })
    })
    
  test('Add product failed case: not meet the validation', (done) => {
    supertest(app)
      .post('/products')
      .set('access_token', access_token)
      .send(product.failed)
      .then(({ status, body }) => {
        expect(status).toEqual(400)
        
        expect(body).toHaveProperty('msg', expect.arrayContaining(['name is required']))
        done()
      })
  })
  test

  test("Add product failed case: user is not admin", (done) => {
    const token = JWT.create(user[1])
    supertest(app)
      .post('/products')
      .set('access_token', token)
      .send(product.success)
      .then(({ status, body }) => {
        expect(status).toEqual(401)
        expect(body).toHaveProperty("msg", "User is not admin")
        done()
      })
  })

  // Delete
  test('Delete product success', (done) => {
    supertest(app)
      .delete('/products/' + dbProduct[0].id)
      .set('access_token', access_token)
      .then(({ status, body }) => {
        // delete status 200
        expect(status).toEqual(201)
        expect(body).toHaveProperty("msg", `Product '${dbProduct[0].name}' deleted successfully`)
        done()
      })
  })

  test('Delete product failed not authorized', (done) => {
    const token = JWT.create(user[1])
    supertest(app)
      .delete('/products/' + dbProduct[0].id)
      .set('access_token', token)
      .then(({ status, body }) => {
        expect(status).toEqual(401)
        expect(body).toHaveProperty("msg", "User is not admin")
        done()
      })
  })

  // Patch 
  test("Update product success", (done) => {
    supertest(app)
      .patch('/products/' + dbProduct[1].id)
      .set("access_token", access_token)
      .send(product.success)
      .then(( { status, body } ) => {
        // update 200
        expect(body).toHaveProperty("msg", `Product '${dbProduct[1].name}' updated successfully`)
        expect(status).toEqual(201)
        done()
      })
  })

  test('Update product failed case: not meet the validation', (done) => {
    supertest(app)
      .patch('/products/' + dbProduct[1].id)
      .set('access_token', access_token)
      .send(product.failed)
      .then(({ status, body}) => {
        expect(status).toEqual(400)
        expect(body).toHaveProperty('msg', expect.arrayContaining([expect.any(String)]))
        done()
      })
  });
})

// kurang get yang gak ada access_token