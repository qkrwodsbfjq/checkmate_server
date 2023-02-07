module.exports = function(app){
    const todo = require('./todoController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1.todo 생성하기 Query String
    // TODO 생성할때 받아야되는 인자들 추가하고 ID 빈값있으면 추가로 계산하기
    app.post('/app/todo', todo.postTodo);
    // 2.todo 조회하기 Query String
    app.get('/app/todo' , todo.getTodo);
    // 3.todo id 를 통해서 조사하기 QueryString
    app.get('/app/todoId',todo.getTodoId);
    // 4. todo category 생성 하기
    app.post('/app/category',todo.postCategory);
    // 5. todo category 수정 하기
    app.patch('/app/category/update',todo.updateCategory);
    // 6. todo category 조회하기
    app.get('/app/category',todo.getCategory);
    // 7. todo contents 생성하기
    app.post('/app/contents',todo.postContents);
    // 8. todo contents 조회하기
    app.get('/app/contents',todo.getContents);
    // 9. todo contents 수정하기
    app.patch('/app/contents/update',todo.updateContents);
    // 10. todo 수정하기
    app.patch('/app/todo/update',todo.updateTodo);


    };