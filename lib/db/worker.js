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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93b3JrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFFBQU0sUUFBUSxHQUFSLEVBQWEsS0FBYjs7QUFFVixNQUFNLEVBQU4sQ0FBUyxVQUFULEVBQXFCLFVBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxLQUFaLEVBQWtCLE9BQWxCLEVBQTRCO0FBQzdDLFlBQVEsSUFBUixDQUFhLE1BQWIsQ0FBb0I7ZUFBSSxRQUFRLElBQVIsYUFBdUIsUUFBUSxLQUFSLGFBQXZCO0tBQUosRUFBb0QsVUFBQyxDQUFEO2VBQUssUUFBUSxLQUFSLENBQWMsRUFBRSxPQUFGO0tBQW5CLENBQXhFLENBRDZDO0NBQTVCLENBQXJCOztBQUlBLE1BQU0sRUFBTixDQUFTLFNBQVQsRUFBbUIsVUFBQyxFQUFELEVBQUssS0FBTCxFQUFXLE9BQVgsRUFBcUI7QUFDcEMsWUFBUSxJQUFSLENBQWEsTUFBYixDQUFvQjtlQUFJLFFBQVEsSUFBUixhQUF1QixRQUFRLEtBQVIsYUFBdkI7S0FBSixFQUFvRCxVQUFDLENBQUQ7ZUFBSyxRQUFRLEtBQVIsQ0FBYyxFQUFFLE9BQUY7S0FBbkIsQ0FBeEUsQ0FEb0M7Q0FBckIsQ0FBbkI7O0FBSUEsTUFBTSxFQUFOLENBQVMsUUFBVCxFQUFrQixVQUFTLE9BQVQsRUFBaUI7QUFDL0IsUUFBSSxPQUFKLEdBQWMsRUFBZCxDQUFpQixNQUFqQixDQUF3QjtlQUFJLFFBQVEsR0FBUixDQUFZLGtCQUFaO0tBQUosRUFBb0MsVUFBQyxDQUFEO2VBQUssUUFBUSxLQUFSLG9CQUErQixFQUFFLE9BQUY7S0FBcEMsQ0FBNUQsQ0FEK0I7Q0FBakIsQ0FBbEIiLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE1vZGVsPXJlcXVpcmUoXCIuXCIpLk1vZGVsO1xuXG5Nb2RlbC5vbigndXBzZXJ0ZWQnLCAoZG9jLCBiYXNlLCBlcnJvcixTZXJ2aWNlKT0+e1xuICAgIFNlcnZpY2UuY29scy51cGxvYWQoKCk9PmNvbnNvbGUuaW5mbyhgcmVtb3RlICR7U2VydmljZS5fbmFtZX0gdXBkYXRlZGApLChlKT0+Y29uc29sZS5lcnJvcihlLm1lc3NhZ2UpKVxufSlcblxuTW9kZWwub24oJ3JlbW92ZWQnLChpZCwgZXJyb3IsU2VydmljZSk9PntcbiAgICBTZXJ2aWNlLmNvbHMudXBsb2FkKCgpPT5jb25zb2xlLmluZm8oYHJlbW90ZSAke1NlcnZpY2UuX25hbWV9IHJlbW92ZWRgKSwoZSk9PmNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKSlcbn0pXG5cbk1vZGVsLm9uKCdpbml0ZWQnLGZ1bmN0aW9uKFNlcnZpY2Upe1xuICAgIG5ldyBTZXJ2aWNlKCkuZGIudXBsb2FkKCgpPT5jb25zb2xlLmxvZygnc3luY2VkIHRvIHNlcnZlcicpLChlKT0+Y29uc29sZS5lcnJvcihgc3luY2VkIGVycm9yOiAke2UubWVzc2FnZX1gKSlcbn0pXG5cbi8qXG5cblxubW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24oc2VsZil7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB7dHlwZSxhcmdzfT1lLmRhdGFcbiAgICAgICAgY29uc29sZS5sb2coYHdvcmsgJHt0eXBlfWApXG4gICAgICAgIGlmKHR5cGUhPSdpbml0JyAmJiAhZGIpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZGIgaGFzIG5vdCBiZSByZWFkeSBmb3IgJHt0eXBlfWApXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBhcmdzPUpTT04ucGFyc2UoYXJncylcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgICAgICAgaW5pdChhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgIGRiPW5ldyBTZXJ2aWNlKCkuZGJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdhZGRDb2xsZWN0aW9uJzpcbiAgICAgICAgICAgICAgICBkYi5hZGRDb2xsZWN0aW9uKGFyZ3NbMF0sKCk9PmNvbnNvbGUubG9nKGBhZGQgY29sbGVjdGlvbiAke2FyZ3NbMF19IHRvIHdvcmtlciBkYmApKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgICAgICAgIGxldCB1c2VyPWFyZ3NbMF1cbiAgICAgICAgICAgICAgICBVc2VyLnNldEN1cnJlbnQoYXJnc1swXSlcbiAgICAgICAgICAgICAgICBpZighdXNlcilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGIudXBsb2FkKCgpPT5jb25zb2xlLmxvZyhcImJhY2tlbmQgdXBkYXRlZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgKGUpPT5jb25zb2xlLmVycm9yKGBiYWNrZW5kIHVwZGF0aW5nIHdpdGggZXJyb3I6ZS5tZXNzYWdlYCkpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAndXBzZXJ0JzpcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgZGJbYXJnc1swXV0udXBsb2FkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB3b3JrICR7dHlwZX0gZG9uZWApXG4gICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHdlYndvcmtlciBlcnJvcjogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6J2Vycm9yJyxlcnJvcjogZS5tZXNzYWdlfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG4qL1xuIl19