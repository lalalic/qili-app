'use strict';

var Model = require(".").Model;

Model.on('upserted', function (doc, base, error, Service) {
    Service.cols.upload(function () {
        return console.info('remote ' + Service._name + ' updated');
    }, function (e) {
        return console.error(e.message);
    });
});

Model.on('removed', function (id, error, Service) {
    Service.cols.upload(function () {
        return console.info('remote ' + Service._name + ' removed');
    }, function (e) {
        return console.error(e.message);
    });
});

Model.on('inited', function (Service) {
    new Service().db.upload(function () {
        return console.log('synced to server');
    }, function (e) {
        return console.error('synced error: ' + e.message);
    });
});

/*


module.exports=function(self){
    self.addEventListener('message', function(e){
        var {type,args}=e.data
        console.log(`work ${type}`)
        if(type!='init' && !db){
            console.error(`db has not be ready for ${type}`)
            return
        }
        args=JSON.parse(args)
        try{
            switch(type){
            case 'init':
                init(args[0], args[1])
                db=new Service().db
            break
            case 'addCollection':
                db.addCollection(args[0],()=>console.log(`add collection ${args[0]} to worker db`))
            break
            case 'user':
                let user=args[0]
                User.setCurrent(args[0])
                if(!user)
                    break;
                db.upload(()=>console.log("backend updated"),
                    (e)=>console.error(`backend updating with error:e.message`))
            break
            case 'upsert':
            case 'remove':
                db[args[0]].upload()
            }
            console.log(`work ${type} done`)
        }catch(e){
            console.error(`webworker error: ${e.message}`)
            self.postMessage({type:'error',error: e.message})
        }
    })
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93b3JrZXIuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJyZXF1aXJlIiwib24iLCJkb2MiLCJiYXNlIiwiZXJyb3IiLCJTZXJ2aWNlIiwiY29scyIsInVwbG9hZCIsImNvbnNvbGUiLCJpbmZvIiwiX25hbWUiLCJlIiwibWVzc2FnZSIsImlkIiwiZGIiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBTUMsUUFBUSxHQUFSLEVBQWFELEtBQXZCOztBQUVBQSxNQUFNRSxFQUFOLENBQVMsVUFBVCxFQUFxQixVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBWUMsS0FBWixFQUFrQkMsT0FBbEIsRUFBNEI7QUFDN0NBLFlBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUFBLGVBQUlDLFFBQVFDLElBQVIsYUFBdUJKLFFBQVFLLEtBQS9CLGNBQUo7QUFBQSxLQUFwQixFQUF3RSxVQUFDQyxDQUFEO0FBQUEsZUFBS0gsUUFBUUosS0FBUixDQUFjTyxFQUFFQyxPQUFoQixDQUFMO0FBQUEsS0FBeEU7QUFDSCxDQUZEOztBQUlBYixNQUFNRSxFQUFOLENBQVMsU0FBVCxFQUFtQixVQUFDWSxFQUFELEVBQUtULEtBQUwsRUFBV0MsT0FBWCxFQUFxQjtBQUNwQ0EsWUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQUEsZUFBSUMsUUFBUUMsSUFBUixhQUF1QkosUUFBUUssS0FBL0IsY0FBSjtBQUFBLEtBQXBCLEVBQXdFLFVBQUNDLENBQUQ7QUFBQSxlQUFLSCxRQUFRSixLQUFSLENBQWNPLEVBQUVDLE9BQWhCLENBQUw7QUFBQSxLQUF4RTtBQUNILENBRkQ7O0FBSUFiLE1BQU1FLEVBQU4sQ0FBUyxRQUFULEVBQWtCLFVBQVNJLE9BQVQsRUFBaUI7QUFDL0IsUUFBSUEsT0FBSixHQUFjUyxFQUFkLENBQWlCUCxNQUFqQixDQUF3QjtBQUFBLGVBQUlDLFFBQVFPLEdBQVIsQ0FBWSxrQkFBWixDQUFKO0FBQUEsS0FBeEIsRUFBNEQsVUFBQ0osQ0FBRDtBQUFBLGVBQUtILFFBQVFKLEtBQVIsb0JBQStCTyxFQUFFQyxPQUFqQyxDQUFMO0FBQUEsS0FBNUQ7QUFDSCxDQUZEOztBQUlBIiwiZmlsZSI6Indvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBNb2RlbD1yZXF1aXJlKFwiLlwiKS5Nb2RlbDtcblxuTW9kZWwub24oJ3Vwc2VydGVkJywgKGRvYywgYmFzZSwgZXJyb3IsU2VydmljZSk9PntcbiAgICBTZXJ2aWNlLmNvbHMudXBsb2FkKCgpPT5jb25zb2xlLmluZm8oYHJlbW90ZSAke1NlcnZpY2UuX25hbWV9IHVwZGF0ZWRgKSwoZSk9PmNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKSlcbn0pXG5cbk1vZGVsLm9uKCdyZW1vdmVkJywoaWQsIGVycm9yLFNlcnZpY2UpPT57XG4gICAgU2VydmljZS5jb2xzLnVwbG9hZCgoKT0+Y29uc29sZS5pbmZvKGByZW1vdGUgJHtTZXJ2aWNlLl9uYW1lfSByZW1vdmVkYCksKGUpPT5jb25zb2xlLmVycm9yKGUubWVzc2FnZSkpXG59KVxuXG5Nb2RlbC5vbignaW5pdGVkJyxmdW5jdGlvbihTZXJ2aWNlKXtcbiAgICBuZXcgU2VydmljZSgpLmRiLnVwbG9hZCgoKT0+Y29uc29sZS5sb2coJ3N5bmNlZCB0byBzZXJ2ZXInKSwoZSk9PmNvbnNvbGUuZXJyb3IoYHN5bmNlZCBlcnJvcjogJHtlLm1lc3NhZ2V9YCkpXG59KVxuXG4vKlxuXG5cbm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKHNlbGYpe1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIge3R5cGUsYXJnc309ZS5kYXRhXG4gICAgICAgIGNvbnNvbGUubG9nKGB3b3JrICR7dHlwZX1gKVxuICAgICAgICBpZih0eXBlIT0naW5pdCcgJiYgIWRiKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGRiIGhhcyBub3QgYmUgcmVhZHkgZm9yICR7dHlwZX1gKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgYXJncz1KU09OLnBhcnNlKGFyZ3MpXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgICAgICAgIGluaXQoYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICBkYj1uZXcgU2VydmljZSgpLmRiXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnYWRkQ29sbGVjdGlvbic6XG4gICAgICAgICAgICAgICAgZGIuYWRkQ29sbGVjdGlvbihhcmdzWzBdLCgpPT5jb25zb2xlLmxvZyhgYWRkIGNvbGxlY3Rpb24gJHthcmdzWzBdfSB0byB3b3JrZXIgZGJgKSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICBsZXQgdXNlcj1hcmdzWzBdXG4gICAgICAgICAgICAgICAgVXNlci5zZXRDdXJyZW50KGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgaWYoIXVzZXIpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRiLnVwbG9hZCgoKT0+Y29uc29sZS5sb2coXCJiYWNrZW5kIHVwZGF0ZWRcIiksXG4gICAgICAgICAgICAgICAgICAgIChlKT0+Y29uc29sZS5lcnJvcihgYmFja2VuZCB1cGRhdGluZyB3aXRoIGVycm9yOmUubWVzc2FnZWApKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3Vwc2VydCc6XG4gICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgIGRiW2FyZ3NbMF1dLnVwbG9hZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgd29yayAke3R5cGV9IGRvbmVgKVxuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGB3ZWJ3b3JrZXIgZXJyb3I6ICR7ZS5tZXNzYWdlfWApXG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOidlcnJvcicsZXJyb3I6IGUubWVzc2FnZX0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuKi9cbiJdfQ==