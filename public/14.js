(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/slider/Slider.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/slider/Slider.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_slider_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/slider_service.js */ "./resources/js/services/slider_service.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Categories",
  data: function data() {
    return {
      listSlider: {},
      sliderData: {
        TenBST: '',
        MoTa: '',
        Anh: ''
      },
      editSliderData: {},
      errors: {}
    };
  },
  mounted: function mounted() {
    this.getListSlider();
  },
  methods: {
    getListSlider: function () {
      var _getListSlider = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _services_slider_service_js__WEBPACK_IMPORTED_MODULE_1__["getListSlider"]();

              case 3:
                response = _context.sent;
                this.listSlider = response.data;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function getListSlider() {
        return _getListSlider.apply(this, arguments);
      }

      return getListSlider;
    }(),
    showNewSliderModal: function showNewSliderModal() {
      this.$refs['newSliderModal'].show();
    },
    hideNewSliderModal: function hideNewSliderModal() {
      this.$refs['newSliderModal'].hide();
    },
    createSlider: function () {
      var _createSlider = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                formData = new FormData();
                formData.append('TenBST', this.sliderData.TenBST);
                formData.append('MoTa', this.sliderData.MoTa);
                formData.append('Anh', this.sliderData.Anh);
                _context2.next = 7;
                return _services_slider_service_js__WEBPACK_IMPORTED_MODULE_1__["createSlider"](formData);

              case 7:
                response = _context2.sent;
                this.listSlider.unshift(response.data);
                this.hideNewSliderModal();
                this.errors = {};
                this.sliderData = {
                  TenBST: '',
                  MoTa: '',
                  Anh: ''
                };
                swal("Thành công", "Thêm slider phẩm thành công", "success");
                _context2.next = 26;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                _context2.t1 = _context2.t0.response.status;
                _context2.next = _context2.t1 === 422 ? 20 : _context2.t1 === 500 ? 22 : 24;
                break;

              case 20:
                this.errors = _context2.t0.response.data.errors;
                return _context2.abrupt("break", 26);

              case 22:
                swal("Thất bại", "Thêm slider thất bại, xin vui lòng thử lại!", "error");
                return _context2.abrupt("break", 26);

              case 24:
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                return _context2.abrupt("break", 26);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function createSlider() {
        return _createSlider.apply(this, arguments);
      }

      return createSlider;
    }(),
    showEditSliderModal: function showEditSliderModal() {
      this.$refs['editSliderModal'].show();
    },
    hideEditSliderModal: function hideEditSliderModal() {
      this.$refs['editSliderModal'].hide();
    },
    editSlider: function editSlider(slider) {
      this.editSliderData = _objectSpread({}, slider);
      this.showEditSliderModal();
    },
    updateSlider: function () {
      var _updateSlider = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                formData = new FormData();
                formData.append('TenBST', this.editSliderData.TenBST);
                formData.append('MoTa', this.editSliderData.MoTa);
                formData.append('Anh', this.editSliderData.Anh);
                formData.append('_method', 'put');
                _context3.next = 8;
                return _services_slider_service_js__WEBPACK_IMPORTED_MODULE_1__["updateSlider"](this.editSliderData.id, formData);

              case 8:
                response = _context3.sent;
                this.listSlider.map(function (slider) {
                  if (slider.id == response.data.id) {
                    for (var key in response.data) {
                      slider[key] = response.data[key];
                    }
                  }
                });
                this.hideEditSliderModal();
                this.errors = {};
                swal("Thành công", "Cập nhật slider thành công", "success");
                _context3.next = 26;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                _context3.t1 = _context3.t0.response.status;
                _context3.next = _context3.t1 === 422 ? 20 : _context3.t1 === 500 ? 22 : 24;
                break;

              case 20:
                this.errors = _context3.t0.response.data.errors;
                return _context3.abrupt("break", 26);

              case 22:
                swal("Thất bại", "Thêm slider thất bại, xin vui lòng thử lại!", "error");
                return _context3.abrupt("break", 26);

              case 24:
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                return _context3.abrupt("break", 26);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 15]]);
      }));

      function updateSlider() {
        return _updateSlider.apply(this, arguments);
      }

      return updateSlider;
    }(),
    deleteSlider: function () {
      var _deleteSlider = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(slider) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (confirm('Bạn có chất muốn xóa slider này')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.prev = 2;
                _context4.next = 5;
                return _services_slider_service_js__WEBPACK_IMPORTED_MODULE_1__["deleteSlider"](slider.id);

              case 5:
                this.listSlider = this.listSlider.filter(function (obj) {
                  return obj.id != slider.id;
                });
                swal("Thành công", "Xóa slider thành công", "success");
                _context4.next = 18;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                _context4.t1 = _context4.t0.response.status;
                _context4.next = _context4.t1 === 500 ? 14 : 16;
                break;

              case 14:
                swal("Thất bại", _context4.t0.response.data.message, "error");
                return _context4.abrupt("break", 18);

              case 16:
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                return _context4.abrupt("break", 18);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 9]]);
      }));

      function deleteSlider(_x) {
        return _deleteSlider.apply(this, arguments);
      }

      return deleteSlider;
    }()
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container-fluid" },
    [
      _c("div", { staticClass: "card shadow mb-4" }, [
        _c("div", { staticClass: "card-header py-3 d-flex" }, [
          _c("h6", { staticClass: "m-0 font-weight-bold text-primary" }, [
            _vm._v("Quản lý slider")
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary btn-sm ml-auto",
              on: { click: _vm.showNewSliderModal }
            },
            [
              _c("span", { staticClass: "fa fa-plus" }),
              _vm._v(" Thêm danh mục")
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "table-responsive" }, [
            _c(
              "table",
              {
                staticClass: "table table-bordered",
                attrs: { id: "dataTable", width: "100%", cellspacing: "0" }
              },
              [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.listSlider, function(slider, index) {
                    return _c("tr", { key: index }, [
                      _c("td", [_vm._v(_vm._s(index + 1))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(slider.TenBST))]),
                      _vm._v(" "),
                      _c("td", [
                        _c("img", {
                          attrs: { src: "" + slider.Anh, width: "50" }
                        })
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary btn-sm",
                            on: {
                              click: function($event) {
                                return _vm.editSlider(slider)
                              }
                            }
                          },
                          [_c("span", { staticClass: "fa fa-edit" })]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-sm",
                            on: {
                              click: function($event) {
                                return _vm.deleteSlider(slider)
                              }
                            }
                          },
                          [_c("span", { staticClass: "fa fa-trash" })]
                        )
                      ])
                    ])
                  }),
                  0
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "newSliderModal",
          attrs: { "hide-footer": "", title: "Thêm slider" }
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.createSlider($event)
                }
              }
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "name" } }, [_vm._v("Tên")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.sliderData.TenBST,
                      expression: "sliderData.TenBST"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "name",
                    id: "name",
                    placeholder: "Nhập tên slider"
                  },
                  domProps: { value: _vm.sliderData.TenBST },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.sliderData, "TenBST", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.TenBST
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.TenBST[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", { attrs: { for: "motaThem" } }, [
                    _vm._v("Mô tả")
                  ]),
                  _vm._v(" "),
                  _c("ckeditor", {
                    model: {
                      value: _vm.sliderData.MoTa,
                      callback: function($$v) {
                        _vm.$set(_vm.sliderData, "MoTa", $$v)
                      },
                      expression: "sliderData.MoTa"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errors.MoTa
                    ? _c("div", { staticClass: "invalid-feedback" }, [
                        _vm._v(_vm._s(_vm.errors.MoTa[0]))
                      ])
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "name" } }, [_vm._v("Ảnh")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.sliderData.Anh,
                      expression: "sliderData.Anh"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "name",
                    id: "name",
                    placeholder: "Nhập link ảnh slider"
                  },
                  domProps: { value: _vm.sliderData.Anh },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.sliderData, "Anh", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.Anh
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.Anh[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    attrs: { type: "button" },
                    on: { click: _vm.hideNewSliderModal }
                  },
                  [_vm._v("Hủy")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-primary", attrs: { type: "submit" } },
                  [_vm._v("Lưu")]
                )
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "editSliderModal",
          attrs: { "hide-footer": "", title: "Cập nhật loại sản phẩm" }
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.updateSlider($event)
                }
              }
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "name" } }, [_vm._v("Tên")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.editSliderData.TenBST,
                      expression: "editSliderData.TenBST"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "name", id: "name" },
                  domProps: { value: _vm.editSliderData.TenBST },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.editSliderData,
                        "TenBST",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.TenBST
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.TenBST[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", { attrs: { for: "motaThem" } }, [
                    _vm._v("Mô tả")
                  ]),
                  _vm._v(" "),
                  _c("ckeditor", {
                    model: {
                      value: _vm.editSliderData.MoTa,
                      callback: function($$v) {
                        _vm.$set(_vm.editSliderData, "MoTa", $$v)
                      },
                      expression: "editSliderData.MoTa"
                    }
                  }),
                  _vm._v(" "),
                  _vm.errors.MoTa
                    ? _c("div", { staticClass: "invalid-feedback" }, [
                        _vm._v(_vm._s(_vm.errors.MoTa[0]))
                      ])
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "name" } }, [_vm._v("Ảnh")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.editSliderData.Anh,
                      expression: "editSliderData.Anh"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "name", id: "name" },
                  domProps: { value: _vm.editSliderData.Anh },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.editSliderData, "Anh", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.Anh
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.Anh[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    attrs: { type: "button" },
                    on: { click: _vm.hideEditSliderModal }
                  },
                  [_vm._v("Hủy")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  { staticClass: "btn btn-primary", attrs: { type: "submit" } },
                  [_vm._v("Lưu")]
                )
              ])
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("#")]),
        _vm._v(" "),
        _c("th", [_vm._v("Tên")]),
        _vm._v(" "),
        _c("th", [_vm._v("Ảnh")]),
        _vm._v(" "),
        _c("th", [_vm._v("Hành động")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/services/slider_service.js":
/*!*************************************************!*\
  !*** ./resources/js/services/slider_service.js ***!
  \*************************************************/
/*! exports provided: getListSlider, createSlider, updateSlider, deleteSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListSlider", function() { return getListSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSlider", function() { return createSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSlider", function() { return updateSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSlider", function() { return deleteSlider; });
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http_service */ "./resources/js/services/http_service.js");

function getListSlider() {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get('slider');
}
function createSlider(data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().post('slider', data);
}
function updateSlider(id, data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().post("slider/".concat(id), data);
}
function deleteSlider(id) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])()["delete"]("slider/".concat(id));
}

/***/ }),

/***/ "./resources/js/views/slider/Slider.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/slider/Slider.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider.vue?vue&type=template&id=e8e2a800&scoped=true& */ "./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true&");
/* harmony import */ var _Slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider.vue?vue&type=script&lang=js& */ "./resources/js/views/slider/Slider.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e8e2a800",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/slider/Slider.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/slider/Slider.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/slider/Slider.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Slider.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/slider/Slider.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Slider.vue?vue&type=template&id=e8e2a800&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/slider/Slider.vue?vue&type=template&id=e8e2a800&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Slider_vue_vue_type_template_id_e8e2a800_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);