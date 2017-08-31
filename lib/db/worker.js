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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93b3JrZXIuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJyZXF1aXJlIiwib24iLCJkb2MiLCJiYXNlIiwiZXJyb3IiLCJTZXJ2aWNlIiwiY29scyIsInVwbG9hZCIsImNvbnNvbGUiLCJpbmZvIiwiX25hbWUiLCJlIiwibWVzc2FnZSIsImlkIiwiZGIiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBTUMsUUFBUSxHQUFSLEVBQWFELEtBQXZCOztBQUVBQSxNQUFNRSxFQUFOLENBQVMsVUFBVCxFQUFxQixVQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBWUMsS0FBWixFQUFrQkMsT0FBbEIsRUFBNEI7QUFDN0NBLFlBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUFBLGVBQUlDLFFBQVFDLElBQVIsYUFBdUJKLFFBQVFLLEtBQS9CLGNBQUo7QUFBQSxLQUFwQixFQUF3RSxVQUFDQyxDQUFEO0FBQUEsZUFBS0gsUUFBUUosS0FBUixDQUFjTyxFQUFFQyxPQUFoQixDQUFMO0FBQUEsS0FBeEU7QUFDSCxDQUZEOztBQUlBYixNQUFNRSxFQUFOLENBQVMsU0FBVCxFQUFtQixVQUFDWSxFQUFELEVBQUtULEtBQUwsRUFBV0MsT0FBWCxFQUFxQjtBQUNwQ0EsWUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQUEsZUFBSUMsUUFBUUMsSUFBUixhQUF1QkosUUFBUUssS0FBL0IsY0FBSjtBQUFBLEtBQXBCLEVBQXdFLFVBQUNDLENBQUQ7QUFBQSxlQUFLSCxRQUFRSixLQUFSLENBQWNPLEVBQUVDLE9BQWhCLENBQUw7QUFBQSxLQUF4RTtBQUNILENBRkQ7O0FBSUFiLE1BQU1FLEVBQU4sQ0FBUyxRQUFULEVBQWtCLFVBQVNJLE9BQVQsRUFBaUI7QUFDL0IsUUFBSUEsT0FBSixHQUFjUyxFQUFkLENBQWlCUCxNQUFqQixDQUF3QjtBQUFBLGVBQUlDLFFBQVFPLEdBQVIsQ0FBWSxrQkFBWixDQUFKO0FBQUEsS0FBeEIsRUFBNEQsVUFBQ0osQ0FBRDtBQUFBLGVBQUtILFFBQVFKLEtBQVIsb0JBQStCTyxFQUFFQyxPQUFqQyxDQUFMO0FBQUEsS0FBNUQ7QUFDSCxDQUZEOztBQUlBIiwiZmlsZSI6Indvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBNb2RlbD1yZXF1aXJlKFwiLlwiKS5Nb2RlbDtcclxuXHJcbk1vZGVsLm9uKCd1cHNlcnRlZCcsIChkb2MsIGJhc2UsIGVycm9yLFNlcnZpY2UpPT57XHJcbiAgICBTZXJ2aWNlLmNvbHMudXBsb2FkKCgpPT5jb25zb2xlLmluZm8oYHJlbW90ZSAke1NlcnZpY2UuX25hbWV9IHVwZGF0ZWRgKSwoZSk9PmNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKSlcclxufSlcclxuXHJcbk1vZGVsLm9uKCdyZW1vdmVkJywoaWQsIGVycm9yLFNlcnZpY2UpPT57XHJcbiAgICBTZXJ2aWNlLmNvbHMudXBsb2FkKCgpPT5jb25zb2xlLmluZm8oYHJlbW90ZSAke1NlcnZpY2UuX25hbWV9IHJlbW92ZWRgKSwoZSk9PmNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKSlcclxufSlcclxuXHJcbk1vZGVsLm9uKCdpbml0ZWQnLGZ1bmN0aW9uKFNlcnZpY2Upe1xyXG4gICAgbmV3IFNlcnZpY2UoKS5kYi51cGxvYWQoKCk9PmNvbnNvbGUubG9nKCdzeW5jZWQgdG8gc2VydmVyJyksKGUpPT5jb25zb2xlLmVycm9yKGBzeW5jZWQgZXJyb3I6ICR7ZS5tZXNzYWdlfWApKVxyXG59KVxyXG5cclxuLypcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cz1mdW5jdGlvbihzZWxmKXtcclxuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciB7dHlwZSxhcmdzfT1lLmRhdGFcclxuICAgICAgICBjb25zb2xlLmxvZyhgd29yayAke3R5cGV9YClcclxuICAgICAgICBpZih0eXBlIT0naW5pdCcgJiYgIWRiKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZGIgaGFzIG5vdCBiZSByZWFkeSBmb3IgJHt0eXBlfWApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBhcmdzPUpTT04ucGFyc2UoYXJncylcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdCc6XHJcbiAgICAgICAgICAgICAgICBpbml0KGFyZ3NbMF0sIGFyZ3NbMV0pXHJcbiAgICAgICAgICAgICAgICBkYj1uZXcgU2VydmljZSgpLmRiXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ2FkZENvbGxlY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgZGIuYWRkQ29sbGVjdGlvbihhcmdzWzBdLCgpPT5jb25zb2xlLmxvZyhgYWRkIGNvbGxlY3Rpb24gJHthcmdzWzBdfSB0byB3b3JrZXIgZGJgKSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndXNlcic6XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlcj1hcmdzWzBdXHJcbiAgICAgICAgICAgICAgICBVc2VyLnNldEN1cnJlbnQoYXJnc1swXSlcclxuICAgICAgICAgICAgICAgIGlmKCF1c2VyKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGIudXBsb2FkKCgpPT5jb25zb2xlLmxvZyhcImJhY2tlbmQgdXBkYXRlZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAoZSk9PmNvbnNvbGUuZXJyb3IoYGJhY2tlbmQgdXBkYXRpbmcgd2l0aCBlcnJvcjplLm1lc3NhZ2VgKSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndXBzZXJ0JzpcclxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcclxuICAgICAgICAgICAgICAgIGRiW2FyZ3NbMF1dLnVwbG9hZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHdvcmsgJHt0eXBlfSBkb25lYClcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHdlYndvcmtlciBlcnJvcjogJHtlLm1lc3NhZ2V9YClcclxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7dHlwZTonZXJyb3InLGVycm9yOiBlLm1lc3NhZ2V9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuKi9cclxuIl19