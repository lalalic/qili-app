"use strict";

var instance,
    IMAGE_DATA_SCHEME_LEN = "data:image/jpeg;base64,".length,
    input,
    _imgSizer;

function main() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? "json" : arguments[0];
    var width = arguments[1];
    var height = arguments[2];

    //return Promise.as("http://ts2.mm.bing.net/th?id=JN.tzKlieg4w8eYJfDBkEHoAw&pid=15.1")

    if (input == null) {
        input = document.createElement('input');
        input.type = "file";
        _imgSizer = document.createElement('canvas');
        _imgSizer.style.position = input.style.position = 'absolute';
        _imgSizer.style.left = input.style.left = '-9999px';

        document.body.appendChild(input);
        document.body.appendChild(_imgSizer);
    }

    return new Promise(function (resolve, reject) {
        var needResize = width || height,
            size = Math.max(width, height);

        input.onchange = function () {
            var file = this.files[0];
            if (file == null) return;

            if (type == 'raw') {
                resolve(file);
                this.value = "";
                return;
            }

            var name = file.name,
                reader = new FileReader();
            reader.onload = function () {
                this.value = "";
                var data = reader.result;
                switch (type) {
                    case 'image':
                        if (needResize) {
                            (function () {
                                var img = new Image();
                                img.src = data;
                                img.onload = function () {
                                    return resolve({ url: resize(data, size, img), name: name });
                                };
                                img.onerror = function () {
                                    return resolve({ url: data, name: name });
                                };
                            })();
                        } else resolve({ url: data, name: name });
                        break;
                    case 'json':
                        resolve({ data: JSON.parse(data), name: name });
                        break;
                    case 'jsonInJs':
                        resolve({ data: data && new Function("", "return " + data)(), name: name });
                        break;
                    default:
                        resolve({ data: data, name: name });
                }
            }.bind(this);

            reader.onerror = function () {
                reject(reader.error);
            };

            switch (type) {
                case 'image':
                    reader.readAsDataURL(file);
                    break;
                default:
                    reader.readAsText(file);
            }
        };

        input.click();
    });
}

function resize(dataUrl, size, img) {
    var ctx = _imgSizer.getContext('2d');
    var wh = img.width / img.height;
    _imgSizer.width = wh >= 1 ? size < img.width ? size : img.width : size < img.height ? Math.floor(size * wh) : img.width;
    _imgSizer.height = wh < 1 ? size < img.height ? size : img.height : size < img.width ? Math.floor(size / wh) : img.height;
    _imgSizer.style.width = _imgSizer.width + "px";
    _imgSizer.style.height = _imgSizer.height + "px";
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, _imgSizer.width, _imgSizer.height);
    return _imgSizer.toDataURL("image/jpeg");
}

main.toBinary = function (dataUrl) {
    return atob(dataUrl.substr(IMAGE_DATA_SCHEME_LEN));
};

module.exports = { //for testable
    main: main,
    toBinary: main.toBinary,
    selectJsonFile: function selectJsonFile() {
        return main("json");
    },
    selectJsonInJsFile: function selectJsonInJsFile() {
        return main("jsonInJs");
    },
    selectImageFile: function selectImageFile(width, height) {
        return main.apply(undefined, ["image"].concat(Array.prototype.slice.call(arguments)));
    },
    selectTextFile: function selectTextFile() {
        return main("text");
    },
    select: function select() {
        return main.apply(undefined, ["raw"].concat(Array.prototype.slice.call(arguments)));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFFBQUo7SUFDSSx3QkFBc0IsMEJBQTBCLE1BQTFCO0lBQ3RCLEtBRko7SUFFVSxTQUZWOztBQUlBLFNBQVMsSUFBVCxHQUF5QztRQUEzQiw2REFBSyxzQkFBc0I7UUFBZCxxQkFBYztRQUFQLHNCQUFPOzs7O0FBR3JDLFFBQUcsU0FBTyxJQUFQLEVBQVk7QUFDWCxnQkFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQURXO0FBRVgsY0FBTSxJQUFOLEdBQVcsTUFBWCxDQUZXO0FBR1gsb0JBQVUsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVYsQ0FIVztBQUlYLGtCQUFVLEtBQVYsQ0FBZ0IsUUFBaEIsR0FBeUIsTUFBTSxLQUFOLENBQVksUUFBWixHQUFxQixVQUFyQixDQUpkO0FBS1gsa0JBQVUsS0FBVixDQUFnQixJQUFoQixHQUFxQixNQUFNLEtBQU4sQ0FBWSxJQUFaLEdBQWlCLFNBQWpCLENBTFY7O0FBT1gsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBMUIsRUFQVztBQVFYLGlCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQTFCLEVBUlc7S0FBZjs7QUFXQSxXQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQsRUFBa0I7QUFDakMsWUFBSSxhQUFXLFNBQU8sTUFBUDtZQUNYLE9BQUssS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFlLE1BQWYsQ0FBTCxDQUY2Qjs7QUFJakMsY0FBTSxRQUFOLEdBQWUsWUFBVTtBQUNyQixnQkFBSSxPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBTCxDQURpQjtBQUVyQixnQkFBRyxRQUFNLElBQU4sRUFDQyxPQURKOztBQUdBLGdCQUFHLFFBQU0sS0FBTixFQUFZO0FBQ1gsd0JBQVEsSUFBUixFQURXO0FBRVgscUJBQUssS0FBTCxHQUFXLEVBQVgsQ0FGVztBQUdYLHVCQUhXO2FBQWY7O0FBT0EsZ0JBQUksT0FBSyxLQUFLLElBQUw7Z0JBQ2QsU0FBTyxJQUFJLFVBQUosRUFBUCxDQWIwQjtBQWNyQixtQkFBTyxNQUFQLEdBQWMsWUFBVTtBQUNwQixxQkFBSyxLQUFMLEdBQVcsRUFBWCxDQURvQjtBQUVwQixvQkFBSSxPQUFLLE9BQU8sTUFBUCxDQUZXO0FBR3BCLHdCQUFPLElBQVA7QUFDVCx5QkFBSyxPQUFMO0FBQ0MsNEJBQUcsVUFBSCxFQUFjOztBQUNFLG9DQUFJLE1BQUksSUFBSSxLQUFKLEVBQUo7QUFDSixvQ0FBSSxHQUFKLEdBQVEsSUFBUjtBQUNBLG9DQUFJLE1BQUosR0FBVzsyQ0FBSSxRQUFRLEVBQUMsS0FBSSxPQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLEdBQW5CLENBQUosRUFBNEIsVUFBN0IsRUFBUjtpQ0FBSjtBQUNYLG9DQUFJLE9BQUosR0FBWTsyQ0FBSSxRQUFRLEVBQUMsS0FBSSxJQUFKLEVBQVMsVUFBVixFQUFSO2lDQUFKO2lDQUpkO3lCQUFkLE1BTUksUUFBUSxFQUFDLEtBQUksSUFBSixFQUFVLFVBQVgsRUFBUixFQU5KO0FBT0EsOEJBUkQ7QUFEUyx5QkFVSixNQUFMO0FBQ0MsZ0NBQVEsRUFBQyxNQUFLLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBTCxFQUF1QixVQUF4QixFQUFSLEVBREQ7QUFFQyw4QkFGRDtBQVZTLHlCQWFKLFVBQUw7QUFDQyxnQ0FBUSxFQUFDLE1BQU0sUUFBUSxJQUFJLFFBQUosQ0FBYSxFQUFiLEVBQWdCLFlBQVUsSUFBVixDQUFoQixFQUFSLEVBQTJDLFVBQWxELEVBQVIsRUFERDtBQUVDLDhCQUZEO0FBYlM7QUFpQlIsZ0NBQVEsRUFBQyxVQUFELEVBQU0sVUFBTixFQUFSLEVBREQ7QUFoQlMsaUJBSG9CO2FBQVYsQ0FzQlosSUF0QlksQ0FzQlAsSUF0Qk8sQ0FBZCxDQWRxQjs7QUFzQ3JCLG1CQUFPLE9BQVAsR0FBZSxZQUFVO0FBQ3JCLHVCQUFPLE9BQU8sS0FBUCxDQUFQLENBRHFCO2FBQVYsQ0F0Q007O0FBMEMzQixvQkFBTyxJQUFQO0FBQ0EscUJBQUssT0FBTDtBQUNDLDJCQUFPLGFBQVAsQ0FBcUIsSUFBckIsRUFERDtBQUVDLDBCQUZEO0FBREE7QUFLQywyQkFBTyxVQUFQLENBQWtCLElBQWxCLEVBREQ7QUFKQSxhQTFDMkI7U0FBVixDQUprQjs7QUF1RHZDLGNBQU0sS0FBTixHQXZEdUM7S0FBbEIsQ0FBbkIsQ0FkcUM7Q0FBekM7O0FBMEVBLFNBQVMsTUFBVCxDQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixHQUEvQixFQUFtQztBQUMvQixRQUFJLE1BQUksVUFBVSxVQUFWLENBQXFCLElBQXJCLENBQUosQ0FEMkI7QUFFL0IsUUFBSSxLQUFHLElBQUksS0FBSixHQUFVLElBQUksTUFBSixDQUZjO0FBRy9CLGNBQVUsS0FBVixHQUFrQixNQUFJLENBQUosR0FBUyxPQUFLLElBQUksS0FBSixHQUFZLElBQWpCLEdBQXdCLElBQUksS0FBSixHQUFjLE9BQUssSUFBSSxNQUFKLEdBQWEsS0FBSyxLQUFMLENBQVcsT0FBSyxFQUFMLENBQTdCLEdBQXdDLElBQUksS0FBSixDQUgxRTtBQUkvQixjQUFVLE1BQVYsR0FBbUIsS0FBRyxDQUFILEdBQVEsT0FBSyxJQUFJLE1BQUosR0FBYSxJQUFsQixHQUF5QixJQUFJLE1BQUosR0FBZSxPQUFLLElBQUksS0FBSixHQUFZLEtBQUssS0FBTCxDQUFXLE9BQUssRUFBTCxDQUE1QixHQUF1QyxJQUFJLE1BQUosQ0FKM0U7QUFLL0IsY0FBVSxLQUFWLENBQWdCLEtBQWhCLEdBQXNCLFVBQVUsS0FBVixHQUFnQixJQUFoQixDQUxTO0FBTS9CLGNBQVUsS0FBVixDQUFnQixNQUFoQixHQUF1QixVQUFVLE1BQVYsR0FBaUIsSUFBakIsQ0FOUTtBQU8vQixRQUFJLFNBQUosQ0FBYyxHQUFkLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLEVBQXNCLElBQUksS0FBSixFQUFVLElBQUksTUFBSixFQUFXLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLFVBQVUsS0FBVixFQUFpQixVQUFVLE1BQVYsQ0FBaEUsQ0FQK0I7QUFRL0IsV0FBTyxVQUFVLFNBQVYsQ0FBb0IsWUFBcEIsQ0FBUCxDQVIrQjtDQUFuQzs7QUFXQSxLQUFLLFFBQUwsR0FBYyxVQUFDLE9BQUQ7V0FBVyxLQUFLLFFBQVEsTUFBUixDQUFlLHFCQUFmLENBQUw7Q0FBWDs7QUFFZCxPQUFPLE9BQVAsR0FBZTtBQUNYLGNBRFc7QUFFWCxjQUFTLEtBQUssUUFBTDtBQUNULDhDQUFnQjtBQUNaLGVBQU8sS0FBSyxNQUFMLENBQVAsQ0FEWTtLQUhMO0FBTVgsc0RBQW9CO0FBQ2hCLGVBQU8sS0FBSyxVQUFMLENBQVAsQ0FEZ0I7S0FOVDtBQVNYLDhDQUFnQixPQUFNLFFBQU87QUFDekIsZUFBTyx1QkFBSywyQ0FBVyxXQUFoQixDQUFQLENBRHlCO0tBVGxCO0FBWVgsOENBQWdCO0FBQ1osZUFBTyxLQUFLLE1BQUwsQ0FBUCxDQURZO0tBWkw7QUFlWCw4QkFBUTtBQUNKLGVBQU8sdUJBQUsseUNBQVMsV0FBZCxDQUFQLENBREk7S0FmRztDQUFmIiwiZmlsZSI6ImZpbGUtc2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaW5zdGFuY2UsXG4gICAgSU1BR0VfREFUQV9TQ0hFTUVfTEVOPVwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIi5sZW5ndGgsXG4gICAgaW5wdXQsX2ltZ1NpemVyO1xuXG5mdW5jdGlvbiBtYWluKHR5cGU9XCJqc29uXCIsIHdpZHRoLCBoZWlnaHQpe1xuICAgIC8vcmV0dXJuIFByb21pc2UuYXMoXCJodHRwOi8vdHMyLm1tLmJpbmcubmV0L3RoP2lkPUpOLnR6S2xpZWc0dzhlWUpmREJrRUhvQXcmcGlkPTE1LjFcIilcblxuICAgIGlmKGlucHV0PT1udWxsKXtcbiAgICAgICAgaW5wdXQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICBpbnB1dC50eXBlPVwiZmlsZVwiXG4gICAgICAgIF9pbWdTaXplcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUucG9zaXRpb249aW5wdXQuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUubGVmdD1pbnB1dC5zdHlsZS5sZWZ0PSctOTk5OXB4J1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5wdXQpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX2ltZ1NpemVyKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgIHZhciBuZWVkUmVzaXplPXdpZHRofHxoZWlnaHQsXG4gICAgICAgICAgICBzaXplPU1hdGgubWF4KHdpZHRoLGhlaWdodCk7XG5cbiAgICAgICAgaW5wdXQub25jaGFuZ2U9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBmaWxlPXRoaXMuZmlsZXNbMF07XG4gICAgICAgICAgICBpZihmaWxlPT1udWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYodHlwZT09J3Jhdycpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmlsZSlcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB2YXIgbmFtZT1maWxlLm5hbWUsXG4gICAgXHRcdFx0cmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZT1cIlwiXG4gICAgICAgICAgICAgICAgdmFyIGRhdGE9cmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICBcdFx0XHRjYXNlICdpbWFnZSc6XG4gICAgXHRcdFx0XHRpZihuZWVkUmVzaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWc9bmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zcmM9ZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZD0oKT0+cmVzb2x2ZSh7dXJsOnJlc2l6ZShkYXRhLCBzaXplLCBpbWcpLG5hbWV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9uZXJyb3I9KCk9PnJlc29sdmUoe3VybDpkYXRhLG5hbWV9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxuICAgIFx0XHRcdFx0ICAgIHJlc29sdmUoe3VybDpkYXRhLCBuYW1lfSlcbiAgICBcdFx0XHRcdGJyZWFrXG4gICAgXHRcdFx0Y2FzZSAnanNvbic6XG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOkpTT04ucGFyc2UoZGF0YSksIG5hbWV9KVxuICAgIFx0XHRcdFx0YnJlYWtcbiAgICBcdFx0XHRjYXNlICdqc29uSW5Kcyc6XG4gICAgXHRcdFx0XHRyZXNvbHZlKHtkYXRhOiBkYXRhICYmIG5ldyBGdW5jdGlvbihcIlwiLFwicmV0dXJuIFwiK2RhdGEpKCksIG5hbWV9KVxuICAgIFx0XHRcdFx0YnJlYWtcbiAgICBcdFx0XHRkZWZhdWx0OlxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YSxuYW1lfSlcbiAgICBcdFx0XHR9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgICAgICAgIH1cblxuICAgIFx0XHRzd2l0Y2godHlwZSl7XG4gICAgXHRcdGNhc2UgJ2ltYWdlJzpcbiAgICBcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKVxuICAgIFx0XHRcdGJyZWFrXG4gICAgXHRcdGRlZmF1bHQ6XG4gICAgXHRcdFx0cmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcbiAgICBcdFx0fVxuICAgICAgICB9XG5cdFx0XG5cdFx0aW5wdXQuY2xpY2soKVxuICAgIH0pXG59XG5cblxuZnVuY3Rpb24gcmVzaXplKGRhdGFVcmwsIHNpemUsIGltZyl7XG4gICAgdmFyIGN0eD1faW1nU2l6ZXIuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHZhciB3aD1pbWcud2lkdGgvaW1nLmhlaWdodDtcbiAgICBfaW1nU2l6ZXIud2lkdGggPSB3aD49MSA/IChzaXplPGltZy53aWR0aCA/IHNpemUgOiBpbWcud2lkdGgpIDogKHNpemU8aW1nLmhlaWdodCA/IE1hdGguZmxvb3Ioc2l6ZSp3aCkgOiBpbWcud2lkdGgpO1xuICAgIF9pbWdTaXplci5oZWlnaHQgPSB3aDwxID8gKHNpemU8aW1nLmhlaWdodCA/IHNpemUgOiBpbWcuaGVpZ2h0KSA6IChzaXplPGltZy53aWR0aCA/IE1hdGguZmxvb3Ioc2l6ZS93aCkgOiBpbWcuaGVpZ2h0KTtcbiAgICBfaW1nU2l6ZXIuc3R5bGUud2lkdGg9X2ltZ1NpemVyLndpZHRoK1wicHhcIlxuICAgIF9pbWdTaXplci5zdHlsZS5oZWlnaHQ9X2ltZ1NpemVyLmhlaWdodCtcInB4XCJcbiAgICBjdHguZHJhd0ltYWdlKGltZywwLDAsaW1nLndpZHRoLGltZy5oZWlnaHQsMCwwLF9pbWdTaXplci53aWR0aCwgX2ltZ1NpemVyLmhlaWdodCk7XG4gICAgcmV0dXJuIF9pbWdTaXplci50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpXG59XG5cbm1haW4udG9CaW5hcnk9KGRhdGFVcmwpPT5hdG9iKGRhdGFVcmwuc3Vic3RyKElNQUdFX0RBVEFfU0NIRU1FX0xFTikpXG5cbm1vZHVsZS5leHBvcnRzPXsvL2ZvciB0ZXN0YWJsZVxuICAgIG1haW4sXG4gICAgdG9CaW5hcnk6bWFpbi50b0JpbmFyeSxcbiAgICBzZWxlY3RKc29uRmlsZSgpe1xuICAgICAgICByZXR1cm4gbWFpbihcImpzb25cIilcbiAgICB9LFxuICAgIHNlbGVjdEpzb25JbkpzRmlsZSgpe1xuICAgICAgICByZXR1cm4gbWFpbihcImpzb25JbkpzXCIpXG4gICAgfSxcbiAgICBzZWxlY3RJbWFnZUZpbGUod2lkdGgsaGVpZ2h0KXtcbiAgICAgICAgcmV0dXJuIG1haW4oXCJpbWFnZVwiLC4uLmFyZ3VtZW50cylcbiAgICB9LFxuICAgIHNlbGVjdFRleHRGaWxlKCl7XG4gICAgICAgIHJldHVybiBtYWluKFwidGV4dFwiKVxuICAgIH0sXG4gICAgc2VsZWN0KCl7XG4gICAgICAgIHJldHVybiBtYWluKFwicmF3XCIsLi4uYXJndW1lbnRzKVxuICAgIH1cbn1cbiJdfQ==