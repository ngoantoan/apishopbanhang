(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_sanPham_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/sanPham_service.js */ "./resources/js/services/sanPham_service.js");


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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Products",
  data: function data() {
    return {
      MaSP: this.$route.params.id,
      listChiTietSanPham: {},
      chiTietSanPhamData: {
        KichThuoc: '',
        Mau: '',
        MoTa: ''
      },
      editChiTietSanPhamData: {},
      errors: {}
    };
  },
  mounted: function mounted() {
    this.getListChiTietSanPham();
  },
  methods: {
    getListChiTietSanPham: function () {
      var _getListChiTietSanPham = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _services_sanPham_service_js__WEBPACK_IMPORTED_MODULE_1__["getListChiTietSanPham"](this.MaSP);

              case 3:
                response = _context.sent;
                this.listChiTietSanPham = response.data;
                _context.next = 16;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                _context.t1 = _context.t0.response.status;
                _context.next = _context.t1 === 500 ? 12 : 14;
                break;

              case 12:
                swal("Thất bại", _context.t0.response.data.message, "error");
                return _context.abrupt("break", 16);

              case 14:
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                return _context.abrupt("break", 16);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function getListChiTietSanPham() {
        return _getListChiTietSanPham.apply(this, arguments);
      }

      return getListChiTietSanPham;
    }(),
    showNewChiTietSanPhamModal: function showNewChiTietSanPhamModal() {
      this.$refs['newChiTietSanPhamModal'].show();
    },
    hideNewChiTietSanPhamModal: function hideNewChiTietSanPhamModal() {
      this.$refs['newChiTietSanPhamModal'].hide();
    },
    createChiTietSanPham: function () {
      var _createChiTietSanPham = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                formData = new FormData();
                formData.append('MaSP', this.MaSP);
                formData.append('KichThuoc', this.chiTietSanPhamData.KichThuoc);
                formData.append('Mau', this.chiTietSanPhamData.Mau);
                formData.append('MoTa', this.chiTietSanPhamData.MoTa);
                _context2.next = 8;
                return _services_sanPham_service_js__WEBPACK_IMPORTED_MODULE_1__["createChiTietSanPham"](formData);

              case 8:
                response = _context2.sent;
                this.listChiTietSanPham.unshift(response.data);
                this.hideNewChiTietSanPhamModal();
                this.errors = {};
                this.chiTietSanPhamData = {
                  KichThuoc: '',
                  Mau: '',
                  MoTa: ''
                };
                swal("Thành công", "Thêm chi tiết sản phẩm sản phẩm thành công", "success");
                _context2.next = 27;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                _context2.t1 = _context2.t0.response.status;
                _context2.next = _context2.t1 === 422 ? 21 : _context2.t1 === 500 ? 23 : 25;
                break;

              case 21:
                this.errors = _context2.t0.response.data.errors;
                return _context2.abrupt("break", 27);

              case 23:
                swal("Thất bại", _context2.t0.response.data.message, "error");
                return _context2.abrupt("break", 27);

              case 25:
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                return _context2.abrupt("break", 27);

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 16]]);
      }));

      function createChiTietSanPham() {
        return _createChiTietSanPham.apply(this, arguments);
      }

      return createChiTietSanPham;
    }(),
    showEditChiTietSanPhamModal: function showEditChiTietSanPhamModal() {
      this.$refs['editChiTietSanPhamModal'].show();
    },
    hideEditChiTietSanPhamModal: function hideEditChiTietSanPhamModal() {
      this.$refs['editChiTietSanPhamModal'].hide();
    },
    editChiTietSanPham: function editChiTietSanPham(chiTietSanPham) {
      this.editChiTietSanPhamData = _objectSpread({}, chiTietSanPham);
      this.showEditChiTietSanPhamModal();
    },
    updateChiTietSanPham: function () {
      var _updateChiTietSanPham = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var formData, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                formData = new FormData();
                formData.append('MaSP', this.MaSP);
                formData.append('KichThuoc', this.editChiTietSanPhamData.KichThuoc);
                formData.append('Mau', this.editChiTietSanPhamData.Mau);
                formData.append('MoTa', this.editChiTietSanPhamData.MoTa);
                _context3.next = 8;
                return _services_sanPham_service_js__WEBPACK_IMPORTED_MODULE_1__["updateChiTietSanPham"](this.editChiTietSanPhamData.id, formData);

              case 8:
                response = _context3.sent;
                this.listChiTietSanPham.map(function (chiTietSanPham) {
                  if (chiTietSanPham.id == response.data.id) {
                    for (var key in response.data) {
                      chiTietSanPham[key] = response.data[key];
                    }
                  }
                });
                this.hideEditChiTietSanPhamModal();
                this.errors = {};
                swal("Thành công", "Cập nhật loại sản phẩm thành công", "success");
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
                swal("Thất bại", _context3.t0.response.data.message, "error");
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

      function updateChiTietSanPham() {
        return _updateChiTietSanPham.apply(this, arguments);
      }

      return updateChiTietSanPham;
    }(),
    deleteChiTietSanPham: function () {
      var _deleteChiTietSanPham = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(id) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (confirm('Bạn có chất muốn xóa danh mục này')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.prev = 2;
                _context4.next = 5;
                return _services_sanPham_service_js__WEBPACK_IMPORTED_MODULE_1__["deleteChiTietSanPham"](id);

              case 5:
                this.listChiTietSanPham = this.listChiTietSanPham.filter(function (obj) {
                  return obj.id != id;
                });
                swal("Thành công", "Xóa chi tiết sản phẩm thành công", "success");
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 9]]);
      }));

      function deleteChiTietSanPham(_x) {
        return _deleteChiTietSanPham.apply(this, arguments);
      }

      return deleteChiTietSanPham;
    }()
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
            _vm._v("Quản lý danh sách chi tiết sản phẩm")
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary btn-sm ml-auto",
              on: { click: _vm.showNewChiTietSanPhamModal }
            },
            [
              _c("span", { staticClass: "fa fa-plus" }),
              _vm._v(" Thêm chi tiết sản phẩm")
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
                  _vm._l(_vm.listChiTietSanPham, function(chiSanPham, index) {
                    return _c("tr", { key: index }, [
                      _c("td", [_vm._v(_vm._s(index + 1))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(chiSanPham.KichThuoc))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(chiSanPham.Mau))]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary btn-sm",
                            attrs: { title: "Cập nhật chi tiết sản phẩm" },
                            on: {
                              click: function($event) {
                                return _vm.editChiTietSanPham(chiSanPham)
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
                            attrs: { title: "Xóa chi tiết sản phẩm" },
                            on: {
                              click: function($event) {
                                return _vm.deleteChiTietSanPham(chiSanPham.id)
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
          ref: "newChiTietSanPhamModal",
          attrs: { "hide-footer": "", title: "Thêm chi tiết sản phẩm" }
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.createChiTietSanPham($event)
                }
              }
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "KichThuoc" } }, [
                  _vm._v("Kích thước")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.chiTietSanPhamData.KichThuoc,
                      expression: "chiTietSanPhamData.KichThuoc"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", placeholder: "Nhập kích thước" },
                  domProps: { value: _vm.chiTietSanPhamData.KichThuoc },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.chiTietSanPhamData,
                        "KichThuoc",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.KichThuoc
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.KichThuoc[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "Mau" } }, [_vm._v("Màu")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.chiTietSanPhamData.Mau,
                      expression: "chiTietSanPhamData.Mau"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", placeholder: "Nhập Màu" },
                  domProps: { value: _vm.chiTietSanPhamData.Mau },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.chiTietSanPhamData,
                        "Mau",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.Mau
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.Mau[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", { attrs: { for: "MoTa" } }, [_vm._v("Mô tả")]),
                  _vm._v(" "),
                  _c("ckeditor", {
                    model: {
                      value: _vm.chiTietSanPhamData.MoTa,
                      callback: function($$v) {
                        _vm.$set(_vm.chiTietSanPhamData, "MoTa", $$v)
                      },
                      expression: "chiTietSanPhamData.MoTa"
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
              _c("div", { staticClass: "float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    attrs: { type: "button" },
                    on: { click: _vm.hideNewChiTietSanPhamModal }
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
          ref: "editChiTietSanPhamModal",
          attrs: { "hide-footer": "", title: "Cập nhật chi tiết sản phẩm" }
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.updateChiTietSanPham($event)
                }
              }
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "KichThuoc" } }, [
                  _vm._v("Kích thước")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.editChiTietSanPhamData.KichThuoc,
                      expression: "editChiTietSanPhamData.KichThuoc"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.editChiTietSanPhamData.KichThuoc },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.editChiTietSanPhamData,
                        "KichThuoc",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.KichThuoc
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.KichThuoc[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "Mau" } }, [_vm._v("Màu")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.editChiTietSanPhamData.Mau,
                      expression: "editChiTietSanPhamData.Mau"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text" },
                  domProps: { value: _vm.editChiTietSanPhamData.Mau },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.editChiTietSanPhamData,
                        "Mau",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.errors.Mau
                  ? _c("div", { staticClass: "invalid-feedback" }, [
                      _vm._v(_vm._s(_vm.errors.Mau[0]))
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", { attrs: { for: "MoTa" } }, [_vm._v("Mô tả")]),
                  _vm._v(" "),
                  _c("ckeditor", {
                    model: {
                      value: _vm.editChiTietSanPhamData.MoTa,
                      callback: function($$v) {
                        _vm.$set(_vm.editChiTietSanPhamData, "MoTa", $$v)
                      },
                      expression: "editChiTietSanPhamData.MoTa"
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
              _c("div", { staticClass: "float-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger",
                    attrs: { type: "button" },
                    on: { click: _vm.hideEditChiTietSanPhamModal }
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
        _c("th", [_vm._v("Kích thước")]),
        _vm._v(" "),
        _c("th", [_vm._v("Màu")]),
        _vm._v(" "),
        _c("th", [_vm._v("Hành động")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/services/sanPham_service.js":
/*!**************************************************!*\
  !*** ./resources/js/services/sanPham_service.js ***!
  \**************************************************/
/*! exports provided: getListLoaiSanPham, getListSanPham, createSanPham, updateSanPham, deleteSanPham, getListChiTietSanPham, createChiTietSanPham, updateChiTietSanPham, deleteChiTietSanPham, getListSanPhamBoSuTap, getBoSuTapCuaSanPham, createSanPhamBoSuTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListLoaiSanPham", function() { return getListLoaiSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListSanPham", function() { return getListSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSanPham", function() { return createSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSanPham", function() { return updateSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSanPham", function() { return deleteSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListChiTietSanPham", function() { return getListChiTietSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createChiTietSanPham", function() { return createChiTietSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateChiTietSanPham", function() { return updateChiTietSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteChiTietSanPham", function() { return deleteChiTietSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListSanPhamBoSuTap", function() { return getListSanPhamBoSuTap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoSuTapCuaSanPham", function() { return getBoSuTapCuaSanPham; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSanPhamBoSuTap", function() { return createSanPhamBoSuTap; });
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http_service */ "./resources/js/services/http_service.js");

function getListLoaiSanPham() {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get('loai-san-pham');
}
function getListSanPham() {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get('san-pham');
}
function createSanPham(data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["httpFile"])().post('san-pham', data);
}
function updateSanPham(id, data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["httpFile"])().post("san-pham/".concat(id), data);
}
function deleteSanPham(id) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])()["delete"]("san-pham/".concat(id));
} // Chi tiết sản phẩm

function getListChiTietSanPham(id) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get("danh-sach-chi-tiet-san-pham/".concat(id));
}
function createChiTietSanPham(data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().post('them-chi-tiet-san-pham', data);
}
function updateChiTietSanPham(id, data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().post("cap-nhat-chi-tiet-san-pham/".concat(id), data);
}
function deleteChiTietSanPham(id) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])()["delete"]("xoa-chi-tiet-san-pham/".concat(id));
} // Sản phẩm bộ sưu tập

function getListSanPhamBoSuTap() {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get('bo-su-tap');
}
function getBoSuTapCuaSanPham(id) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().get("bo-suu-tap-cua-san-pham/".concat(id));
}
function createSanPhamBoSuTap(data) {
  return Object(_http_service__WEBPACK_IMPORTED_MODULE_0__["http"])().post('them-san-pham-bo-su-tap', data);
}

/***/ }),

/***/ "./resources/js/views/san_pham/ChiTietSanPham.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/san_pham/ChiTietSanPham.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true& */ "./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true&");
/* harmony import */ var _ChiTietSanPham_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChiTietSanPham.vue?vue&type=script&lang=js& */ "./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ChiTietSanPham_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6f66918e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/san_pham/ChiTietSanPham.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChiTietSanPham_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChiTietSanPham.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChiTietSanPham_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/san_pham/ChiTietSanPham.vue?vue&type=template&id=6f66918e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChiTietSanPham_vue_vue_type_template_id_6f66918e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);