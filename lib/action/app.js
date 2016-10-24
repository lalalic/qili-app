"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INIT_APP = INIT_APP;
function INIT_APP(error, __tutorialized) {
    if (!!error) {
        return {
            type: "initedError",
            user: user,
            error: error
        };
    } else {
        return {
            type: "inited",
            __tutorialized: __tutorialized
        };
    }
}

var USER_CHANGED = exports.USER_CHANGED = {
    type: "user.changed"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vYXBwLmpzIl0sIm5hbWVzIjpbIklOSVRfQVBQIiwiZXJyb3IiLCJfX3R1dG9yaWFsaXplZCIsInR5cGUiLCJ1c2VyIiwiVVNFUl9DSEFOR0VEIl0sIm1hcHBpbmdzIjoiOzs7OztRQUFnQkEsUSxHQUFBQSxRO0FBQVQsU0FBU0EsUUFBVCxDQUFrQkMsS0FBbEIsRUFBd0JDLGNBQXhCLEVBQXVDO0FBQzFDLFFBQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDUCxlQUFPO0FBQ0hFLGtCQUFLLGFBREY7QUFFRkMsc0JBRkU7QUFHRkg7QUFIRSxTQUFQO0FBS0gsS0FORCxNQU1LO0FBQ0QsZUFBTztBQUNIRSxrQkFBSyxRQURGO0FBRUZEO0FBRkUsU0FBUDtBQUlIO0FBQ0o7O0FBRU0sSUFBSUcsc0NBQWE7QUFDcEJGLFVBQUs7QUFEZSxDQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gSU5JVF9BUFAoZXJyb3IsX190dXRvcmlhbGl6ZWQpe1xuICAgIGlmKCEhZXJyb3Ipe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTpcImluaXRlZEVycm9yXCJcbiAgICAgICAgICAgICx1c2VyXG4gICAgICAgICAgICAsZXJyb3JcbiAgICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTpcImluaXRlZFwiXG4gICAgICAgICAgICAsX190dXRvcmlhbGl6ZWRcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHZhciBVU0VSX0NIQU5HRUQ9e1xuICAgIHR5cGU6XCJ1c2VyLmNoYW5nZWRcIlxufVxuIl19