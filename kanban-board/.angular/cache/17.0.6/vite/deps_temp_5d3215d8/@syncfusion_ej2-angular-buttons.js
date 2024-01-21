import {
  Animation,
  ChildProperty,
  Collection,
  Complex,
  Component as Component2,
  Event,
  EventHandler,
  KeyboardEvents,
  NotifyPropertyChanges,
  Observer,
  Property,
  SanitizeHtmlHelper,
  addClass,
  animationMode,
  append,
  attributes,
  closest,
  compile,
  createElement,
  deleteObject,
  detach,
  extend,
  formatUnit,
  getInstance,
  getTemplateEngine,
  getUniqueID,
  getValue,
  isBlazor,
  isNullOrUndefined,
  isObject,
  isRippleEnabled,
  isUndefined,
  remove,
  removeClass,
  rippleEffect,
  select,
  selectAll,
  setTemplateEngine,
  setValue
} from "./chunk-6LU2UWWE.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-CZENSYTZ.js";
import {
  CommonModule
} from "./chunk-5FJW54NJ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Injector,
  NgModule,
  Renderer2,
  ViewContainerRef,
  forwardRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-2JPK63OV.js";
import "./chunk-5YLPGB74.js";
import "./chunk-VZ4NLEGY.js";
import {
  __decorate
} from "./chunk-C5RABDQ7.js";
import "./chunk-ENBES6XL.js";

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-angular-base/src/util.js
function applyMixins(derivedClass, baseClass) {
  baseClass.forEach(function(baseClass2) {
    Object.getOwnPropertyNames(baseClass2.prototype).forEach(function(name) {
      if (!derivedClass.prototype.hasOwnProperty(name) || baseClass2.isFormBase && name !== "constructor") {
        derivedClass.prototype[name] = baseClass2.prototype[name];
      }
    });
  });
}
function ComponentMixins(baseClass) {
  return function(derivedClass) {
    applyMixins(derivedClass, baseClass);
  };
}
function registerEvents(eventList, obj, direct) {
  var ngEventsEmitter = {};
  if (eventList && eventList.length) {
    for (var _i = 0, eventList_1 = eventList; _i < eventList_1.length; _i++) {
      var event_1 = eventList_1[_i];
      if (direct === true) {
        obj.propCollection[event_1] = new EventEmitter(false);
        obj[event_1] = obj.propCollection[event_1];
      } else {
        ngEventsEmitter[event_1] = new EventEmitter(false);
      }
    }
    if (direct !== true) {
      obj.setProperties(ngEventsEmitter, true);
    }
  }
}
function clearTemplate(_this, templateNames, index) {
  var regTemplates = Object.keys(_this.registeredTemplate);
  if (regTemplates.length) {
    var regProperties = templateNames && templateNames.filter(function(val) {
      return /\./g.test(val) ? false : true;
    });
    var tabaccordionTemp = /tab|accordion|toolbar/.test(_this.getModuleName());
    for (var _i = 0, _a = regProperties && regProperties || regTemplates; _i < _a.length; _i++) {
      var registeredTemplate = _a[_i];
      if (index && index.length) {
        for (var e = 0; e < index.length; e++) {
          if (tabaccordionTemp) {
            for (var m = 0; m < _this.registeredTemplate[registeredTemplate].length; m++) {
              var value = _this.registeredTemplate[registeredTemplate][m];
              if (value && value === index[e]) {
                value.destroy();
                _this.registeredTemplate[registeredTemplate].splice(m, 1);
              }
            }
          } else {
            for (var m = 0; m < _this.registeredTemplate.template.length; m++) {
              var value = _this.registeredTemplate.template[m].rootNodes[0];
              if (value === index[e]) {
                var rt = _this.registeredTemplate[registeredTemplate];
                rt[m].destroy();
              }
            }
          }
        }
      } else {
        if (_this.registeredTemplate[registeredTemplate]) {
          for (var _b = 0, _c = _this.registeredTemplate[registeredTemplate]; _b < _c.length; _b++) {
            var rt = _c[_b];
            if (!rt.destroyed) {
              if (rt._view) {
                var pNode = rt._view.renderer.parentNode(rt.rootNodes[0]);
                if (!isNullOrUndefined(pNode)) {
                  for (var m = 0; m < rt.rootNodes.length; m++) {
                    pNode.appendChild(rt.rootNodes[m]);
                  }
                }
              }
              rt.destroy();
            }
          }
        }
      }
      if (!tabaccordionTemp || !index) {
        delete _this.registeredTemplate[registeredTemplate];
      }
    }
  }
  var _loop_1 = function(tagObject2) {
    if (tagObject2.instance) {
      tagObject2.instance.clearTemplate(templateNames && templateNames.filter(function(val) {
        return new RegExp(tagObject2.name).test(val) ? true : false;
      }));
    }
  };
  for (var _d = 0, _e = _this.tagObjects; _d < _e.length; _d++) {
    var tagObject = _e[_d];
    _loop_1(tagObject);
  }
}
function setValue2(nameSpace, value, object) {
  var keys = nameSpace.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  var fromObj = object || {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (i + 1 === keys.length) {
      fromObj[key] = value === void 0 ? {} : value;
    } else if (fromObj[key] === void 0) {
      fromObj[key] = {};
    }
    fromObj = fromObj[key];
  }
  return fromObj;
}

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-angular-base/src/complex-array-base.js
var refRegex = /Ref$/;
var ComplexBase = (
  /** @class */
  function() {
    function ComplexBase2() {
      this.hasChanges = false;
      this.propCollection = {};
      this.dataSource = {};
      this.tags = [];
      this.tagObjects = [];
    }
    ComplexBase2.prototype.ngOnInit = function() {
      this.registeredTemplate = {};
      for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        var objInstance = getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
        if (objInstance) {
          this.tagObjects.push({ instance: objInstance, name: tag });
        }
      }
      var templateProperties = Object.keys(this);
      for (var i = 0; i < templateProperties.length; i++) {
        var tempProp = getValue(templateProperties[i], this);
        if (typeof tempProp === "object" && tempProp && tempProp.elementRef) {
          if (!getValue(templateProperties[i].indexOf("Ref") !== -1 ? templateProperties[i] : templateProperties[i] + "Ref", this)) {
            setValue(templateProperties[i].indexOf("Ref") !== -1 ? templateProperties[i] : templateProperties[i] + "Ref", tempProp, this);
          }
          if (getValue("viewContainerRef", this) && !getValue("_viewContainerRef", tempProp.elementRef.nativeElement) && !getValue("propName", tempProp.elementRef.nativeElement)) {
            setValue("_viewContainerRef", getValue("viewContainerRef", this), tempProp.elementRef.nativeElement);
            setValue("propName", templateProperties[i].replace("Ref", ""), tempProp.elementRef.nativeElement);
          }
        }
      }
      templateProperties = Object.keys(this);
      templateProperties = templateProperties.filter(function(val) {
        return /Ref$/i.test(val);
      });
      for (var _b = 0, templateProperties_1 = templateProperties; _b < templateProperties_1.length; _b++) {
        var tempName = templateProperties_1[_b];
        var propName = tempName.replace("Ref", "");
        setValue(propName.replace("_", "."), getValue(propName, this), this.propCollection);
      }
      var propList = Object.keys(this);
      if (this.directivePropList) {
        for (var k = 0; k < this.directivePropList.length; k++) {
          var dirPropName = this.directivePropList[k];
          if (propList.indexOf(dirPropName) !== -1 && (getValue(dirPropName, this) === false || getValue(dirPropName, this))) {
            setValue(dirPropName, getValue(dirPropName, this), this.propCollection);
          }
        }
        this.hasChanges = true;
      }
      this.isInitChanges = true;
    };
    ComplexBase2.prototype.registerEvents = function(eventList) {
      registerEvents(eventList, this, true);
    };
    ComplexBase2.prototype.ngOnChanges = function(changes) {
      for (var _i = 0, _a = Object.keys(changes); _i < _a.length; _i++) {
        var propName = _a[_i];
        var changedVal = changes[propName];
        this.propCollection[propName] = changedVal.currentValue;
      }
      this.isUpdated = false;
      this.hasChanges = true;
    };
    ComplexBase2.prototype.clearTemplate = function(templateNames) {
      clearTemplate(this, templateNames);
    };
    ComplexBase2.prototype.getProperties = function() {
      for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
        var tagObject = _a[_i];
        this.propCollection[tagObject.name] = tagObject.instance.getProperties();
      }
      return this.propCollection;
    };
    ComplexBase2.prototype.isChanged = function() {
      var result = this.hasChanges;
      if (!isNullOrUndefined(this.propCollection[this.property])) {
        var tempProps = this.propCollection[this.property];
        var props = Object.keys(tempProps[0]);
        for (var d = 0; d < props.length; d++) {
          if (!isNullOrUndefined(this.propCollection[props[d]])) {
            var val = getValue(props[d], this);
            var propVal = this.propCollection[this.property][0][props[d]];
            if (!isNullOrUndefined(val) && this.propCollection[props[d]] !== val && propVal !== val) {
              setValue(props[d], val, this.propCollection[this.property][0]);
              setValue(props[d], val, this.propCollection);
              this.hasChanges = true;
              this.isUpdated = false;
            }
          }
        }
      }
      for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
        var item = _a[_i];
        result = result || item.instance.hasChanges;
      }
      return result || this.hasChanges;
    };
    ComplexBase2.prototype.ngAfterContentChecked = function() {
      this.hasChanges = this.isChanged();
      if (this.isInitChanges || this.hasChanges) {
        var templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function(val) {
          return refRegex.test(val);
        });
        for (var _i = 0, templateProperties_2 = templateProperties; _i < templateProperties_2.length; _i++) {
          var tempName = templateProperties_2[_i];
          var propName = tempName.replace("Ref", "");
          setValue(propName.replace("_", "."), getValue(propName, this), this.propCollection);
        }
      }
    };
    ComplexBase2.prototype.ngAfterViewChecked = function() {
      if (this.isUpdated) {
        this.hasChanges = false;
      }
    };
    ComplexBase2.prototype.ngAfterViewInit = function() {
      this.isInitChanges = false;
    };
    ComplexBase2.prototype.ngOnDestroy = function() {
      this.directivePropList = [];
    };
    return ComplexBase2;
  }()
);
var ArrayBase = (
  /** @class */
  function() {
    function ArrayBase2(propertyName) {
      this.list = [];
      this.hasChanges = false;
      this.propertyName = propertyName;
    }
    ArrayBase2.prototype.ngOnInit = function() {
      this.isInitChanges = true;
    };
    ArrayBase2.prototype.ngAfterContentInit = function() {
      var _this = this;
      var index = 0;
      this.list = this.children.map(function(child) {
        child.dirIndex = index++;
        child.property = _this.propertyName;
        return child;
      });
      this.hasChanges = true;
    };
    ArrayBase2.prototype.getProperties = function() {
      var onlyProp = [];
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        onlyProp.push(item.getProperties());
      }
      return onlyProp;
    };
    ArrayBase2.prototype.isChanged = function() {
      var _this = this;
      var result = false;
      var index = 0;
      var isSourceChanged = false;
      var childrenDataSource = this.children.map(function(child) {
        return child;
      });
      if (this.list.length === this.children.length) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].propCollection.dataSource) {
            if (this.list[i].dataSource && this.list[i].propCollection.dataSource !== this.list[i].dataSource) {
              this.list[i].propCollection.dataSource = this.list[i].dataSource;
              this.list[i].hasChanges = true;
            }
            if (this.list[i].property !== "series") {
              isSourceChanged = JSON.stringify(this.list[i].propCollection.dataSource) !== JSON.stringify(childrenDataSource[i].propCollection.dataSource);
            }
          }
          isSourceChanged = this.list[i].hasChanges !== childrenDataSource[i].hasChanges;
        }
      }
      this.hasNewChildren = this.list.length !== this.children.length || isSourceChanged ? true : null;
      if (this.hasNewChildren) {
        this.list = this.children.map(function(child) {
          child.dirIndex = index++;
          child.property = _this.propertyName;
          return child;
        });
      }
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        result = result || item.hasChanges;
      }
      return !!this.list.length && result;
    };
    ArrayBase2.prototype.clearTemplate = function(templateNames) {
      var _this = this;
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        item.clearTemplate(templateNames && templateNames.map(function(val) {
          return new RegExp(_this.propertyName).test(val) ? val.replace(_this.propertyName + ".", "") : val;
        }));
      }
    };
    ArrayBase2.prototype.ngAfterContentChecked = function() {
      this.hasChanges = this.isChanged();
      for (var i = 0; i < this.list.length; i++) {
        if (getValue("childColumns", this.list[i]) && getValue("property", this.list[i]) === "columns") {
          setValue("columns", getValue("childColumns", this.list[i]).getProperties(), this.list[i].propCollection);
        }
        this.list[i].isUpdated = true;
      }
    };
    ArrayBase2.prototype.ngAfterViewInit = function() {
      this.isInitChanges = false;
    };
    ArrayBase2.prototype.ngOnDestroy = function() {
      this.list = [];
    };
    return ArrayBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-angular-base/src/component-base.js
var ComponentBase = (
  /** @class */
  function() {
    function ComponentBase2() {
      this.isProtectedOnChange = true;
      this.isFormInit = true;
    }
    ComponentBase2.prototype.saveChanges = function(key, newValue, oldValue) {
      if (this.isProtectedOnChange) {
        return;
      }
      this.oldProperties[key] = oldValue;
      this.changedProperties[key] = newValue;
      this.finalUpdate();
      var changeTime = setTimeout(this.dataBind.bind(this));
      var clearUpdate = function() {
        clearTimeout(changeTime);
      };
      this.finalUpdate = clearUpdate;
    };
    ;
    ComponentBase2.prototype.ngOnInit = function(isTempRef) {
      var tempOnThis = isTempRef || this;
      tempOnThis.registeredTemplate = {};
      tempOnThis.ngBoundedEvents = {};
      tempOnThis.isAngular = true;
      tempOnThis.isFormInit = true;
      if (isTempRef) {
        this.tags = isTempRef.tags;
      }
      tempOnThis.tags = this.tags || [];
      tempOnThis.complexTemplate = this.complexTemplate || [];
      tempOnThis.tagObjects = [];
      tempOnThis.ngAttr = this.getAngularAttr(tempOnThis.element);
      tempOnThis.createElement = function(tagName, prop) {
        var ele = tempOnThis.srenderer ? tempOnThis.srenderer.createElement(tagName) : createElement(tagName);
        if (typeof prop === "undefined") {
          return ele;
        }
        ele.innerHTML = prop.innerHTML ? prop.innerHTML : "";
        if (prop.className !== void 0) {
          ele.className = prop.className;
        }
        if (prop.id !== void 0) {
          ele.id = prop.id;
        }
        if (prop.styles !== void 0) {
          ele.setAttribute("style", prop.styles);
        }
        if (tempOnThis.ngAttr !== void 0) {
          ele.setAttribute(tempOnThis.ngAttr, "");
        }
        if (prop.attrs !== void 0) {
          attributes(ele, prop.attrs);
        }
        return ele;
      };
      for (var _i = 0, _a = tempOnThis.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        var tagObject = {
          instance: getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), tempOnThis),
          name: tag
        };
        tempOnThis.tagObjects.push(tagObject);
      }
      var complexTemplates = Object.keys(tempOnThis);
      for (var i = 0; i < complexTemplates.length; i++) {
        var compProp = getValue(complexTemplates[i], tempOnThis);
        if (typeof compProp === "object" && compProp && compProp.elementRef) {
          if (typeof compProp === "object" && compProp && compProp.elementRef && complexTemplates[i].indexOf("_") !== -1 && complexTemplates[i].indexOf("Ref") === -1) {
            setValue(complexTemplates[i] + "Ref", compProp, tempOnThis);
          }
          if (tempOnThis.viewContainerRef && !getValue("_viewContainerRef", compProp.elementRef.nativeElement) && !getValue("propName", compProp.elementRef.nativeElement)) {
            setValue("_viewContainerRef", tempOnThis.viewContainerRef, compProp.elementRef.nativeElement);
            setValue("propName", complexTemplates[i].replace("Ref", ""), compProp.elementRef.nativeElement);
          }
        }
      }
      complexTemplates = Object.keys(tempOnThis);
      complexTemplates = complexTemplates.filter(function(val2) {
        return /Ref$/i.test(val2) && /\_/i.test(val2);
      });
      for (var _b = 0, complexTemplates_1 = complexTemplates; _b < complexTemplates_1.length; _b++) {
        var tempName = complexTemplates_1[_b];
        var propName = tempName.replace("Ref", "");
        var val = {};
        setValue(propName.replace("_", "."), getValue(propName, tempOnThis), val);
        tempOnThis.setProperties(val, true);
      }
    };
    ComponentBase2.prototype.getAngularAttr = function(ele) {
      var attributes2 = ele.attributes;
      var length = attributes2.length;
      var ngAr;
      for (var i = 0; i < length; i++) {
        if (/_ngcontent/g.test(attributes2[i].name)) {
          ngAr = attributes2[i].name;
        }
      }
      return ngAr;
    };
    ;
    ComponentBase2.prototype.ngAfterViewInit = function(isTempRef) {
      var tempAfterViewThis = isTempRef || this;
      var regExp = /ejs-tab|ejs-accordion/g;
      if (regExp.test(tempAfterViewThis.ngEle.nativeElement.outerHTML)) {
        tempAfterViewThis.ngEle.nativeElement.style.visibility = "hidden";
      }
      var templateProperties = Object.keys(tempAfterViewThis);
      templateProperties = templateProperties.filter(function(val) {
        return /Ref$/i.test(val);
      });
      var ngtempRef = tempAfterViewThis.getModuleName() === "DocumentEditor";
      for (var _i = 0, templateProperties_1 = templateProperties; _i < templateProperties_1.length; _i++) {
        var tempName = templateProperties_1[_i];
        var propName = tempName.replace("Ref", "");
        setValue(propName.replace("_", "."), getValue(propName + "Ref", tempAfterViewThis), tempAfterViewThis);
      }
      var appendToComponent = function(tempAfterViewThis2) {
        if (typeof window !== "undefined" && tempAfterViewThis2.element || tempAfterViewThis2.getModuleName().includes("btn")) {
          tempAfterViewThis2.appendTo(tempAfterViewThis2.element);
          tempAfterViewThis2.ngEle.nativeElement.style.visibility = "";
        }
      };
      if (!ngtempRef) {
        setTimeout(function() {
          appendToComponent(tempAfterViewThis);
        });
      } else {
        appendToComponent(tempAfterViewThis);
      }
    };
    ComponentBase2.prototype.ngOnDestroy = function(isTempRef) {
      var tempOnDestroyThis = isTempRef || this;
      setTimeout(function() {
        if (typeof window !== "undefined" && tempOnDestroyThis.element.classList.contains("e-control")) {
          tempOnDestroyThis.destroy();
          tempOnDestroyThis.clearTemplate(null);
          setTimeout(function() {
            for (var _i = 0, _a = Object.keys(tempOnDestroyThis); _i < _a.length; _i++) {
              var key = _a[_i];
              var value = tempOnDestroyThis[key];
              if (value && /object/.test(typeof value) && Object.keys(value).length !== 0) {
                if (/properties|changedProperties|childChangedProperties|oldProperties|moduleLoader/.test(key)) {
                  for (var _b = 0, _c = Object.keys(tempOnDestroyThis[key]); _b < _c.length; _b++) {
                    var propKey = _c[_b];
                    var propValue = value[propKey];
                    if (propValue && /object/.test(typeof propValue) && Object.keys(propValue).length !== 0 && (propValue.parent || propValue.parentObj)) {
                      tempOnDestroyThis[key][propKey] = null;
                    }
                  }
                } else {
                  if (value.parent || value.parentObj) {
                    tempOnDestroyThis[key] = null;
                  }
                }
              }
            }
          });
        }
      });
    };
    ComponentBase2.prototype.clearTemplate = function(templateNames, index) {
      clearTemplate(this, templateNames, index);
    };
    ;
    ComponentBase2.prototype.ngAfterContentChecked = function(isTempRef) {
      var tempAfterContentThis = isTempRef || this;
      for (var _i = 0, _a = tempAfterContentThis.tagObjects; _i < _a.length; _i++) {
        var tagObject = _a[_i];
        if (!isUndefined(tagObject.instance) && (tagObject.instance.isInitChanges || tagObject.instance.hasChanges || tagObject.instance.hasNewChildren)) {
          if (tagObject.instance.isInitChanges) {
            var propObj = {};
            var complexDirProps = void 0;
            var list = getValue("instance.list", tagObject);
            if (list && list.length) {
              complexDirProps = list[0].directivePropList;
            }
            var skip = true;
            if (tempAfterContentThis.getModuleName && tempAfterContentThis.getModuleName() === "gantt") {
              skip = false;
            }
            if (complexDirProps && skip && complexDirProps.indexOf(tagObject.instance.propertyName) === -1) {
              var compDirPropList = Object.keys(tagObject.instance.list[0].propCollection);
              for (var h = 0; h < tagObject.instance.list.length; h++) {
                tagObject.instance.list[h].propCollection[tagObject.instance.propertyName] = [];
                var obj = {};
                for (var k = 0; k < compDirPropList.length; k++) {
                  var complexPropName = compDirPropList[k];
                  obj[complexPropName] = tagObject.instance.list[h].propCollection[complexPropName];
                }
                var _loop_1 = function(i2) {
                  var tag = tagObject.instance.list[h].tags[i2];
                  var childObj = getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), tagObject.instance.list[h]);
                  if (childObj) {
                    var innerchildObj = tagObject.instance.list[h]["child" + tag.substring(0, 1).toUpperCase() + tag.substring(1)];
                    var updateChildTag_1 = function(innerchild) {
                      var innerLevelTag = [];
                      if (innerchild) {
                        for (var j = 0; j < innerchild.list.length; j++) {
                          var innerTag = innerchild.list[0].tags[0];
                          if (innerTag) {
                            var innerchildTag = getValue("child" + innerTag.substring(0, 1).toUpperCase() + innerTag.substring(1), innerchild.list[j]);
                            if (innerchildTag) {
                              innerchild.list[j].tagObjects.push({ instance: innerchildTag, name: innerTag });
                              innerLevelTag.push(innerchildTag);
                            }
                          }
                        }
                      }
                      if (innerLevelTag.length !== 0) {
                        for (var l = 0; l < innerLevelTag.length; l++) {
                          updateChildTag_1(innerLevelTag[l]);
                        }
                      }
                      ;
                    };
                    updateChildTag_1(innerchildObj);
                    tagObject.instance.list[h].tagObjects.push({ instance: childObj, name: tag });
                  }
                };
                for (var i = 0; i < tagObject.instance.list[h].tags.length; i++) {
                  _loop_1(i);
                }
                tagObject.instance.list[h].propCollection[tagObject.instance.propertyName].push(obj);
              }
            }
            propObj[tagObject.name] = tagObject.instance.getProperties();
            tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
          } else {
            if (tempAfterContentThis[tagObject.name].length !== tagObject.instance.list.length || /diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName())) {
              tempAfterContentThis[tagObject.name] = tagObject.instance.list;
            }
            for (var _b = 0, _c = tagObject.instance.list; _b < _c.length; _b++) {
              var list = _c[_b];
              var curIndex = tagObject.instance.list.indexOf(list);
              var curChild = getValue(tagObject.name, tempAfterContentThis)[curIndex];
              var complexTemplates = Object.keys(curChild);
              complexTemplates = complexTemplates.filter(function(val) {
                return /Ref$/i.test(val);
              });
              if (curChild.properties && Object.keys(curChild.properties).length !== 0) {
                for (var _d = 0, complexTemplates_2 = complexTemplates; _d < complexTemplates_2.length; _d++) {
                  var complexPropName = complexTemplates_2[_d];
                  complexPropName = complexPropName.replace(/Ref/, "");
                  curChild.properties[complexPropName] = !curChild.properties[complexPropName] ? curChild.propCollection[complexPropName] : curChild.properties[complexPropName];
                }
              }
              if (!isUndefined(curChild) && !isUndefined(curChild.setProperties)) {
                if (/diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName())) {
                  curChild.setProperties(list.getProperties(), true);
                } else {
                  curChild.setProperties(list.getProperties());
                }
              }
              list.isUpdated = true;
            }
          }
        }
      }
    };
    ComponentBase2.prototype.registerEvents = function(eventList) {
      registerEvents(eventList, this);
    };
    ComponentBase2.prototype.twoWaySetter = function(newVal, prop) {
      var oldVal = getValue(prop, this.properties);
      if (oldVal === newVal) {
        return;
      }
      this.saveChanges(prop, newVal, oldVal);
      setValue(prop, isNullOrUndefined(newVal) ? null : newVal, this.properties);
      getValue(prop + "Change", this).emit(newVal);
    };
    ComponentBase2.prototype.addTwoWay = function(propList) {
      var _this = this;
      var _loop_2 = function(prop2) {
        getValue(prop2, this_1);
        Object.defineProperty(this_1, prop2, {
          get: function() {
            return getValue(prop2, _this.properties);
          },
          set: function(newVal) {
            return _this.twoWaySetter(newVal, prop2);
          }
        });
        setValue(prop2 + "Change", new EventEmitter(), this_1);
      };
      var this_1 = this;
      for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
        var prop = propList_1[_i];
        _loop_2(prop);
      }
    };
    ComponentBase2.prototype.addEventListener = function(eventName, handler) {
      var eventObj = getValue(eventName, this);
      if (!isUndefined(eventObj)) {
        if (!this.ngBoundedEvents[eventName]) {
          this.ngBoundedEvents[eventName] = /* @__PURE__ */ new Map();
        }
        this.ngBoundedEvents[eventName].set(handler, eventObj.subscribe(handler));
      }
    };
    ComponentBase2.prototype.removeEventListener = function(eventName, handler) {
      var eventObj = getValue(eventName, this);
      if (!isUndefined(eventObj)) {
        this.ngBoundedEvents[eventName].get(handler).unsubscribe();
      }
    };
    ComponentBase2.prototype.trigger = function(eventName, eventArgs, success) {
      var eventObj = getValue(eventName, this);
      var prevDetection = this.isProtectedOnChange;
      this.isProtectedOnChange = false;
      if (eventArgs) {
        eventArgs.name = eventName;
      }
      if (!isUndefined(eventObj)) {
        eventObj.next(eventArgs);
      }
      var localEventObj = getValue("local" + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
      if (!isUndefined(localEventObj)) {
        localEventObj.call(this, eventArgs);
      }
      this.isProtectedOnChange = prevDetection;
      if (success) {
        this.preventChange = this.isPreventChange;
        success.call(this, eventArgs);
      }
      this.isPreventChange = false;
    };
    return ComponentBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-angular-base/src/form-base.js
var FormBase = (
  /** @class */
  function() {
    function FormBase2() {
    }
    FormBase2.prototype.propagateChange = function(_) {
      return;
    };
    FormBase2.prototype.propagateTouch = function() {
      return;
    };
    FormBase2.prototype.localChange = function(e) {
      var value = e.checked === void 0 ? e.value : e.checked;
      this.objCheck = isObject(value);
      if (this.isUpdated === true) {
        this.angularValue = this.oldValue;
      }
      if (this.objCheck === true) {
        this.duplicateValue = JSON.stringify(value);
        this.duplicateAngularValue = JSON.stringify(this.angularValue);
        if (this.duplicateValue !== this.duplicateAngularValue && this.propagateChange !== void 0 && value !== void 0) {
          this.propagateChange(value);
          this.angularValue = value;
        }
      } else {
        if (value !== this.angularValue && this.propagateChange !== void 0 && value !== void 0) {
          if (value !== "" && value !== null) {
            this.propagateChange(value);
            this.angularValue = value;
          } else {
            var optionalValue = value;
            this.propagateChange(optionalValue);
            this.angularValue = value;
          }
        }
      }
      this.cdr.markForCheck();
    };
    FormBase2.prototype.registerOnChange = function(registerFunction) {
      this.propagateChange = registerFunction;
    };
    FormBase2.prototype.registerOnTouched = function(registerFunction) {
      this.propagateTouch = registerFunction;
    };
    FormBase2.prototype.twoWaySetter = function(newVal, prop) {
      var oldVal = this.oldValue || getValue(prop, this.properties);
      var ele = this.inputElement || this.element;
      if (ele && oldVal === newVal && this.value === newVal && (ele.value === void 0 || ele.value === "")) {
        return;
      }
      this.saveChanges(prop, newVal, oldVal);
      setValue(prop, isNullOrUndefined(newVal) ? null : newVal, this.properties);
      getValue(prop + "Change", this).emit(newVal);
    };
    FormBase2.prototype.ngAfterViewInit = function(isTempRef) {
      var tempFormAfterViewThis = isTempRef || this;
      if (typeof window !== "undefined") {
        if (tempFormAfterViewThis.getModuleName().includes("dropdown")) {
          setTimeout(function() {
            tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
          });
        } else {
          tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
        }
        var ele = tempFormAfterViewThis.inputElement || tempFormAfterViewThis.element;
        ele.addEventListener("focus", tempFormAfterViewThis.ngOnFocus.bind(tempFormAfterViewThis));
        ele.addEventListener("blur", tempFormAfterViewThis.ngOnBlur.bind(tempFormAfterViewThis));
      }
      this.isFormInit = false;
    };
    FormBase2.prototype.setDisabledState = function(disabled) {
      this.enabled = !disabled;
      this.disabled = disabled;
    };
    FormBase2.prototype.writeValue = function(value) {
      var regExp = /ejs-radiobutton/g;
      if (this.checked === void 0) {
        this.value = value;
      } else {
        if (this.ngEle) {
          if (typeof value === "boolean") {
            if (regExp.test(this.ngEle.nativeElement.outerHTML)) {
              this.checked = value === this.value;
            } else {
              this.checked = value;
            }
          } else {
            this.checked = value === this.value;
          }
        }
      }
      this.angularValue = value;
      this.isUpdated = true;
      this.preventChange = this.isFormInit ? false : true;
      this.cdr.markForCheck();
      if (value === null) {
        return;
      }
    };
    FormBase2.prototype.ngOnFocus = function(e) {
      if (this.skipFromEvent !== true) {
        this.focus.emit(e);
      }
      this.cdr.markForCheck();
    };
    FormBase2.prototype.ngOnBlur = function(e) {
      this.propagateTouch();
      if (this.skipFromEvent !== true) {
        this.blur.emit(e);
      }
      this.cdr.markForCheck();
    };
    FormBase2.isFormBase = true;
    return FormBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-angular-base/src/template.js
var stringCompiler = getTemplateEngine();
function compile2(templateEle, helper) {
  if (typeof templateEle === "string" || typeof templateEle === "function" && templateEle.prototype && templateEle.prototype.CSPTemplate) {
    return stringCompiler(templateEle, helper);
  } else {
    var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
    var pName_1 = templateEle.elementRef.nativeElement.propName;
    return function(data, component, propName) {
      var context = { $implicit: data };
      var conRef = contRef_1 ? contRef_1 : component.viewContainerRef;
      var viewRef = conRef.createEmbeddedView(templateEle, context);
      if (getValue("currentInstance.element.nodeName", conRef) === "EJS-MENTION") {
        viewRef.detectChanges();
      } else {
        viewRef.markForCheck();
      }
      var viewCollection = component && component.registeredTemplate ? component.registeredTemplate : getValue("currentInstance.registeredTemplate", conRef);
      propName = propName && component.registeredTemplate ? propName : pName_1;
      if (typeof viewCollection[propName] === "undefined") {
        viewCollection[propName] = [];
      }
      viewCollection[propName].push(viewRef);
      return viewRef.rootNodes;
    };
  }
}
function Template(defaultValue) {
  return function(target, key) {
    var propertyDescriptor = {
      set: setter(key),
      get: getter(key, defaultValue),
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, key, propertyDescriptor);
  };
}
function setter(key) {
  return function(val) {
    if (val === void 0) {
      return;
    }
    setValue(key + "Ref", val, this);
    if (typeof val !== "string") {
      val.elementRef.nativeElement._viewContainerRef = this.viewContainerRef;
      val.elementRef.nativeElement.propName = key;
    } else {
      if (this.saveChanges) {
        this.saveChanges(key, val, void 0);
        this.dataBind();
      }
    }
  };
}
function getter(key, defaultValue) {
  return function() {
    return getValue(key + "Ref", this) || defaultValue;
  };
}
setTemplateEngine({ compile: compile2 });

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/common/common.js
function wrapperInitialize(createElement2, tag, type, element, WRAPPER4, role) {
  var input2 = element;
  if (element.tagName === tag) {
    var ejInstance = getValue("ej2_instances", element);
    input2 = createElement2("input", { attrs: { "type": type } });
    var props = ["change", "cssClass", "label", "labelPosition", "id"];
    for (var index = 0, len = element.attributes.length; index < len; index++) {
      if (props.indexOf(element.attributes[index].nodeName) === -1) {
        input2.setAttribute(element.attributes[index].nodeName, element.attributes[index].nodeValue);
      }
    }
    attributes(element, { "class": WRAPPER4 });
    element.appendChild(input2);
    setValue("ej2_instances", ejInstance, input2);
    deleteObject(element, "ej2_instances");
  }
  return input2;
}
function getTextNode(element) {
  var node;
  var childnode = element.childNodes;
  for (var i = 0; i < childnode.length; i++) {
    node = childnode[i];
    if (node.nodeType === 3) {
      return node;
    }
  }
  return null;
}
function destroy(ejInst, wrapper, tagName) {
  if (tagName === "INPUT") {
    wrapper.parentNode.insertBefore(ejInst.element, wrapper);
    detach(wrapper);
    ejInst.element.checked = false;
    ["name", "value", "disabled"].forEach(function(key) {
      ejInst.element.removeAttribute(key);
    });
  } else {
    ["role", "aria-checked", "class"].forEach(function(key) {
      wrapper.removeAttribute(key);
    });
    wrapper.innerHTML = "";
    ejInst.element = wrapper;
  }
}
function preRender(proxy, control, wrapper, element, moduleName) {
  element = wrapperInitialize(proxy.createElement, control, "checkbox", element, wrapper, moduleName);
  proxy.element = element;
  if (proxy.element.getAttribute("type") !== "checkbox") {
    proxy.element.setAttribute("type", "checkbox");
  }
  if (!proxy.element.id) {
    proxy.element.id = getUniqueID("e-" + moduleName);
  }
}
function createCheckBox(createElement2, enableRipple, options) {
  if (enableRipple === void 0) {
    enableRipple = false;
  }
  if (options === void 0) {
    options = {};
  }
  var wrapper = createElement2("div", { className: "e-checkbox-wrapper e-css" });
  if (options.cssClass) {
    addClass([wrapper], options.cssClass.split(" "));
  }
  if (options.enableRtl) {
    wrapper.classList.add("e-rtl");
  }
  if (enableRipple) {
    var rippleSpan = createElement2("span", { className: "e-ripple-container" });
    rippleEffect(rippleSpan, { isCenterRipple: true, duration: 400 });
    wrapper.appendChild(rippleSpan);
  }
  var frameSpan = createElement2("span", { className: "e-frame e-icons" });
  if (options.checked) {
    frameSpan.classList.add("e-check");
  }
  wrapper.appendChild(frameSpan);
  if (options.label) {
    var labelSpan = createElement2("span", { className: "e-label" });
    if (options.disableHtmlEncode) {
      labelSpan.textContent = options.label;
    } else {
      labelSpan.innerHTML = options.label;
    }
    wrapper.appendChild(labelSpan);
  }
  return wrapper;
}
function rippleMouseHandler(e, rippleSpan) {
  if (rippleSpan) {
    var event_1 = document.createEvent("MouseEvents");
    event_1.initEvent(e.type, false, true);
    rippleSpan.dispatchEvent(event_1);
  }
}
function setHiddenInput(proxy, wrap) {
  if (proxy.element.getAttribute("ejs-for")) {
    wrap.appendChild(proxy.createElement("input", {
      attrs: { "name": proxy.name || proxy.element.name, "value": "false", "type": "hidden" }
    }));
  }
}

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/button/button.js
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IconPosition;
(function(IconPosition2) {
  IconPosition2["Left"] = "Left";
  IconPosition2["Right"] = "Right";
  IconPosition2["Top"] = "Top";
  IconPosition2["Bottom"] = "Bottom";
})(IconPosition || (IconPosition = {}));
var buttonObserver = new Observer();
var cssClassName = {
  RTL: "e-rtl",
  BUTTON: "e-btn",
  PRIMARY: "e-primary",
  ICONBTN: "e-icon-btn"
};
var Button = (
  /** @class */
  function(_super) {
    __extends(Button2, _super);
    function Button2(options, element) {
      return _super.call(this, options, element) || this;
    }
    Button2.prototype.preRender = function() {
    };
    Button2.prototype.render = function() {
      this.initialize();
      this.removeRippleEffect = rippleEffect(this.element, { selector: "." + cssClassName.BUTTON });
      this.renderComplete();
    };
    Button2.prototype.initialize = function() {
      if (this.cssClass) {
        addClass([this.element], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      if (this.isPrimary) {
        this.element.classList.add(cssClassName.PRIMARY);
      }
      if (!isBlazor() || isBlazor() && this.getModuleName() !== "progress-btn") {
        if (this.content) {
          var tempContent = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(this.content) : this.content;
          this.element.innerHTML = tempContent;
        }
        this.setIconCss();
      }
      if (this.enableRtl) {
        this.element.classList.add(cssClassName.RTL);
      }
      if (this.disabled) {
        this.controlStatus(this.disabled);
      } else {
        this.wireEvents();
      }
    };
    Button2.prototype.controlStatus = function(disabled) {
      this.element.disabled = disabled;
    };
    Button2.prototype.setIconCss = function() {
      if (this.iconCss) {
        var span = this.createElement("span", { className: "e-btn-icon " + this.iconCss });
        if (!this.element.textContent.trim()) {
          this.element.classList.add(cssClassName.ICONBTN);
        } else {
          span.classList.add("e-icon-" + this.iconPosition.toLowerCase());
          if (this.iconPosition === "Top" || this.iconPosition === "Bottom") {
            this.element.classList.add("e-" + this.iconPosition.toLowerCase() + "-icon-btn");
          }
        }
        var node = this.element.childNodes[0];
        if (node && (this.iconPosition === "Left" || this.iconPosition === "Top")) {
          this.element.insertBefore(span, node);
        } else {
          this.element.appendChild(span);
        }
      }
    };
    Button2.prototype.wireEvents = function() {
      if (this.isToggle) {
        EventHandler.add(this.element, "click", this.btnClickHandler, this);
      }
    };
    Button2.prototype.unWireEvents = function() {
      if (this.isToggle) {
        EventHandler.remove(this.element, "click", this.btnClickHandler);
      }
    };
    Button2.prototype.btnClickHandler = function() {
      if (this.element.classList.contains("e-active")) {
        this.element.classList.remove("e-active");
      } else {
        this.element.classList.add("e-active");
      }
    };
    Button2.prototype.destroy = function() {
      var classList = [
        cssClassName.PRIMARY,
        cssClassName.RTL,
        cssClassName.ICONBTN,
        "e-success",
        "e-info",
        "e-danger",
        "e-warning",
        "e-flat",
        "e-outline",
        "e-small",
        "e-bigger",
        "e-active",
        "e-round",
        "e-top-icon-btn",
        "e-bottom-icon-btn"
      ];
      if (this.cssClass) {
        classList = classList.concat(this.cssClass.split(" "));
      }
      _super.prototype.destroy.call(this);
      removeClass([this.element], classList);
      if (!this.element.getAttribute("class")) {
        this.element.removeAttribute("class");
      }
      if (this.disabled) {
        this.element.removeAttribute("disabled");
      }
      if (this.content) {
        this.element.innerHTML = this.element.innerHTML.replace(this.content, "");
      }
      var span = this.element.querySelector("span.e-btn-icon");
      if (span) {
        detach(span);
      }
      this.unWireEvents();
      if (isRippleEnabled) {
        this.removeRippleEffect();
      }
    };
    Button2.prototype.getModuleName = function() {
      return "btn";
    };
    Button2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Button2.Inject = function() {
    };
    Button2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var span = this.element.querySelector("span.e-btn-icon");
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "isPrimary":
            if (newProp.isPrimary) {
              this.element.classList.add(cssClassName.PRIMARY);
            } else {
              this.element.classList.remove(cssClassName.PRIMARY);
            }
            break;
          case "disabled":
            this.controlStatus(newProp.disabled);
            break;
          case "iconCss": {
            span = this.element.querySelector("span.e-btn-icon");
            if (span) {
              if (newProp.iconCss) {
                span.className = "e-btn-icon " + newProp.iconCss;
                if (this.element.textContent.trim()) {
                  if (this.iconPosition === "Left") {
                    span.classList.add("e-icon-left");
                  } else {
                    span.classList.add("e-icon-right");
                  }
                }
              } else {
                detach(span);
              }
            } else {
              this.setIconCss();
            }
            break;
          }
          case "iconPosition":
            removeClass([this.element], ["e-top-icon-btn", "e-bottom-icon-btn"]);
            span = this.element.querySelector("span.e-btn-icon");
            if (span) {
              detach(span);
            }
            this.setIconCss();
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([this.element], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([this.element], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            }
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              this.element.classList.add(cssClassName.RTL);
            } else {
              this.element.classList.remove(cssClassName.RTL);
            }
            break;
          case "content": {
            var node = getTextNode(this.element);
            if (!node) {
              this.element.classList.remove(cssClassName.ICONBTN);
            }
            if (!isBlazor() || isBlazor() && !this.isServerRendered && this.getModuleName() !== "progress-btn") {
              if (this.enableHtmlSanitizer) {
                newProp.content = SanitizeHtmlHelper.sanitize(newProp.content);
              }
              this.element.innerHTML = newProp.content;
              this.setIconCss();
            }
            break;
          }
          case "isToggle":
            if (newProp.isToggle) {
              EventHandler.add(this.element, "click", this.btnClickHandler, this);
            } else {
              EventHandler.remove(this.element, "click", this.btnClickHandler);
              removeClass([this.element], ["e-active"]);
            }
            break;
        }
      }
    };
    Button2.prototype.click = function() {
      this.element.click();
    };
    Button2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate2([
      Property("Left")
    ], Button2.prototype, "iconPosition", void 0);
    __decorate2([
      Property("")
    ], Button2.prototype, "iconCss", void 0);
    __decorate2([
      Property(false)
    ], Button2.prototype, "disabled", void 0);
    __decorate2([
      Property(false)
    ], Button2.prototype, "isPrimary", void 0);
    __decorate2([
      Property("")
    ], Button2.prototype, "cssClass", void 0);
    __decorate2([
      Property("")
    ], Button2.prototype, "content", void 0);
    __decorate2([
      Property(false)
    ], Button2.prototype, "isToggle", void 0);
    __decorate2([
      Property()
    ], Button2.prototype, "locale", void 0);
    __decorate2([
      Property(false)
    ], Button2.prototype, "enableHtmlSanitizer", void 0);
    __decorate2([
      Event()
    ], Button2.prototype, "created", void 0);
    Button2 = __decorate2([
      NotifyPropertyChanges
    ], Button2);
    return Button2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/check-box/check-box.js
var __extends2 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CHECK = "e-check";
var DISABLED = "e-checkbox-disabled";
var FRAME = "e-frame";
var INDETERMINATE = "e-stop";
var LABEL = "e-label";
var RIPPLE = "e-ripple-container";
var RIPPLECHECK = "e-ripple-check";
var RIPPLEINDETERMINATE = "e-ripple-stop";
var RTL = "e-rtl";
var WRAPPER = "e-checkbox-wrapper";
var containerAttr = ["title", "class", "style", "disabled", "readonly", "name", "value"];
var CheckBox = (
  /** @class */
  function(_super) {
    __extends2(CheckBox2, _super);
    function CheckBox2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isFocused = false;
      _this.isMouseClick = false;
      _this.clickTriggered = false;
      _this.validCheck = true;
      return _this;
    }
    CheckBox2.prototype.changeState = function(state, isInitialize) {
      var ariaState;
      var rippleSpan;
      var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
      if (isRippleEnabled) {
        rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
      }
      if (state === "check") {
        if (frameSpan) {
          frameSpan.classList.remove(INDETERMINATE);
          frameSpan.classList.add(CHECK);
        }
        if (rippleSpan) {
          rippleSpan.classList.remove(RIPPLEINDETERMINATE);
          rippleSpan.classList.add(RIPPLECHECK);
        }
        ariaState = "true";
        this.element.checked = true;
        if ((this.element.required || closest(this.element, "form") && closest(this.element, "form").classList.contains("e-formvalidator")) && this.validCheck && !isInitialize) {
          this.element.checked = false;
          this.validCheck = false;
        } else if (this.element.required || closest(this.element, "form") && closest(this.element, "form").classList.contains("e-formvalidator")) {
          this.validCheck = true;
        }
      } else if (state === "uncheck") {
        if (frameSpan) {
          removeClass([frameSpan], [CHECK, INDETERMINATE]);
        }
        if (rippleSpan) {
          removeClass([rippleSpan], [RIPPLECHECK, RIPPLEINDETERMINATE]);
        }
        ariaState = "false";
        this.element.checked = false;
        if ((this.element.required || closest(this.element, "form") && closest(this.element, "form").classList.contains("e-formvalidator")) && this.validCheck && !isInitialize) {
          this.element.checked = true;
          this.validCheck = false;
        } else if (this.element.required || closest(this.element, "form") && closest(this.element, "form").classList.contains("e-formvalidator")) {
          this.validCheck = true;
        }
      } else {
        if (frameSpan) {
          frameSpan.classList.remove(CHECK);
          frameSpan.classList.add(INDETERMINATE);
        }
        if (rippleSpan) {
          rippleSpan.classList.remove(RIPPLECHECK);
          rippleSpan.classList.add(RIPPLEINDETERMINATE);
        }
        ariaState = "mixed";
        this.element.indeterminate = true;
        this.indeterminate = true;
      }
    };
    CheckBox2.prototype.clickHandler = function(event) {
      if (event.target.tagName === "INPUT" && this.clickTriggered) {
        if (this.isVue) {
          this.changeState(this.checked ? "check" : "uncheck");
        }
        this.clickTriggered = false;
        return;
      }
      if (event.target.tagName === "SPAN" || event.target.tagName === "LABEL") {
        this.clickTriggered = true;
      }
      if (this.isMouseClick) {
        this.focusOutHandler();
        this.isMouseClick = false;
      }
      if (this.indeterminate) {
        this.changeState(this.checked ? "check" : "uncheck");
        this.indeterminate = false;
        this.element.indeterminate = false;
      } else if (this.checked) {
        this.changeState("uncheck");
        this.checked = false;
      } else {
        this.changeState("check");
        this.checked = true;
      }
      var changeEventArgs = { checked: this.updateVueArrayModel(false), event };
      this.trigger("change", changeEventArgs);
      event.stopPropagation();
    };
    CheckBox2.prototype.destroy = function() {
      var _this = this;
      var wrapper = this.getWrapper();
      _super.prototype.destroy.call(this);
      if (this.wrapper) {
        wrapper = this.wrapper;
        if (!this.disabled) {
          this.unWireEvents();
        }
        if (this.tagName === "INPUT") {
          if (this.getWrapper() && wrapper.parentNode) {
            wrapper.parentNode.insertBefore(this.element, wrapper);
          }
          detach(wrapper);
          this.element.checked = false;
          if (this.indeterminate) {
            this.element.indeterminate = false;
          }
          ["name", "value", "disabled"].forEach(function(key) {
            _this.element.removeAttribute(key);
          });
        } else {
          ["class"].forEach(function(key) {
            wrapper.removeAttribute(key);
          });
          wrapper.innerHTML = "";
          this.element = wrapper;
          if (this.refreshing) {
            ["e-control", "e-checkbox", "e-lib"].forEach(function(key) {
              _this.element.classList.add(key);
            });
            setValue("ej2_instances", [this], this.element);
          }
        }
      }
    };
    CheckBox2.prototype.focusHandler = function() {
      this.isFocused = true;
    };
    CheckBox2.prototype.focusOutHandler = function() {
      var wrapper = this.getWrapper();
      if (wrapper) {
        wrapper.classList.remove("e-focus");
      }
      this.isFocused = false;
    };
    CheckBox2.prototype.getModuleName = function() {
      return "checkbox";
    };
    CheckBox2.prototype.getPersistData = function() {
      return this.addOnPersist(["checked", "indeterminate"]);
    };
    CheckBox2.prototype.getWrapper = function() {
      if (this.element && this.element.parentElement) {
        return this.element.parentElement.parentElement;
      } else {
        return null;
      }
    };
    CheckBox2.prototype.getLabel = function() {
      if (this.element) {
        return this.element.parentElement;
      } else {
        return null;
      }
    };
    CheckBox2.prototype.initialize = function() {
      if (isNullOrUndefined(this.initialCheckedValue)) {
        this.initialCheckedValue = this.checked;
      }
      if (this.name) {
        this.element.setAttribute("name", this.name);
      }
      if (this.value) {
        this.element.setAttribute("value", this.value);
        if (this.isVue && typeof this.value === "boolean" && this.value === true) {
          this.setProperties({ "checked": true }, true);
        }
      }
      if (this.checked) {
        this.changeState("check", true);
      }
      if (this.indeterminate) {
        this.changeState();
      }
      if (this.disabled) {
        this.setDisabled();
      }
    };
    CheckBox2.prototype.initWrapper = function() {
      var wrapper = this.element.parentElement;
      if (!wrapper.classList.contains(WRAPPER)) {
        wrapper = this.createElement("div", {
          className: WRAPPER
        });
        this.element.parentNode.insertBefore(wrapper, this.element);
      }
      var label = this.createElement("label", { attrs: { for: this.element.id } });
      var frameSpan = this.createElement("span", { className: "e-icons " + FRAME });
      wrapper.classList.add("e-wrapper");
      if (this.enableRtl) {
        wrapper.classList.add(RTL);
      }
      if (this.cssClass) {
        addClass([wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      wrapper.appendChild(label);
      label.appendChild(this.element);
      setHiddenInput(this, label);
      label.appendChild(frameSpan);
      if (isRippleEnabled) {
        var rippleSpan = this.createElement("span", { className: RIPPLE });
        if (this.labelPosition === "Before") {
          label.appendChild(rippleSpan);
        } else {
          label.insertBefore(rippleSpan, frameSpan);
        }
        rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
      }
      if (this.label) {
        this.setText(this.label);
      }
    };
    CheckBox2.prototype.keyUpHandler = function() {
      if (this.isFocused) {
        this.getWrapper().classList.add("e-focus");
      }
    };
    CheckBox2.prototype.labelMouseDownHandler = function(e) {
      this.isMouseClick = true;
      var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
      rippleMouseHandler(e, rippleSpan);
    };
    CheckBox2.prototype.labelMouseLeaveHandler = function(e) {
      var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE)[0];
      if (rippleSpan) {
        var rippleElem = rippleSpan.querySelectorAll(".e-ripple-element");
        for (var i = rippleElem.length - 1; i > 0; i--) {
          rippleSpan.removeChild(rippleSpan.childNodes[i]);
        }
        rippleMouseHandler(e, rippleSpan);
      }
    };
    CheckBox2.prototype.labelMouseUpHandler = function(e) {
      this.isMouseClick = true;
      var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
      if (rippleSpan) {
        var rippleElem = rippleSpan.querySelectorAll(".e-ripple-element");
        for (var i = 0; i < rippleElem.length - 1; i++) {
          rippleSpan.removeChild(rippleSpan.childNodes[i]);
        }
        rippleMouseHandler(e, rippleSpan);
      }
    };
    CheckBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var wrapper = this.getWrapper();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "checked":
            this.indeterminate = false;
            this.element.indeterminate = false;
            this.changeState(newProp.checked ? "check" : "uncheck");
            break;
          case "indeterminate":
            if (newProp.indeterminate) {
              this.changeState();
            } else {
              this.element.indeterminate = false;
              this.changeState(this.checked ? "check" : "uncheck");
            }
            break;
          case "disabled":
            if (newProp.disabled) {
              this.setDisabled();
              this.wrapper = this.getWrapper();
              this.unWireEvents();
            } else {
              this.element.disabled = false;
              wrapper.classList.remove(DISABLED);
              wrapper.setAttribute("aria-disabled", "false");
              this.wireEvents();
            }
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([wrapper], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([wrapper], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            }
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              wrapper.classList.add(RTL);
            } else {
              wrapper.classList.remove(RTL);
            }
            break;
          case "label":
            this.setText(newProp.label);
            break;
          case "labelPosition": {
            var label = wrapper.getElementsByClassName(LABEL)[0];
            var labelWrap = wrapper.getElementsByTagName("label")[0];
            detach(label);
            if (newProp.labelPosition === "After") {
              labelWrap.appendChild(label);
            } else {
              labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
            }
            break;
          }
          case "name":
            this.element.setAttribute("name", newProp.name);
            break;
          case "value":
            if (this.isVue && typeof newProp.value === "object") {
              break;
            }
            this.element.setAttribute("value", newProp.value);
            break;
          case "htmlAttributes":
            this.updateHtmlAttributeToWrapper();
            break;
        }
      }
    };
    CheckBox2.prototype.preRender = function() {
      var element = this.element;
      this.tagName = this.element.tagName;
      element = wrapperInitialize(this.createElement, "EJS-CHECKBOX", "checkbox", element, WRAPPER, "checkbox");
      this.element = element;
      if (this.element.getAttribute("type") !== "checkbox") {
        this.element.setAttribute("type", "checkbox");
      }
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
    };
    CheckBox2.prototype.render = function() {
      this.initWrapper();
      this.initialize();
      if (!this.disabled) {
        this.wireEvents();
      }
      this.updateHtmlAttributeToWrapper();
      this.updateVueArrayModel(true);
      this.renderComplete();
      this.wrapper = this.getWrapper();
    };
    CheckBox2.prototype.setDisabled = function() {
      var wrapper = this.getWrapper();
      this.element.disabled = true;
      wrapper.classList.add(DISABLED);
      wrapper.setAttribute("aria-disabled", "true");
    };
    CheckBox2.prototype.setText = function(text) {
      var wrapper = this.getWrapper();
      if (!wrapper) {
        return;
      }
      var label = wrapper.getElementsByClassName(LABEL)[0];
      if (label) {
        label.textContent = text;
      } else {
        text = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text;
        label = this.createElement("span", { className: LABEL, innerHTML: text });
        var labelWrap = wrapper.getElementsByTagName("label")[0];
        if (this.labelPosition === "Before") {
          labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
        } else {
          labelWrap.appendChild(label);
        }
      }
    };
    CheckBox2.prototype.changeHandler = function(e) {
      e.stopPropagation();
    };
    CheckBox2.prototype.formResetHandler = function() {
      this.checked = this.initialCheckedValue;
      this.element.checked = this.initialCheckedValue;
    };
    CheckBox2.prototype.unWireEvents = function() {
      var wrapper = this.wrapper;
      EventHandler.remove(wrapper, "click", this.clickHandler);
      EventHandler.remove(this.element, "keyup", this.keyUpHandler);
      EventHandler.remove(this.element, "focus", this.focusHandler);
      EventHandler.remove(this.element, "focusout", this.focusOutHandler);
      var label = wrapper.getElementsByTagName("label")[0];
      EventHandler.remove(label, "mousedown", this.labelMouseDownHandler);
      EventHandler.remove(label, "mouseup", this.labelMouseUpHandler);
      EventHandler.remove(label, "mouseleave", this.labelMouseLeaveHandler);
      var formElem = closest(this.element, "form");
      if (formElem) {
        EventHandler.remove(formElem, "reset", this.formResetHandler);
      }
      if (this.tagName === "EJS-CHECKBOX") {
        EventHandler.remove(this.element, "change", this.changeHandler);
      }
    };
    CheckBox2.prototype.wireEvents = function() {
      var wrapper = this.getWrapper();
      EventHandler.add(wrapper, "click", this.clickHandler, this);
      EventHandler.add(this.element, "keyup", this.keyUpHandler, this);
      EventHandler.add(this.element, "focus", this.focusHandler, this);
      EventHandler.add(this.element, "focusout", this.focusOutHandler, this);
      var label = wrapper.getElementsByTagName("label")[0];
      EventHandler.add(label, "mousedown", this.labelMouseDownHandler, this);
      EventHandler.add(label, "mouseup", this.labelMouseUpHandler, this);
      EventHandler.add(label, "mouseleave", this.labelMouseLeaveHandler, this);
      var formElem = closest(this.element, "form");
      if (formElem) {
        EventHandler.add(formElem, "reset", this.formResetHandler, this);
      }
      if (this.tagName === "EJS-CHECKBOX") {
        EventHandler.add(this.element, "change", this.changeHandler, this);
      }
    };
    CheckBox2.prototype.updateVueArrayModel = function(init) {
      if (this.isVue && typeof this.value === "object") {
        var value = this.element.value;
        if (value && this.value) {
          if (init) {
            for (var i = 0; i < this.value.length; i++) {
              if (value === this.value[i]) {
                this.changeState("check");
                this.setProperties({ "checked": true }, true);
              }
            }
          } else {
            var index = this.value.indexOf(value);
            if (this.checked) {
              if (index < 0) {
                this.value.push(value);
              }
            } else {
              if (index > -1) {
                this.value.splice(index, 1);
              }
            }
            return this.value;
          }
        }
      }
      return this.validCheck ? this.element.checked : !this.element.checked;
    };
    CheckBox2.prototype.updateHtmlAttributeToWrapper = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          var wrapper = this.getWrapper();
          if (containerAttr.indexOf(key) > -1) {
            if (key === "class") {
              addClass([wrapper], this.htmlAttributes["" + key].split(" "));
            } else if (key === "title") {
              wrapper.setAttribute(key, this.htmlAttributes["" + key]);
            } else if (key === "style") {
              var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
              frameSpan.setAttribute(key, this.htmlAttributes["" + key]);
            } else if (key === "disabled") {
              if (this.htmlAttributes["" + key] === "true") {
                this.setDisabled();
              }
              this.element.setAttribute(key, this.htmlAttributes["" + key]);
            } else {
              this.element.setAttribute(key, this.htmlAttributes["" + key]);
            }
          } else {
            wrapper.setAttribute(key, this.htmlAttributes["" + key]);
          }
        }
      }
    };
    CheckBox2.prototype.click = function() {
      this.element.click();
    };
    CheckBox2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate3([
      Event()
    ], CheckBox2.prototype, "change", void 0);
    __decorate3([
      Event()
    ], CheckBox2.prototype, "created", void 0);
    __decorate3([
      Property(false)
    ], CheckBox2.prototype, "checked", void 0);
    __decorate3([
      Property("")
    ], CheckBox2.prototype, "cssClass", void 0);
    __decorate3([
      Property(false)
    ], CheckBox2.prototype, "disabled", void 0);
    __decorate3([
      Property(false)
    ], CheckBox2.prototype, "indeterminate", void 0);
    __decorate3([
      Property("")
    ], CheckBox2.prototype, "label", void 0);
    __decorate3([
      Property("After")
    ], CheckBox2.prototype, "labelPosition", void 0);
    __decorate3([
      Property("")
    ], CheckBox2.prototype, "name", void 0);
    __decorate3([
      Property("")
    ], CheckBox2.prototype, "value", void 0);
    __decorate3([
      Property(false)
    ], CheckBox2.prototype, "enableHtmlSanitizer", void 0);
    __decorate3([
      Property({})
    ], CheckBox2.prototype, "htmlAttributes", void 0);
    CheckBox2 = __decorate3([
      NotifyPropertyChanges
    ], CheckBox2);
    return CheckBox2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/radio-button/radio-button.js
var __extends3 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LABEL2 = "e-label";
var RIPPLE2 = "e-ripple-container";
var RTL2 = "e-rtl";
var WRAPPER2 = "e-radio-wrapper";
var ATTRIBUTES = ["title", "class", "style", "disabled", "readonly", "name", "value"];
var RadioButton = (
  /** @class */
  function(_super) {
    __extends3(RadioButton2, _super);
    function RadioButton2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isFocused = false;
      return _this;
    }
    RadioButton_1 = RadioButton2;
    RadioButton2.prototype.changeHandler = function(event) {
      this.checked = true;
      this.dataBind();
      var value = this.element.getAttribute("value");
      value = this.isVue && value ? this.element.value : this.value;
      var type = typeof this.value;
      if (this.isVue && type === "boolean") {
        value = value === "true" ? true : false;
      }
      this.trigger("change", { value, event });
      if (this.isAngular) {
        event.stopPropagation();
      }
    };
    RadioButton2.prototype.updateChange = function() {
      var input2;
      var instance;
      var radioGrp = this.getRadioGroup();
      for (var i = 0; i < radioGrp.length; i++) {
        input2 = radioGrp[i];
        if (input2 !== this.element) {
          instance = getInstance(input2, RadioButton_1);
          instance.checked = false;
          if (this.tagName === "EJS-RADIOBUTTON") {
            instance.angularValue = this.value;
          }
        }
      }
    };
    RadioButton2.prototype.destroy = function() {
      var _this = this;
      var radioWrap = this.wrapper;
      _super.prototype.destroy.call(this);
      if (radioWrap) {
        if (!this.disabled) {
          this.unWireEvents();
        }
        if (this.tagName === "INPUT") {
          if (radioWrap.parentNode) {
            radioWrap.parentNode.insertBefore(this.element, radioWrap);
          }
          detach(radioWrap);
          this.element.checked = false;
          ["name", "value", "disabled"].forEach(function(key) {
            _this.element.removeAttribute(key);
          });
        } else {
          ["role", "aria-checked", "class"].forEach(function(key) {
            radioWrap.removeAttribute(key);
          });
          radioWrap.innerHTML = "";
          this.element = this.wrapper;
          if (this.refreshing) {
            ["e-control", "e-radio", "e-lib"].forEach(function(key) {
              _this.element.classList.add(key);
            });
            setValue("ej2_instances", [this], this.element);
          }
        }
      }
    };
    RadioButton2.prototype.focusHandler = function() {
      this.isFocused = true;
    };
    RadioButton2.prototype.focusOutHandler = function() {
      var label = this.getLabel();
      if (label) {
        label.classList.remove("e-focus");
      }
    };
    RadioButton2.prototype.getModuleName = function() {
      return "radio";
    };
    RadioButton2.prototype.getSelectedValue = function() {
      var input2;
      var radioGrp = this.getRadioGroup();
      for (var i = 0, len = radioGrp.length; i < len; i++) {
        input2 = radioGrp[i];
        if (input2.checked) {
          return input2.value;
        }
      }
      return "";
    };
    RadioButton2.prototype.getRadioGroup = function() {
      return document.querySelectorAll('input.e-radio[name="' + this.element.getAttribute("name") + '"]');
    };
    RadioButton2.prototype.getPersistData = function() {
      return this.addOnPersist(["checked"]);
    };
    RadioButton2.prototype.getWrapper = function() {
      if (this.element) {
        return this.element.parentElement;
      } else {
        return null;
      }
    };
    RadioButton2.prototype.getLabel = function() {
      if (this.element) {
        return this.element.nextElementSibling;
      } else {
        return null;
      }
    };
    RadioButton2.prototype.initialize = function() {
      if (isNullOrUndefined(this.initialCheckedValue)) {
        this.initialCheckedValue = this.checked;
      }
      this.initWrapper();
      this.updateHtmlAttribute();
      if (this.name) {
        this.element.setAttribute("name", this.name);
      }
      var value = this.element.getAttribute("value");
      var type = typeof this.value;
      if (this.isVue && type === "boolean") {
        value = value === "true" ? true : false;
      }
      if (this.isVue ? this.value && type !== "boolean" && !value : this.value) {
        this.element.setAttribute("value", this.value);
      }
      if (this.checked) {
        this.element.checked = true;
      }
      if (this.disabled) {
        this.setDisabled();
      }
    };
    RadioButton2.prototype.initWrapper = function() {
      var rippleSpan;
      var wrapper = this.element.parentElement;
      if (!wrapper.classList.contains(WRAPPER2)) {
        wrapper = this.createElement("div", { className: WRAPPER2 });
        this.element.parentNode.insertBefore(wrapper, this.element);
      }
      var label = this.createElement("label", { attrs: { for: this.element.id } });
      wrapper.appendChild(this.element);
      wrapper.appendChild(label);
      if (isRippleEnabled) {
        rippleSpan = this.createElement("span", { className: RIPPLE2 });
        label.appendChild(rippleSpan);
        rippleEffect(rippleSpan, {
          duration: 400,
          isCenterRipple: true
        });
      }
      wrapper.classList.add("e-wrapper");
      if (this.enableRtl) {
        label.classList.add(RTL2);
      }
      if (this.cssClass) {
        addClass([wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      if (this.label) {
        this.setText(this.label);
      }
    };
    RadioButton2.prototype.keyUpHandler = function() {
      if (this.isFocused) {
        this.getLabel().classList.add("e-focus");
      }
    };
    RadioButton2.prototype.labelMouseDownHandler = function(e) {
      var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE2)[0];
      rippleMouseHandler(e, rippleSpan);
    };
    RadioButton2.prototype.labelMouseLeaveHandler = function(e) {
      var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE2)[0];
      if (rippleSpan) {
        var rippleElem = rippleSpan.querySelectorAll(".e-ripple-element");
        for (var i = rippleElem.length - 1; i > 0; i--) {
          rippleSpan.removeChild(rippleSpan.childNodes[i]);
        }
        rippleMouseHandler(e, rippleSpan);
      }
    };
    RadioButton2.prototype.labelMouseUpHandler = function(e) {
      var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE2)[0];
      if (rippleSpan) {
        var rippleElem = rippleSpan.querySelectorAll(".e-ripple-element");
        for (var i = rippleElem.length - 1; i > 0; i--) {
          rippleSpan.removeChild(rippleSpan.childNodes[i]);
        }
        rippleMouseHandler(e, rippleSpan);
      }
    };
    RadioButton2.prototype.formResetHandler = function() {
      this.checked = this.initialCheckedValue;
      if (this.initialCheckedValue) {
        attributes(this.element, { "checked": "true" });
      }
    };
    RadioButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var wrap = this.getWrapper();
      var label = this.getLabel();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "checked":
            if (newProp.checked) {
              this.updateChange();
            }
            this.element.checked = newProp.checked;
            break;
          case "disabled":
            if (newProp.disabled) {
              this.setDisabled();
              this.unWireEvents();
            } else {
              this.element.disabled = false;
              this.wireEvents();
            }
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([wrap], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([wrap], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            }
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              label.classList.add(RTL2);
            } else {
              label.classList.remove(RTL2);
            }
            break;
          case "label":
            this.setText(newProp.label);
            break;
          case "labelPosition":
            if (newProp.labelPosition === "Before") {
              label.classList.add("e-right");
            } else {
              label.classList.remove("e-right");
            }
            break;
          case "name":
            this.element.setAttribute("name", newProp.name);
            break;
          case "value":
            var type = typeof this.htmlAttributes.value;
            if (!isNullOrUndefined(this.htmlAttributes) && (this.htmlAttributes.value || type === "boolean" && !this.htmlAttributes.value)) {
              break;
            }
            this.element.setAttribute("value", newProp.value);
            break;
          case "htmlAttributes":
            this.updateHtmlAttribute();
            break;
        }
      }
    };
    RadioButton2.prototype.preRender = function() {
      var element = this.element;
      this.formElement = closest(this.element, "form");
      this.tagName = this.element.tagName;
      element = wrapperInitialize(this.createElement, "EJS-RADIOBUTTON", "radio", element, WRAPPER2, "radio");
      this.element = element;
      if (this.element.getAttribute("type") !== "radio") {
        this.element.setAttribute("type", "radio");
      }
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      if (this.tagName === "EJS-RADIOBUTTON") {
        var formControlName = this.element.getAttribute("formcontrolname");
        if (formControlName) {
          this.setProperties({ "name": formControlName }, true);
          this.element.setAttribute("name", formControlName);
        }
      }
    };
    RadioButton2.prototype.render = function() {
      this.initialize();
      if (!this.disabled) {
        this.wireEvents();
      }
      this.renderComplete();
      this.wrapper = this.getWrapper();
    };
    RadioButton2.prototype.setDisabled = function() {
      this.element.disabled = true;
    };
    RadioButton2.prototype.setText = function(text) {
      var label = this.getLabel();
      var textLabel = label.getElementsByClassName(LABEL2)[0];
      if (textLabel) {
        textLabel.textContent = text;
      } else {
        text = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text;
        textLabel = this.createElement("span", { className: LABEL2, innerHTML: text });
        label.appendChild(textLabel);
      }
      if (this.labelPosition === "Before") {
        this.getLabel().classList.add("e-right");
      } else {
        this.getLabel().classList.remove("e-right");
      }
    };
    RadioButton2.prototype.updateHtmlAttribute = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          var wrapper = this.element.parentElement;
          if (ATTRIBUTES.indexOf(key) > -1) {
            if (key === "class") {
              addClass([wrapper], this.htmlAttributes["" + key].replace(/\s+/g, " ").trim().split(" "));
            } else if (key === "title" || key === "style") {
              wrapper.setAttribute(key, this.htmlAttributes["" + key]);
            } else {
              this.element.setAttribute(key, this.htmlAttributes["" + key]);
            }
          } else {
            wrapper.setAttribute(key, this.htmlAttributes["" + key]);
          }
        }
      }
    };
    RadioButton2.prototype.unWireEvents = function() {
      var label = this.wrapper;
      EventHandler.remove(this.element, "change", this.changeHandler);
      EventHandler.remove(this.element, "focus", this.focusHandler);
      EventHandler.remove(this.element, "focusout", this.focusOutHandler);
      EventHandler.remove(this.element, "keyup", this.keyUpHandler);
      var rippleLabel = label.getElementsByTagName("label")[0];
      if (rippleLabel) {
        EventHandler.remove(rippleLabel, "mousedown", this.labelMouseDownHandler);
        EventHandler.remove(rippleLabel, "mouseup", this.labelMouseUpHandler);
        EventHandler.remove(rippleLabel, "mouseleave", this.labelMouseLeaveHandler);
      }
      if (this.formElement) {
        EventHandler.remove(this.formElement, "reset", this.formResetHandler);
      }
    };
    RadioButton2.prototype.wireEvents = function() {
      var label = this.getLabel();
      EventHandler.add(this.element, "change", this.changeHandler, this);
      EventHandler.add(this.element, "keyup", this.keyUpHandler, this);
      EventHandler.add(this.element, "focus", this.focusHandler, this);
      EventHandler.add(this.element, "focusout", this.focusOutHandler, this);
      var rippleLabel = label.getElementsByClassName(LABEL2)[0];
      if (rippleLabel) {
        EventHandler.add(rippleLabel, "mousedown", this.labelMouseDownHandler, this);
        EventHandler.add(rippleLabel, "mouseup", this.labelMouseUpHandler, this);
        EventHandler.add(rippleLabel, "mouseleave", this.labelMouseLeaveHandler, this);
      }
      if (this.formElement) {
        EventHandler.add(this.formElement, "reset", this.formResetHandler, this);
      }
    };
    RadioButton2.prototype.click = function() {
      this.element.click();
    };
    RadioButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    var RadioButton_1;
    __decorate4([
      Event()
    ], RadioButton2.prototype, "change", void 0);
    __decorate4([
      Event()
    ], RadioButton2.prototype, "created", void 0);
    __decorate4([
      Property(false)
    ], RadioButton2.prototype, "checked", void 0);
    __decorate4([
      Property("")
    ], RadioButton2.prototype, "cssClass", void 0);
    __decorate4([
      Property(false)
    ], RadioButton2.prototype, "disabled", void 0);
    __decorate4([
      Property("")
    ], RadioButton2.prototype, "label", void 0);
    __decorate4([
      Property("After")
    ], RadioButton2.prototype, "labelPosition", void 0);
    __decorate4([
      Property("")
    ], RadioButton2.prototype, "name", void 0);
    __decorate4([
      Property("")
    ], RadioButton2.prototype, "value", void 0);
    __decorate4([
      Property(false)
    ], RadioButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate4([
      Property({})
    ], RadioButton2.prototype, "htmlAttributes", void 0);
    RadioButton2 = RadioButton_1 = __decorate4([
      NotifyPropertyChanges
    ], RadioButton2);
    return RadioButton2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/switch/switch.js
var __extends4 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DISABLED2 = "e-switch-disabled";
var RIPPLE3 = "e-ripple-container";
var RIPPLE_CHECK = "e-ripple-check";
var RTL3 = "e-rtl";
var WRAPPER3 = "e-switch-wrapper";
var ACTIVE = "e-switch-active";
var ATTRIBUTES2 = ["title", "class", "style", "disabled", "readonly", "name", "value", "aria-label", "id", "role"];
var Switch = (
  /** @class */
  function(_super) {
    __extends4(Switch2, _super);
    function Switch2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isFocused = false;
      _this.isDrag = false;
      _this.isWireEvents = false;
      return _this;
    }
    Switch2.prototype.changeState = function(state) {
      var ariaState;
      var rippleSpan;
      var wrapper = this.getWrapper();
      var bar = wrapper.querySelector(".e-switch-inner");
      var handle = wrapper.querySelector(".e-switch-handle");
      if (isRippleEnabled) {
        rippleSpan = wrapper.getElementsByClassName(RIPPLE3)[0];
      }
      if (state) {
        addClass([bar, handle], ACTIVE);
        ariaState = "true";
        this.element.checked = true;
        this.checked = true;
        if (rippleSpan) {
          addClass([rippleSpan], [RIPPLE_CHECK]);
        }
      } else {
        removeClass([bar, handle], ACTIVE);
        ariaState = "false";
        this.element.checked = false;
        this.checked = false;
        if (rippleSpan) {
          removeClass([rippleSpan], [RIPPLE_CHECK]);
        }
      }
    };
    Switch2.prototype.clickHandler = function(evt) {
      this.isDrag = false;
      this.focusOutHandler();
      this.changeState(!this.checked);
      this.element.focus();
      var changeEventArgs = { checked: this.element.checked, event: evt };
      this.trigger("change", changeEventArgs);
      if (this.isAngular) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    };
    Switch2.prototype.destroy = function() {
      var _this = this;
      _super.prototype.destroy.call(this);
      if (!this.disabled) {
        this.unWireEvents();
      }
      destroy(this, this.getWrapper(), this.tagName);
      if (this.refreshing) {
        ["e-control", "e-switch", "e-lib"].forEach(function(key) {
          _this.element.classList.add(key);
        });
        setValue("ej2_instances", [this], this.element);
      }
    };
    Switch2.prototype.focusHandler = function() {
      this.isFocused = true;
    };
    Switch2.prototype.focusOutHandler = function() {
      this.getWrapper().classList.remove("e-focus");
    };
    Switch2.prototype.getModuleName = function() {
      return "switch";
    };
    Switch2.prototype.getPersistData = function() {
      return this.addOnPersist(["checked"]);
    };
    Switch2.prototype.getWrapper = function() {
      return this.element.parentElement;
    };
    Switch2.prototype.initialize = function() {
      if (isNullOrUndefined(this.initialSwitchCheckedValue)) {
        this.initialSwitchCheckedValue = this.checked;
      }
      if (this.name) {
        this.element.setAttribute("name", this.name);
      }
      if (this.value) {
        this.element.setAttribute("value", this.value);
      }
      if (this.checked) {
        this.changeState(true);
      }
      if (this.disabled) {
        this.setDisabled();
      }
      if (this.onLabel || this.offLabel) {
        this.setLabel(this.onLabel, this.offLabel);
      }
    };
    Switch2.prototype.initWrapper = function() {
      var wrapper = this.element.parentElement;
      if (!wrapper.classList.contains(WRAPPER3)) {
        wrapper = this.createElement("div", {
          className: WRAPPER3
        });
        this.element.parentNode.insertBefore(wrapper, this.element);
      }
      var switchInner = this.createElement("span", { className: "e-switch-inner" });
      var onLabel = this.createElement("span", { className: "e-switch-on" });
      var offLabel = this.createElement("span", { className: "e-switch-off" });
      var handle = this.createElement("span", { className: "e-switch-handle" });
      wrapper.appendChild(this.element);
      setHiddenInput(this, wrapper);
      switchInner.appendChild(onLabel);
      switchInner.appendChild(offLabel);
      wrapper.appendChild(switchInner);
      wrapper.appendChild(handle);
      if (isRippleEnabled) {
        var rippleSpan = this.createElement("span", { className: RIPPLE3 });
        handle.appendChild(rippleSpan);
        rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
      }
      wrapper.classList.add("e-wrapper");
      if (this.enableRtl) {
        wrapper.classList.add(RTL3);
      }
      if (this.cssClass) {
        addClass([wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
    };
    Switch2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var wrapper = this.getWrapper();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "checked":
            this.changeState(newProp.checked);
            break;
          case "disabled":
            if (newProp.disabled) {
              this.setDisabled();
              this.unWireEvents();
              this.isWireEvents = false;
            } else {
              this.element.disabled = false;
              wrapper.classList.remove(DISABLED2);
              wrapper.setAttribute("aria-disabled", "false");
              if (!this.isWireEvents) {
                this.wireEvents();
                this.isWireEvents = true;
              }
            }
            break;
          case "value":
            this.element.setAttribute("value", newProp.value);
            break;
          case "name":
            this.element.setAttribute("name", newProp.name);
            break;
          case "onLabel":
          case "offLabel":
            this.setLabel(newProp.onLabel, newProp.offLabel);
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              wrapper.classList.add(RTL3);
            } else {
              wrapper.classList.remove(RTL3);
            }
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([wrapper], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([wrapper], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            }
            break;
          case "htmlAttributes":
            this.updateHtmlAttribute();
            break;
        }
      }
    };
    Switch2.prototype.preRender = function() {
      var element = this.element;
      this.formElement = closest(this.element, "form");
      this.tagName = this.element.tagName;
      preRender(this, "EJS-SWITCH", WRAPPER3, element, this.getModuleName());
    };
    Switch2.prototype.render = function() {
      this.initWrapper();
      this.initialize();
      if (!this.disabled) {
        this.wireEvents();
      }
      this.renderComplete();
      this.updateHtmlAttribute();
    };
    Switch2.prototype.rippleHandler = function(e) {
      var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE3)[0];
      rippleMouseHandler(e, rippleSpan);
      if (e.type === "mousedown" && e.currentTarget.classList.contains("e-switch-wrapper") && e.which === 1) {
        this.isDrag = true;
        this.isFocused = false;
      }
    };
    Switch2.prototype.mouseLeaveHandler = function(e) {
      var rippleSpan = this.element.parentElement.getElementsByClassName(RIPPLE3)[0];
      if (rippleSpan) {
        var rippleElem = rippleSpan.querySelectorAll(".e-ripple-element");
        for (var i = rippleElem.length - 1; i > 0; i--) {
          rippleSpan.removeChild(rippleSpan.childNodes[i]);
        }
        rippleMouseHandler(e, rippleSpan);
      }
    };
    Switch2.prototype.rippleTouchHandler = function(eventType) {
      var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE3)[0];
      if (rippleSpan) {
        var event_1 = document.createEvent("MouseEvents");
        event_1.initEvent(eventType, false, true);
        rippleSpan.dispatchEvent(event_1);
      }
    };
    Switch2.prototype.setDisabled = function() {
      var wrapper = this.getWrapper();
      this.element.disabled = true;
      wrapper.classList.add(DISABLED2);
      wrapper.setAttribute("aria-disabled", "true");
    };
    Switch2.prototype.setLabel = function(onText, offText) {
      var wrapper = this.getWrapper();
      if (onText) {
        wrapper.querySelector(".e-switch-on").textContent = onText;
      }
      if (offText) {
        wrapper.querySelector(".e-switch-off").textContent = offText;
      }
    };
    Switch2.prototype.updateHtmlAttribute = function() {
      if (!isNullOrUndefined(this.htmlAttributes)) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var key = _a[_i];
          var wrapper = this.getWrapper();
          if (ATTRIBUTES2.indexOf(key) > -1) {
            if (key === "class") {
              addClass([wrapper], this.htmlAttributes["" + key].split(" "));
            } else if (key === "title") {
              wrapper.setAttribute(key, this.htmlAttributes["" + key]);
            } else if (key === "style") {
              wrapper.setAttribute(key, this.htmlAttributes["" + key]);
            } else if (key === "disabled") {
              if (this.htmlAttributes["" + key] === "true") {
                this.setDisabled();
              }
              this.element.setAttribute(key, this.htmlAttributes["" + key]);
            } else {
              this.element.setAttribute(key, this.htmlAttributes["" + key]);
            }
          } else {
            wrapper.setAttribute(key, this.htmlAttributes["" + key]);
          }
        }
      }
    };
    Switch2.prototype.switchFocusHandler = function() {
      if (this.isFocused) {
        this.getWrapper().classList.add("e-focus");
      }
    };
    Switch2.prototype.switchMouseUp = function(e) {
      var target = e.target;
      if (e.type === "touchmove") {
        e.preventDefault();
      }
      if (e.type === "touchstart") {
        this.isDrag = true;
        this.rippleTouchHandler("mousedown");
      }
      if (this.isDrag) {
        if (e.type === "mouseup" && target.className.indexOf("e-switch") < 0 || e.type === "touchend") {
          this.clickHandler(e);
          this.rippleTouchHandler("mouseup");
          e.preventDefault();
        }
      }
    };
    Switch2.prototype.formResetHandler = function() {
      this.checked = this.initialSwitchCheckedValue;
      this.element.checked = this.initialSwitchCheckedValue;
    };
    Switch2.prototype.toggle = function() {
      this.clickHandler();
    };
    Switch2.prototype.wireEvents = function() {
      var wrapper = this.getWrapper();
      this.delegateMouseUpHandler = this.switchMouseUp.bind(this);
      this.delegateKeyUpHandler = this.switchFocusHandler.bind(this);
      EventHandler.add(wrapper, "click", this.clickHandler, this);
      EventHandler.add(this.element, "focus", this.focusHandler, this);
      EventHandler.add(this.element, "focusout", this.focusOutHandler, this);
      EventHandler.add(this.element, "mouseup", this.delegateMouseUpHandler, this);
      EventHandler.add(this.element, "keyup", this.delegateKeyUpHandler, this);
      EventHandler.add(wrapper, "mousedown mouseup", this.rippleHandler, this);
      EventHandler.add(wrapper, "mouseleave", this.mouseLeaveHandler, this);
      EventHandler.add(wrapper, "touchstart touchmove touchend", this.switchMouseUp, this);
      if (this.formElement) {
        EventHandler.add(this.formElement, "reset", this.formResetHandler, this);
      }
    };
    Switch2.prototype.unWireEvents = function() {
      var wrapper = this.getWrapper();
      EventHandler.remove(wrapper, "click", this.clickHandler);
      EventHandler.remove(this.element, "focus", this.focusHandler);
      EventHandler.remove(this.element, "focusout", this.focusOutHandler);
      EventHandler.remove(this.element, "mouseup", this.delegateMouseUpHandler);
      EventHandler.remove(this.element, "keyup", this.delegateKeyUpHandler);
      EventHandler.remove(wrapper, "mousedown mouseup", this.rippleHandler);
      EventHandler.remove(wrapper, "mouseleave", this.mouseLeaveHandler);
      EventHandler.remove(wrapper, "touchstart touchmove touchend", this.switchMouseUp);
      if (this.formElement) {
        EventHandler.remove(this.formElement, "reset", this.formResetHandler);
      }
    };
    Switch2.prototype.click = function() {
      this.element.click();
    };
    Switch2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate5([
      Event()
    ], Switch2.prototype, "change", void 0);
    __decorate5([
      Event()
    ], Switch2.prototype, "created", void 0);
    __decorate5([
      Property(false)
    ], Switch2.prototype, "checked", void 0);
    __decorate5([
      Property("")
    ], Switch2.prototype, "cssClass", void 0);
    __decorate5([
      Property(false)
    ], Switch2.prototype, "disabled", void 0);
    __decorate5([
      Property("")
    ], Switch2.prototype, "name", void 0);
    __decorate5([
      Property("")
    ], Switch2.prototype, "onLabel", void 0);
    __decorate5([
      Property("")
    ], Switch2.prototype, "offLabel", void 0);
    __decorate5([
      Property("")
    ], Switch2.prototype, "value", void 0);
    __decorate5([
      Property({})
    ], Switch2.prototype, "htmlAttributes", void 0);
    Switch2 = __decorate5([
      NotifyPropertyChanges
    ], Switch2);
    return Switch2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/chips/chip-list.js
var __extends5 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = {
  chipSet: "e-chip-set",
  chip: "e-chip",
  avatar: "e-chip-avatar",
  text: "e-chip-text",
  icon: "e-chip-icon",
  delete: "e-chip-delete",
  deleteIcon: "e-dlt-btn",
  multiSelection: "e-multi-selection",
  singleSelection: "e-selection",
  active: "e-active",
  chipWrapper: "e-chip-avatar-wrap",
  iconWrapper: "e-chip-icon-wrap",
  focused: "e-focused",
  disabled: "e-disabled",
  rtl: "e-rtl"
};
var ChipList = (
  /** @class */
  function(_super) {
    __extends5(ChipList2, _super);
    function ChipList2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.multiSelectedChip = [];
      return _this;
    }
    ChipList2.prototype.preRender = function() {
    };
    ChipList2.prototype.chipType = function() {
      return this.chips && this.chips.length && this.chips.length > 0;
    };
    ChipList2.prototype.render = function() {
      var property;
      this.type = this.chips.length ? "chipset" : this.text || this.element.innerText ? "chip" : "chipset";
      this.setAttributes();
      this.createChip();
      this.setRtl();
      this.select(this.selectedChips, property);
      this.wireEvent(false);
      this.rippleFunction = rippleEffect(this.element, {
        selector: ".e-chip"
      });
      this.renderComplete();
    };
    ChipList2.prototype.createChip = function() {
      this.innerText = this.element.innerText && this.element.innerText.length !== 0 ? this.element.innerText.trim() : this.element.innerText;
      this.element.innerHTML = "";
      this.chipCreation(this.type === "chip" ? [this.innerText ? this.innerText : this.text] : this.chips);
    };
    ChipList2.prototype.setAttributes = function() {
      if (this.type === "chip") {
        if (this.enabled)
          this.element.tabIndex = 0;
        this.element.setAttribute("role", "option");
      } else {
        this.element.classList.add(classNames.chipSet);
        this.element.setAttribute("role", "listbox");
        if (this.selection === "Multiple") {
          this.element.classList.add(classNames.multiSelection);
          this.element.setAttribute("aria-multiselectable", "true");
        } else if (this.selection === "Single") {
          this.element.classList.add(classNames.singleSelection);
          this.element.setAttribute("aria-multiselectable", "false");
        } else {
          this.element.setAttribute("aria-multiselectable", "false");
        }
      }
    };
    ChipList2.prototype.setRtl = function() {
      this.element.classList[this.enableRtl ? "add" : "remove"](classNames.rtl);
    };
    ChipList2.prototype.chipCreation = function(data) {
      var chipListArray = [];
      var attributeArray = [];
      for (var i = 0; i < data.length; i++) {
        var fieldsData = this.getFieldValues(data[i]);
        var attributesValue = fieldsData.htmlAttributes;
        attributeArray.push(attributesValue);
        var chipArray = this.elementCreation(fieldsData);
        var className = (classNames.chip + " " + (fieldsData.enabled ? " " : classNames.disabled) + " " + (fieldsData.avatarIconCss || fieldsData.avatarText ? classNames.chipWrapper : fieldsData.leadingIconCss ? classNames.iconWrapper : " ") + " " + fieldsData.cssClass).split(" ").filter(function(css) {
          return css;
        });
        if (!this.chipType()) {
          chipListArray = chipArray;
          addClass([this.element], className);
          this.element.setAttribute("aria-label", fieldsData.text);
          if (fieldsData.value) {
            this.element.setAttribute("data-value", fieldsData.value.toString());
          }
        } else {
          var wrapper = this.createElement("DIV", {
            className: className.join(" "),
            attrs: {
              tabIndex: "0",
              role: "option",
              "aria-label": fieldsData.text,
              "aria-selected": "false"
            }
          });
          if (fieldsData.value) {
            wrapper.setAttribute("data-value", fieldsData.value.toString());
          }
          if (fieldsData.enabled) {
            wrapper.setAttribute("aria-disabled", "false");
          } else {
            wrapper.removeAttribute("tabindex");
            wrapper.setAttribute("aria-disabled", "true");
          }
          if (!isNullOrUndefined(attributeArray[i])) {
            if (attributeArray.length > i && Object.keys(attributeArray[i]).length) {
              var htmlAttr = [];
              htmlAttr = Object.keys(attributeArray[i]);
              for (var j = 0; j < htmlAttr.length; j++) {
                wrapper.setAttribute(htmlAttr[j], attributeArray[i][htmlAttr[j]]);
              }
            }
          }
          append(chipArray, wrapper);
          chipListArray.push(wrapper);
        }
      }
      append(chipListArray, this.element);
    };
    ChipList2.prototype.getFieldValues = function(data) {
      var chipEnabled = !(this.enabled.toString() === "false");
      var fields = {
        text: typeof data === "object" ? data.text ? data.text.toString() : this.text.toString() : !this.chipType() ? this.innerText ? this.innerText : this.text.toString() : data.toString(),
        cssClass: typeof data === "object" ? data.cssClass ? data.cssClass.toString() : this.cssClass.toString() : this.cssClass.toString(),
        leadingIconCss: typeof data === "object" ? data.leadingIconCss ? data.leadingIconCss.toString() : this.leadingIconCss.toString() : this.leadingIconCss.toString(),
        avatarIconCss: typeof data === "object" ? data.avatarIconCss ? data.avatarIconCss.toString() : this.avatarIconCss.toString() : this.avatarIconCss.toString(),
        avatarText: typeof data === "object" ? data.avatarText ? data.avatarText.toString() : this.avatarText.toString() : this.avatarText.toString(),
        trailingIconCss: typeof data === "object" ? data.trailingIconCss ? data.trailingIconCss.toString() : this.trailingIconCss.toString() : this.trailingIconCss.toString(),
        enabled: typeof data === "object" ? !isNullOrUndefined(data.enabled) ? data.enabled.toString() === "false" ? false : true : chipEnabled : chipEnabled,
        value: typeof data === "object" ? data.value ? data.value.toString() : null : null,
        leadingIconUrl: typeof data === "object" ? data.leadingIconUrl ? data.leadingIconUrl.toString() : this.leadingIconUrl : this.leadingIconUrl,
        trailingIconUrl: typeof data === "object" ? data.trailingIconUrl ? data.trailingIconUrl.toString() : this.trailingIconUrl : this.trailingIconUrl,
        htmlAttributes: typeof data === "object" ? data.htmlAttributes ? data.htmlAttributes : this.htmlAttributes : this.htmlAttributes
      };
      return fields;
    };
    ChipList2.prototype.elementCreation = function(fields) {
      var chipArray = [];
      if (fields.avatarText || fields.avatarIconCss) {
        var className = (classNames.avatar + " " + fields.avatarIconCss).trim();
        var chipAvatarElement = this.createElement("span", { className });
        chipAvatarElement.innerText = fields.avatarText;
        chipArray.push(chipAvatarElement);
      } else if (fields.leadingIconCss) {
        var className = (classNames.icon + " " + fields.leadingIconCss).trim();
        var chipIconElement = this.createElement("span", { className });
        chipArray.push(chipIconElement);
      } else if (fields.leadingIconUrl) {
        var className = (classNames.avatar + " image-url").trim();
        var chipIconElement = this.createElement("span", { className });
        chipIconElement.style.backgroundImage = "url(" + fields.leadingIconUrl + ")";
        chipArray.push(chipIconElement);
      }
      var chipTextElement = this.createElement("span", { className: classNames.text });
      chipTextElement.innerText = fields.text;
      chipArray.push(chipTextElement);
      if (fields.trailingIconCss || this.chipType() && this.enableDelete) {
        var className = (classNames.delete + " " + (fields.trailingIconCss ? fields.trailingIconCss : classNames.deleteIcon)).trim();
        var chipdeleteElement = this.createElement("span", { className });
        chipArray.push(chipdeleteElement);
      } else if (fields.trailingIconUrl) {
        var className = "trailing-icon-url".trim();
        var chipIconsElement = this.createElement("span", { className });
        chipIconsElement.style.backgroundImage = "url(" + fields.trailingIconUrl + ")";
        chipArray.push(chipIconsElement);
      }
      return chipArray;
    };
    ChipList2.prototype.find = function(fields) {
      var chipData;
      var chipElement = fields instanceof HTMLElement ? fields : this.element.querySelectorAll("." + classNames.chip)[fields];
      if (chipElement && this.chipType()) {
        chipData = { text: void 0, index: void 0, element: void 0, data: void 0 };
        chipData.index = Array.prototype.slice.call(this.element.querySelectorAll("." + classNames.chip)).indexOf(chipElement);
        chipData.text = typeof this.chips[chipData.index] === "object" ? this.chips[chipData.index].text ? this.chips[chipData.index].text.toString() : "" : this.chips[chipData.index].toString();
        chipData.data = this.chips[chipData.index];
        chipData.element = chipElement;
      }
      return chipData;
    };
    ChipList2.prototype.add = function(chipsData) {
      var _a;
      if (this.type !== "chip") {
        var fieldData = chipsData instanceof Array ? chipsData : [chipsData];
        this.chips = (_a = [].slice.call(this.chips)).concat.apply(_a, fieldData);
        this.chipCreation(fieldData);
      }
    };
    ChipList2.prototype.select = function(fields, selectionType) {
      this.onSelect(fields, false, selectionType);
    };
    ChipList2.prototype.multiSelection = function(newProp) {
      var items = this.element.querySelectorAll(".e-chip");
      for (var j = 0; j < newProp.length; j++) {
        if (typeof newProp[j] === "string") {
          for (var k = 0; k < items.length; k++) {
            if (newProp[j] !== k) {
              if (newProp[j] === items[k].attributes[5].value) {
                this.multiSelectedChip.push(k);
                break;
              }
            }
          }
        } else {
          this.multiSelectedChip.push(newProp[j]);
        }
      }
    };
    ChipList2.prototype.onSelect = function(fields, callFromProperty, selectionType) {
      var index;
      var chipNodes;
      var chipValue;
      if (this.chipType() && this.selection !== "None") {
        if (callFromProperty) {
          var chipElements = this.element.querySelectorAll("." + classNames.chip);
          for (var i = 0; i < chipElements.length; i++) {
            chipElements[i].setAttribute("aria-selected", "false");
            chipElements[i].classList.remove(classNames.active);
          }
        }
        var fieldData = fields instanceof Array ? fields : [fields];
        for (var i = 0; i < fieldData.length; i++) {
          var chipElement = fieldData[i] instanceof HTMLElement ? fieldData[i] : this.element.querySelectorAll("." + classNames.chip)[fieldData[i]];
          if (selectionType !== "index") {
            for (var j = 0; j < this.chips.length; j++) {
              chipNodes = this.element.querySelectorAll("." + classNames.chip)[j];
              var fieldsData = this.getFieldValues(this.chips[j]);
              if (selectionType === "value") {
                if (fieldsData.value !== null) {
                  chipValue = chipNodes.dataset.value;
                }
              } else if (selectionType === "text") {
                chipValue = chipNodes.innerText;
              }
              if (chipValue === fieldData[i].toString()) {
                index = j;
                chipElement = this.element.querySelectorAll("." + classNames.chip)[index];
              }
            }
          }
          if (chipElement instanceof HTMLElement) {
            this.selectionHandler(chipElement);
          }
        }
      }
    };
    ChipList2.prototype.remove = function(fields) {
      var _this = this;
      if (this.chipType()) {
        var fieldData = fields instanceof Array ? fields : [fields];
        var chipElements_1 = [];
        var chipCollection_1 = this.element.querySelectorAll("." + classNames.chip);
        fieldData.forEach(function(data) {
          var chipElement = data instanceof HTMLElement ? data : chipCollection_1[data];
          if (chipElement instanceof HTMLElement) {
            chipElements_1.push(chipElement);
          }
        });
        chipElements_1.forEach(function(element) {
          var chips = _this.element.querySelectorAll("." + classNames.chip);
          var index = Array.prototype.slice.call(chips).indexOf(element);
          _this.deleteHandler(element, index);
        });
      }
    };
    ChipList2.prototype.getSelectedChips = function() {
      var selectedChips;
      if (this.chipType() && this.selection !== "None") {
        var selectedItems = { texts: [], Indexes: [], data: [], elements: [] };
        var items = this.element.querySelectorAll("." + classNames.active);
        for (var i = 0; i < items.length; i++) {
          var chip = items[i];
          selectedItems.elements.push(chip);
          var index = Array.prototype.slice.call(this.element.querySelectorAll("." + classNames.chip)).indexOf(chip);
          selectedItems.Indexes.push(index);
          selectedItems.data.push(this.chips[index]);
          var text = typeof this.chips[index] === "object" ? this.chips[index].text ? this.chips[index].text.toString() : null : this.chips[index].toString();
          selectedItems.texts.push(text);
        }
        var selectedItem = {
          text: selectedItems.texts[0],
          index: selectedItems.Indexes[0],
          data: selectedItems.data[0],
          element: selectedItems.elements[0]
        };
        selectedChips = !isNullOrUndefined(selectedItem.index) ? this.selection === "Multiple" ? selectedItems : selectedItem : void 0;
      }
      return selectedChips;
    };
    ChipList2.prototype.wireEvent = function(unWireEvent) {
      if (!unWireEvent) {
        EventHandler.add(this.element, "click", this.clickHandler, this);
        EventHandler.add(this.element, "focusout", this.focusOutHandler, this);
        EventHandler.add(this.element, "keydown", this.keyHandler, this);
        EventHandler.add(this.element, "keyup", this.keyHandler, this);
      } else {
        EventHandler.remove(this.element, "click", this.clickHandler);
        EventHandler.remove(this.element, "focusout", this.focusOutHandler);
        EventHandler.remove(this.element, "keydown", this.keyHandler);
        EventHandler.remove(this.element, "keyup", this.keyHandler);
      }
    };
    ChipList2.prototype.keyHandler = function(e) {
      if (e.target.classList.contains(classNames.chip)) {
        if (e.type === "keydown") {
          if (e.keyCode === 13 || e.keyCode === 32) {
            this.clickHandler(e);
          } else if (e.keyCode === 46 && this.enableDelete) {
            this.clickHandler(e, true);
          }
        } else if (e.keyCode === 9) {
          this.focusInHandler(e.target);
        }
      }
    };
    ChipList2.prototype.focusInHandler = function(chipWrapper) {
      if (!chipWrapper.classList.contains(classNames.focused)) {
        chipWrapper.classList.add(classNames.focused);
      }
    };
    ChipList2.prototype.focusOutHandler = function(e) {
      var chipWrapper = closest(e.target, "." + classNames.chip);
      var focusedElement = !this.chipType() ? this.element.classList.contains(classNames.focused) ? this.element : null : this.element.querySelector("." + classNames.focused);
      if (chipWrapper && focusedElement) {
        focusedElement.classList.remove(classNames.focused);
      }
    };
    ChipList2.prototype.clickHandler = function(e, del) {
      var _this = this;
      if (del === void 0) {
        del = false;
      }
      var chipWrapper = closest(e.target, "." + classNames.chip);
      if (chipWrapper) {
        var chipDataArgs = void 0;
        if (this.chipType()) {
          chipDataArgs = this.find(chipWrapper);
        } else {
          var index = Array.prototype.slice.call(this.element.querySelectorAll("." + classNames.chip)).indexOf(chipWrapper);
          chipDataArgs = {
            text: this.innerText ? this.innerText : this.text,
            element: chipWrapper,
            data: this.text,
            index
          };
        }
        chipDataArgs.event = e;
        chipDataArgs.cancel = false;
        this.trigger("beforeClick", chipDataArgs, function(observedArgs) {
          if (!observedArgs.cancel) {
            _this.clickEventHandler(observedArgs.element, e, del);
          }
        });
      }
    };
    ChipList2.prototype.clickEventHandler = function(chipWrapper, e, del) {
      var _this = this;
      if (this.chipType()) {
        var chipData_1 = this.find(chipWrapper);
        chipData_1.event = e;
        var deleteElement = e.target.classList.contains(classNames.deleteIcon) ? e.target : del ? chipWrapper.querySelector("." + classNames.deleteIcon) : void 0;
        if (deleteElement && this.enableDelete) {
          chipData_1.cancel = false;
          var deletedItemArgs = chipData_1;
          this.trigger("delete", deletedItemArgs, function(observedArgs) {
            if (!observedArgs.cancel) {
              _this.deleteHandler(observedArgs.element, observedArgs.index);
              _this.selectionHandler(chipWrapper);
              chipData_1.selected = observedArgs.element.classList.contains(classNames.active);
              var selectedItemArgs2 = chipData_1;
              _this.trigger("click", selectedItemArgs2);
              var chipElement = _this.element.querySelectorAll("." + classNames.chip)[observedArgs.index];
              if (chipElement) {
                chipElement.focus();
                _this.focusInHandler(chipElement);
              }
            }
          });
        } else if (this.selection !== "None") {
          this.selectionHandler(chipWrapper);
          chipData_1.selected = chipWrapper.classList.contains(classNames.active);
          var selectedItemArgs = chipData_1;
          this.trigger("click", selectedItemArgs);
        } else {
          this.focusInHandler(chipWrapper);
          var clickedItemArgs = chipData_1;
          this.trigger("click", clickedItemArgs);
        }
      } else {
        this.focusInHandler(chipWrapper);
        var clickedItemArgs = {
          text: this.innerText ? this.innerText : this.text,
          element: chipWrapper,
          data: this.text,
          event: e
        };
        this.trigger("click", clickedItemArgs);
      }
    };
    ChipList2.prototype.selectionHandler = function(chipWrapper) {
      if (this.selection === "Single") {
        var activeElement = this.element.querySelector("." + classNames.active);
        if (activeElement && activeElement !== chipWrapper) {
          activeElement.classList.remove(classNames.active);
          activeElement.setAttribute("aria-selected", "false");
        }
        this.setProperties({ selectedChips: null }, true);
      } else {
        this.setProperties({ selectedChips: [] }, true);
      }
      if (chipWrapper.classList.contains(classNames.active)) {
        chipWrapper.classList.remove(classNames.active);
        chipWrapper.setAttribute("aria-selected", "false");
      } else {
        chipWrapper.classList.add(classNames.active);
        chipWrapper.setAttribute("aria-selected", "true");
      }
      this.updateSelectedChips();
    };
    ChipList2.prototype.updateSelectedChips = function() {
      var chipListEle = this.element.querySelectorAll(".e-chip");
      var chipCollIndex = [];
      var chipCollValue = [];
      var chip = null;
      var value;
      for (var i = 0; i < chipListEle.length; i++) {
        var selectedEle = this.element.querySelectorAll(".e-chip")[i];
        if (selectedEle.getAttribute("aria-selected") === "true") {
          value = selectedEle.getAttribute("data-value");
          if (this.selection === "Single" && selectedEle.classList.contains("e-active")) {
            chip = value ? value : i;
            break;
          } else {
            chip = value ? chipCollValue.push(value) : chipCollIndex.push(i);
          }
        }
      }
      this.setProperties({ selectedChips: this.selection === "Single" ? chip : value ? chipCollValue : chipCollIndex }, true);
    };
    ChipList2.prototype.deleteHandler = function(chipWrapper, index) {
      var deletedChipData = this.find(chipWrapper);
      this.chips.splice(index, 1);
      this.setProperties({ chips: this.chips }, true);
      detach(chipWrapper);
      this.trigger("deleted", deletedChipData);
    };
    ChipList2.prototype.destroy = function() {
      removeClass([this.element], [
        classNames.chipSet,
        classNames.chip,
        classNames.rtl,
        classNames.multiSelection,
        classNames.singleSelection,
        classNames.disabled,
        classNames.chipWrapper,
        classNames.iconWrapper,
        classNames.active,
        classNames.focused
      ].concat(this.cssClass.toString().split(" ").filter(function(css) {
        return css;
      })));
      this.removeMultipleAttributes(["tabindex", "role", "aria-label", "aria-multiselectable"], this.element);
      this.wireEvent(true);
      this.rippleFunction();
      _super.prototype.destroy.call(this);
      this.element.innerHTML = "";
      this.element.innerText = this.innerText;
    };
    ChipList2.prototype.removeMultipleAttributes = function(attributes2, element) {
      attributes2.forEach(function(attr) {
        element.removeAttribute(attr);
      });
    };
    ChipList2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    ChipList2.prototype.getModuleName = function() {
      return "chip-list";
    };
    ChipList2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var property;
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "chips":
          case "text":
          case "avatarText":
          case "avatarIconCss":
          case "leadingIconCss":
          case "trailingIconCss":
          case "selection":
          case "enableDelete":
          case "enabled":
            this.refresh();
            break;
          case "cssClass":
            if (!this.chipType()) {
              removeClass([this.element], oldProp.cssClass.toString().split(" ").filter(function(css) {
                return css;
              }));
              addClass([this.element], newProp.cssClass.toString().split(" ").filter(function(css) {
                return css;
              }));
            } else {
              this.refresh();
            }
            break;
          case "selectedChips":
            removeClass(this.element.querySelectorAll(".e-active"), "e-active");
            if (this.selection === "Multiple") {
              this.multiSelectedChip = [];
              this.multiSelection(newProp.selectedChips);
              this.onSelect(this.multiSelectedChip, true, property);
              this.updateSelectedChips();
            } else {
              this.onSelect(newProp.selectedChips, true, property);
            }
            break;
          case "enableRtl":
            this.setRtl();
            break;
        }
      }
    };
    __decorate6([
      Property([])
    ], ChipList2.prototype, "chips", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "text", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "avatarText", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "avatarIconCss", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "htmlAttributes", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "leadingIconCss", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "trailingIconCss", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "leadingIconUrl", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "trailingIconUrl", void 0);
    __decorate6([
      Property("")
    ], ChipList2.prototype, "cssClass", void 0);
    __decorate6([
      Property(true)
    ], ChipList2.prototype, "enabled", void 0);
    __decorate6([
      Property([])
    ], ChipList2.prototype, "selectedChips", void 0);
    __decorate6([
      Property("None")
    ], ChipList2.prototype, "selection", void 0);
    __decorate6([
      Property(false)
    ], ChipList2.prototype, "enableDelete", void 0);
    __decorate6([
      Event()
    ], ChipList2.prototype, "created", void 0);
    __decorate6([
      Event()
    ], ChipList2.prototype, "click", void 0);
    __decorate6([
      Event()
    ], ChipList2.prototype, "beforeClick", void 0);
    __decorate6([
      Event()
    ], ChipList2.prototype, "delete", void 0);
    __decorate6([
      Event()
    ], ChipList2.prototype, "deleted", void 0);
    ChipList2 = __decorate6([
      NotifyPropertyChanges
    ], ChipList2);
    return ChipList2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/chips/chip.js
var Chip = (
  /** @class */
  function() {
    function Chip2() {
    }
    return Chip2;
  }()
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/floating-action-button/floating-action-button.js
var __extends6 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FABHIDDEN = "e-fab-hidden";
var FIXEDFAB = "e-fab-fixed";
var FABVERTDIST = "--fabVertDist";
var FABHORZDIST = "--fabHorzDist";
var FABTOP = "e-fab-top";
var FABBOTTOM = "e-fab-bottom";
var FABRIGHT = "e-fab-right";
var FABLEFT = "e-fab-left";
var FABMIDDLE = "e-fab-middle";
var FABCENTER = "e-fab-center";
var FabPosition;
(function(FabPosition2) {
  FabPosition2["TopLeft"] = "TopLeft";
  FabPosition2["TopCenter"] = "TopCenter";
  FabPosition2["TopRight"] = "TopRight";
  FabPosition2["MiddleLeft"] = "MiddleLeft";
  FabPosition2["MiddleCenter"] = "MiddleCenter";
  FabPosition2["MiddleRight"] = "MiddleRight";
  FabPosition2["BottomLeft"] = "BottomLeft";
  FabPosition2["BottomCenter"] = "BottomCenter";
  FabPosition2["BottomRight"] = "BottomRight";
})(FabPosition || (FabPosition = {}));
var Fab = (
  /** @class */
  function(_super) {
    __extends6(Fab2, _super);
    function Fab2(options, element) {
      return _super.call(this, options, element) || this;
    }
    Fab2.prototype.render = function() {
      _super.prototype.render.call(this);
      this.initializeFab();
    };
    Fab2.prototype.preRender = function() {
      _super.prototype.preRender.call(this);
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
    };
    Fab2.prototype.getPersistData = function() {
      _super.prototype.getPersistData.call(this);
      return this.addOnPersist([]);
    };
    Fab2.prototype.getModuleName = function() {
      return "fab";
    };
    Fab2.prototype.initializeFab = function() {
      this.element.classList.add("e-" + _super.prototype.getModuleName.call(this));
      this.checkTarget();
      this.setPosition();
      this.setVisibility();
      EventHandler.add(window, "resize", this.resizeHandler, this);
    };
    Fab2.prototype.checkTarget = function() {
      this.isFixed = true;
      if (this.target) {
        this.targetEle = typeof this.target === "string" ? select(this.target) : this.target;
        if (this.targetEle) {
          this.isFixed = false;
          this.targetEle.appendChild(this.element);
        }
      }
      this.element.classList[this.isFixed ? "add" : "remove"](FIXEDFAB);
    };
    Fab2.prototype.setVisibility = function() {
      this.element.classList[this.visible ? "remove" : "add"](FABHIDDEN);
    };
    Fab2.prototype.setPosition = function() {
      this.setVerticalPosition();
      this.setHorizontalPosition();
    };
    Fab2.prototype.setVerticalPosition = function() {
      if (["MiddleLeft", "MiddleRight", "MiddleCenter"].indexOf(this.position) !== -1) {
        var yoffset = ((this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.element.offsetHeight) / 2;
        this.element.style.setProperty(FABVERTDIST, yoffset + "px");
        this.element.classList.add(FABMIDDLE);
      }
      this.element.classList.add(["BottomLeft", "BottomCenter", "BottomRight"].indexOf(this.position) !== -1 ? FABBOTTOM : FABTOP);
    };
    Fab2.prototype.setHorizontalPosition = function() {
      if (["TopCenter", "BottomCenter", "MiddleCenter"].indexOf(this.position) !== -1) {
        var xoffset = ((this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.element.offsetWidth) / 2;
        this.element.style.setProperty(FABHORZDIST, xoffset + "px");
        this.element.classList.add(FABCENTER);
      }
      var isRight = ["TopRight", "MiddleRight", "BottomRight"].indexOf(this.position) !== -1;
      this.element.classList.add(!(this.enableRtl || isRight) || this.enableRtl && isRight ? FABLEFT : FABRIGHT);
    };
    Fab2.prototype.clearPosition = function() {
      this.element.style.removeProperty(FABVERTDIST);
      this.element.classList.remove(FABTOP, FABBOTTOM, FABMIDDLE);
      this.clearHorizontalPosition();
    };
    Fab2.prototype.clearHorizontalPosition = function() {
      this.element.style.removeProperty(FABHORZDIST);
      this.element.classList.remove(FABRIGHT, FABLEFT, FABCENTER);
    };
    Fab2.prototype.refreshPosition = function() {
      this.resizeHandler();
    };
    Fab2.prototype.resizeHandler = function() {
      this.setPosition();
    };
    Fab2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      this.element.classList.remove("e-" + _super.prototype.getModuleName.call(this), FIXEDFAB);
      this.clearPosition();
      EventHandler.remove(window, "resize", this.resizeHandler);
    };
    Fab2.prototype.onPropertyChanged = function(newProp, oldProp) {
      _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "enableRtl":
            this.clearHorizontalPosition();
            this.setHorizontalPosition();
            break;
          case "visible":
            this.setVisibility();
            break;
          case "position":
            this.clearPosition();
            this.setPosition();
            break;
          case "target":
            this.checkTarget();
            this.setPosition();
            break;
        }
      }
    };
    __decorate7([
      Property("BottomRight")
    ], Fab2.prototype, "position", void 0);
    __decorate7([
      Property("")
    ], Fab2.prototype, "target", void 0);
    __decorate7([
      Property(true)
    ], Fab2.prototype, "visible", void 0);
    __decorate7([
      Property(true)
    ], Fab2.prototype, "isPrimary", void 0);
    Fab2 = __decorate7([
      NotifyPropertyChanges
    ], Fab2);
    return Fab2;
  }(Button)
);

// node_modules/@syncfusion/ej2-angular-buttons/node_modules/@syncfusion/ej2-buttons/src/speed-dial/speed-dial.js
var __extends7 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var topPosition = ["TopLeft", "TopCenter", "TopRight"];
var bottomPosition = ["BottomLeft", "BottomCenter", "BottomRight"];
var leftPosition = ["TopLeft", "MiddleLeft", "BottomLeft"];
var rightPosition = ["TopRight", "MiddleRight", "BottomRight"];
var SDHIDDEN = "e-speeddial-hidden";
var FIXEDSD = "e-speeddial-fixed";
var SPEEDDIAL = "e-speeddial";
var RTLCLASS = "e-rtl";
var HOVERSD = "e-speeddial-hover-open";
var RADIALSD = "e-speeddial-radial";
var LINEARSD = "e-speeddial-linear";
var TEMPLATESD = "e-speeddial-template";
var SDTEMPLATECONTAINER = "e-speeddial-template-container";
var SDOVERLAY = "e-speeddial-overlay";
var SDPOPUP = "e-speeddial-popup";
var SDUL = "e-speeddial-ul";
var SDLI = "e-speeddial-li";
var SDACTIVELI = "e-speeddial-li-active";
var SDLIICON = "e-speeddial-li-icon";
var SDLITEXT = "e-speeddial-li-text";
var SDLITEXTONLY = "e-speeddial-text-li";
var DISABLED3 = "e-disabled";
var SDVERTICALBOTTOM = "e-speeddial-vert-bottom";
var SDVERTICALRIGHT = "e-speeddial-vert-right";
var SDHORIZONTALTOP = "e-speeddial-horz-top";
var SDHORIZONTALLEFT = "e-speeddial-horz-left";
var SDHORIZONTALRIGHT = "e-speeddial-horz-right";
var SDOVERFLOW = "e-speeddial-overflow";
var SDVERTOVERFLOW = "e-speeddial-vert-overflow";
var SDHORZOVERFLOW = "e-speeddial-horz-overflow";
var SDTOP = "e-speeddial-top";
var SDBOTTOM = "e-speeddial-bottom";
var SDRIGHT = "e-speeddial-right";
var SDLEFT = "e-speeddial-left";
var SDMIDDLE = "e-speeddial-middle";
var SDCENTER = "e-speeddial-center";
var SDTOPLEFT = "e-speeddial-top-left";
var SDBOTTOMRIGHT = "e-speeddial-bottom-right";
var SDTOPRIGHT = "e-speeddial-top-right";
var SDBOTTOMLEFT = "e-speeddial-bottom-left";
var SDVERTDIST = "--speeddialVertDist";
var SDHORZDIST = "--speeddialHorzDist";
var SDRADICALANGLE = "--speeddialRadialAngle";
var SDRADICALOFFSET = "--speeddialRadialOffset";
var SDRADICALMINHEIGHT = "--speeddialRadialMinHeight";
var SDRADICALMINWIDTH = "--speeddialRadialMinWidth";
var SDOVERFLOWLIMIT = "--speeddialOverflowLimit";
var SpeedDialMode;
(function(SpeedDialMode2) {
  SpeedDialMode2["Linear"] = "Linear";
  SpeedDialMode2["Radial"] = "Radial";
})(SpeedDialMode || (SpeedDialMode = {}));
var LinearDirection;
(function(LinearDirection2) {
  LinearDirection2["Up"] = "Up";
  LinearDirection2["Down"] = "Down";
  LinearDirection2["Right"] = "Right";
  LinearDirection2["Left"] = "Left";
  LinearDirection2["Auto"] = "Auto";
})(LinearDirection || (LinearDirection = {}));
var RadialDirection;
(function(RadialDirection2) {
  RadialDirection2["Clockwise"] = "Clockwise";
  RadialDirection2["AntiClockwise"] = "AntiClockwise";
  RadialDirection2["Auto"] = "Auto";
})(RadialDirection || (RadialDirection = {}));
var SpeedDialAnimationEffect;
(function(SpeedDialAnimationEffect2) {
  SpeedDialAnimationEffect2["Fade"] = "Fade";
  SpeedDialAnimationEffect2["FadeZoom"] = "FadeZoom";
  SpeedDialAnimationEffect2["FlipLeftDown"] = "FlipLeftDown";
  SpeedDialAnimationEffect2["FlipLeftUp"] = "FlipLeftUp";
  SpeedDialAnimationEffect2["FlipRightDown"] = "FlipRightDown";
  SpeedDialAnimationEffect2["FlipRightUp"] = "FlipRightUp";
  SpeedDialAnimationEffect2["FlipXDown"] = "FlipXDown";
  SpeedDialAnimationEffect2["FlipXUp"] = "FlipXUp";
  SpeedDialAnimationEffect2["FlipYLeft"] = "FlipYLeft";
  SpeedDialAnimationEffect2["FlipYRight"] = "FlipYRight";
  SpeedDialAnimationEffect2["SlideBottom"] = "SlideBottom";
  SpeedDialAnimationEffect2["SlideLeft"] = "SlideLeft";
  SpeedDialAnimationEffect2["SlideRight"] = "SlideRight";
  SpeedDialAnimationEffect2["SlideTop"] = "SlideTop";
  SpeedDialAnimationEffect2["Zoom"] = "Zoom";
  SpeedDialAnimationEffect2["None"] = "None";
})(SpeedDialAnimationEffect || (SpeedDialAnimationEffect = {}));
var SpeedDialAnimationSettings = (
  /** @class */
  function(_super) {
    __extends7(SpeedDialAnimationSettings2, _super);
    function SpeedDialAnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("Fade")
    ], SpeedDialAnimationSettings2.prototype, "effect", void 0);
    __decorate8([
      Property(400)
    ], SpeedDialAnimationSettings2.prototype, "duration", void 0);
    __decorate8([
      Property(0)
    ], SpeedDialAnimationSettings2.prototype, "delay", void 0);
    return SpeedDialAnimationSettings2;
  }(ChildProperty)
);
var RadialSettings = (
  /** @class */
  function(_super) {
    __extends7(RadialSettings2, _super);
    function RadialSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("Auto")
    ], RadialSettings2.prototype, "direction", void 0);
    __decorate8([
      Property(-1)
    ], RadialSettings2.prototype, "endAngle", void 0);
    __decorate8([
      Property("100px")
    ], RadialSettings2.prototype, "offset", void 0);
    __decorate8([
      Property(-1)
    ], RadialSettings2.prototype, "startAngle", void 0);
    return RadialSettings2;
  }(ChildProperty)
);
var SpeedDialItem = (
  /** @class */
  function(_super) {
    __extends7(SpeedDialItem2, _super);
    function SpeedDialItem2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([
      Property("")
    ], SpeedDialItem2.prototype, "iconCss", void 0);
    __decorate8([
      Property("")
    ], SpeedDialItem2.prototype, "id", void 0);
    __decorate8([
      Property("")
    ], SpeedDialItem2.prototype, "text", void 0);
    __decorate8([
      Property("")
    ], SpeedDialItem2.prototype, "title", void 0);
    __decorate8([
      Property(false)
    ], SpeedDialItem2.prototype, "disabled", void 0);
    return SpeedDialItem2;
  }(ChildProperty)
);
var SpeedDial = (
  /** @class */
  function(_super) {
    __extends7(SpeedDial2, _super);
    function SpeedDial2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isMenuOpen = false;
      _this.isClock = true;
      _this.isVertical = true;
      _this.isControl = false;
      _this.focusedIndex = -1;
      return _this;
    }
    SpeedDial2.prototype.render = function() {
      this.initialize();
    };
    SpeedDial2.prototype.preRender = function() {
      this.keyConfigs = {
        space: "space",
        enter: "enter",
        end: "end",
        home: "home",
        moveDown: "downarrow",
        moveLeft: "leftarrow",
        moveRight: "rightarrow",
        moveUp: "uparrow",
        esc: "escape"
      };
      this.validateDirection();
    };
    SpeedDial2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    SpeedDial2.prototype.getModuleName = function() {
      return "speed-dial";
    };
    SpeedDial2.prototype.initialize = function() {
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      this.fab = new Fab({
        content: this.content,
        cssClass: this.cssClass ? SPEEDDIAL + " " + this.cssClass : SPEEDDIAL,
        disabled: this.disabled,
        enablePersistence: this.enablePersistence,
        enableRtl: this.enableRtl,
        iconCss: this.openIconCss,
        iconPosition: this.iconPosition,
        position: this.position,
        target: this.target,
        visible: this.visible,
        isPrimary: this.isPrimary
      });
      this.fab.appendTo(this.element);
      if (this.items.length > 0 || this.popupTemplate) {
        this.createPopup();
      }
      this.wireEvents();
    };
    SpeedDial2.prototype.wireEvents = function() {
      EventHandler.add(window, "resize", this.resizeHandler, this);
      EventHandler.add(document.body, "click", this.bodyClickHandler, this);
      if (this.opensOnHover) {
        this.wireFabHover();
      } else {
        this.wireFabClick();
      }
    };
    SpeedDial2.prototype.wirePopupEvents = function() {
      this.removeRippleEffect = rippleEffect(this.popupEle, { selector: "." + SDLIICON });
      this.keyboardModule = new KeyboardEvents(this.element, {
        keyAction: this.keyActionHandler.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
      this.popupKeyboardModule = new KeyboardEvents(this.popupEle, {
        keyAction: this.popupKeyActionHandler.bind(this),
        keyConfigs: { esc: "escape" },
        eventName: "keydown"
      });
      this.documentKeyboardModule = new KeyboardEvents(document.body, {
        keyAction: this.popupKeyActionHandler.bind(this),
        keyConfigs: { enter: "enter", space: "space" },
        eventName: "keydown"
      });
      EventHandler.add(this.popupEle, "click", this.popupClick, this);
      EventHandler.add(this.popupEle, "mouseleave", this.popupMouseLeaveHandle, this);
    };
    SpeedDial2.prototype.wireFabClick = function() {
      EventHandler.add(this.fab.element, "click", this.fabClick, this);
    };
    SpeedDial2.prototype.wireFabHover = function() {
      this.popupEle.classList.add(HOVERSD);
      EventHandler.add(this.fab.element, "mouseover", this.mouseOverHandle, this);
      EventHandler.add(this.element, "mouseleave", this.mouseLeaveHandle, this);
    };
    SpeedDial2.prototype.createPopup = function() {
      var className = SDPOPUP + " " + SDHIDDEN;
      className = this.enableRtl ? className + " " + RTLCLASS : className;
      className = this.cssClass ? className + " " + this.cssClass : className;
      this.popupEle = this.createElement("div", {
        className,
        id: this.element.id + "_popup"
      });
      this.element.insertAdjacentElement("afterend", this.popupEle);
      attributes(this.element, { "aria-expanded": "false", "aria-haspopup": "true", "aria-controls": this.popupEle.id });
      this.setPopupContent();
      if (this.modal) {
        this.createOverlay();
      }
      this.checkTarget();
      this.setPositionProps();
      this.wirePopupEvents();
    };
    SpeedDial2.prototype.createOverlay = function() {
      this.overlayEle = this.createElement("div", {
        id: this.element.id + "_overlay",
        className: (SDOVERLAY + (this.isMenuOpen ? "" : " " + SDHIDDEN) + " " + this.cssClass).trim()
      });
      this.element.insertAdjacentElement("beforebegin", this.overlayEle);
    };
    SpeedDial2.prototype.popupClick = function() {
      this.isControl = true;
    };
    SpeedDial2.prototype.bodyClickHandler = function(e) {
      if (this.isControl) {
        this.isControl = false;
        return;
      }
      if (this.isMenuOpen) {
        this.hidePopupEle(e);
      }
    };
    SpeedDial2.prototype.fabClick = function(e) {
      this.isControl = true;
      if (this.isMenuOpen) {
        this.hidePopupEle(e);
      } else {
        this.showPopupEle(e);
      }
    };
    SpeedDial2.prototype.setPopupContent = function() {
      this.popupEle.classList.remove(RADIALSD, LINEARSD, TEMPLATESD);
      if (!this.popupTemplate) {
        this.popupEle.classList.add(this.mode === "Radial" ? RADIALSD : LINEARSD);
        this.createUl();
        this.createItems();
      } else {
        this.popupEle.classList.add(TEMPLATESD);
        this.appendTemplate();
      }
      this.renderReactTemplates();
    };
    SpeedDial2.prototype.appendTemplate = function() {
      var templateContainer = this.createElement("div", { className: SDTEMPLATECONTAINER });
      append([templateContainer], this.popupEle);
      var templateFunction = this.getTemplateString(this.popupTemplate);
      append(templateFunction({}, this, "fabPopupTemplate", this.element.id + "popupTemplate", this.isStringTemplate), templateContainer);
    };
    SpeedDial2.prototype.getTemplateString = function(template) {
      var stringContent = "";
      try {
        var tempEle = select(template);
        if (typeof template !== "function" && tempEle) {
          stringContent = tempEle.tagName === "SCRIPT" ? tempEle.innerHTML : tempEle.outerHTML;
        } else {
          stringContent = template;
        }
      } catch (e) {
        stringContent = template;
      }
      return compile(stringContent);
    };
    SpeedDial2.prototype.updatePopupTemplate = function() {
      if (this.popupEle) {
        if (this.popupEle.querySelector("." + SDLI)) {
          this.clearItems();
          this.popupEle.classList.remove(RADIALSD, LINEARSD);
          this.popupEle.classList.add(TEMPLATESD);
        }
        while (this.popupEle.firstElementChild) {
          remove(this.popupEle.firstElementChild);
        }
        this.setPopupContent();
        this.updatePositionProperties();
      } else {
        this.createPopup();
      }
    };
    SpeedDial2.prototype.createUl = function() {
      var popupUlEle = this.createElement("ul", {
        className: SDUL,
        id: this.element.id + "_ul",
        attrs: { "role": "menu" }
      });
      this.popupEle.appendChild(popupUlEle);
    };
    SpeedDial2.prototype.createItems = function() {
      var _this = this;
      this.focusedIndex = -1;
      var ul = this.popupEle.querySelector("." + SDUL);
      var _loop_1 = function(index2) {
        var item = this_1.items[parseInt(index2.toString(), 10)];
        var li = this_1.createElement("li", {
          className: SDLI + " " + SDHIDDEN,
          id: item.id ? item.id : this_1.element.id + "_li_" + index2,
          attrs: { "role": "menuitem" }
        });
        if (item.text) {
          li.setAttribute("aria-label", item.text);
        }
        if (this_1.itemTemplate) {
          var templateFunction = this_1.getTemplateString(this_1.itemTemplate);
          append(templateFunction(item, this_1, "fabItemTemplate", this_1.element.id + "itemTemplate", this_1.isStringTemplate), li);
        } else {
          if (item.iconCss) {
            var iconSpan = this_1.createElement("span", {
              className: SDLIICON + " " + item.iconCss
            });
            li.appendChild(iconSpan);
          }
          if (item.text) {
            var textSpan = this_1.createElement("span", {
              className: SDLITEXT
            });
            textSpan.innerText = item.text;
            li.appendChild(textSpan);
            if (!item.iconCss) {
              li.classList.add(SDLITEXTONLY);
            }
          }
        }
        if (item.disabled) {
          li.classList.add(DISABLED3);
          li.setAttribute("aria-disabled", "true");
        } else {
          EventHandler.add(li, "click", function(e) {
            return _this.triggerItemClick(e, item);
          }, this_1);
        }
        if (item.title) {
          li.setAttribute("title", item.title);
        }
        var eventArgs = { element: li, item };
        this_1.trigger("beforeItemRender", eventArgs, function(args) {
          ul.appendChild(args.element);
        });
      };
      var this_1 = this;
      for (var index = 0; index < this.items.length; index++) {
        _loop_1(index);
      }
    };
    SpeedDial2.prototype.setRTL = function() {
      this.popupEle.classList[this.enableRtl ? "add" : "remove"](RTLCLASS);
      this.clearHorizontalPosition();
      if (!(this.popupTemplate || this.mode === "Radial")) {
        this.setLinearHorizontalPosition();
      } else {
        this.setHorizontalPosition();
      }
    };
    SpeedDial2.prototype.checkTarget = function() {
      this.isFixed = true;
      if (this.target) {
        this.targetEle = typeof this.target === "string" ? select(this.target) : this.target;
        if (this.targetEle) {
          this.targetEle.appendChild(this.element);
          this.isFixed = false;
        }
      }
      if (this.isFixed) {
        if (this.popupEle) {
          this.popupEle.classList.add(FIXEDSD);
        }
        if (this.overlayEle) {
          this.overlayEle.classList.add(FIXEDSD);
        }
      } else {
        if (this.popupEle) {
          this.popupEle.classList.remove(FIXEDSD);
        }
        if (this.overlayEle) {
          this.overlayEle.classList.remove(FIXEDSD);
        }
      }
    };
    SpeedDial2.prototype.setVisibility = function(val) {
      this.setProperties({ visible: val }, true);
      this.fab.setProperties({ visible: val });
    };
    SpeedDial2.prototype.popupMouseLeaveHandle = function(e) {
      var target = e.relatedTarget;
      if (this.opensOnHover && !(target.classList.contains(SPEEDDIAL) || closest(target, "." + SPEEDDIAL))) {
        this.hidePopupEle(e);
      }
    };
    SpeedDial2.prototype.mouseOverHandle = function(e) {
      this.showPopupEle(e);
    };
    SpeedDial2.prototype.mouseLeaveHandle = function(e) {
      var target = e.relatedTarget;
      if (!(target.classList.contains(SDPOPUP) || closest(target, "." + SDPOPUP))) {
        this.hidePopupEle(e);
      }
    };
    SpeedDial2.prototype.popupKeyActionHandler = function(e) {
      switch (e.action) {
        case "esc":
          this.hidePopupEle(e);
          break;
        case "enter":
        case "space":
          if (this.isMenuOpen && e.target !== this.element) {
            this.hidePopupEle(e);
          }
          break;
      }
    };
    SpeedDial2.prototype.keyActionHandler = function(e) {
      e.preventDefault();
      switch (e.action) {
        case "enter":
        case "space":
          if (this.isMenuOpen) {
            if (this.focusedIndex !== -1) {
              this.triggerItemClick(e, this.items[this.focusedIndex]);
            } else {
              this.hidePopupEle(e);
            }
          } else {
            this.showPopupEle(e);
          }
          break;
        case "esc":
          this.hidePopupEle(e);
          break;
        default:
          if (this.popupTemplate || !this.isMenuOpen) {
            break;
          }
          switch (e.action) {
            case "end":
              this.focusLastElement();
              break;
            case "home":
              this.focusFirstElement();
              break;
            case "moveRight":
              if (this.mode === "Radial") {
                this.focusLeftRightElement(false);
              } else {
                this.focusLinearElement(false);
              }
              break;
            case "moveDown":
              if (this.mode === "Radial") {
                this.focusUpDownElement(false);
              } else {
                this.focusLinearElement(false);
              }
              break;
            case "moveLeft":
              if (this.mode === "Radial") {
                this.focusLeftRightElement(true);
              } else {
                this.focusLinearElement(true);
              }
              break;
            case "moveUp":
              if (this.mode === "Radial") {
                this.focusUpDownElement(true);
              } else {
                this.focusLinearElement(true);
              }
              break;
          }
          break;
      }
    };
    SpeedDial2.prototype.focusFirstElement = function() {
      var ele = selectAll("." + SDLI, this.popupEle);
      var index = 0;
      while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED3)) {
        index++;
        if (index > ele.length - 1) {
          return;
        }
      }
      this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial2.prototype.focusLastElement = function() {
      var ele = selectAll("." + SDLI, this.popupEle);
      var index = ele.length - 1;
      while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED3)) {
        index--;
        if (index < 0) {
          return;
        }
      }
      this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial2.prototype.focusLinearElement = function(isLeftUp) {
      var isReversed = this.popupEle.classList.contains(SDVERTICALBOTTOM) || this.popupEle.classList.contains(SDHORIZONTALRIGHT);
      if (isReversed !== isLeftUp) {
        this.focusPrevElement();
      } else {
        this.focusNextElement();
      }
    };
    SpeedDial2.prototype.focusLeftRightElement = function(isLeft) {
      var isradialTop = ["TopLeft", "TopCenter", "TopRight", "MiddleLeft"].indexOf(this.position) !== -1;
      if (isradialTop && isLeft !== this.isClock || !isradialTop && isLeft === this.isClock) {
        this.focusPrevElement();
      } else {
        this.focusNextElement();
      }
    };
    SpeedDial2.prototype.focusUpDownElement = function(isUp) {
      var isradialRight = ["TopRight", "MiddleRight", "BottomRight", "BottomCenter"].indexOf(this.position) !== -1;
      if (isradialRight && isUp !== this.isClock || !isradialRight && isUp === this.isClock) {
        this.focusPrevElement();
      } else {
        this.focusNextElement();
      }
    };
    SpeedDial2.prototype.focusPrevElement = function() {
      var ele = selectAll("." + SDLI, this.popupEle);
      var index = this.focusedIndex;
      do {
        index--;
        if (index < 0) {
          this.setFocus(-1);
          return;
        }
      } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED3));
      this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial2.prototype.focusNextElement = function() {
      var ele = selectAll("." + SDLI, this.popupEle);
      var index = this.focusedIndex;
      do {
        index++;
        if (index > ele.length - 1) {
          return;
        }
      } while (ele[parseInt(index.toString(), 10)].classList.contains(DISABLED3));
      this.setFocus(index, ele[parseInt(index.toString(), 10)]);
    };
    SpeedDial2.prototype.setFocus = function(index, ele) {
      this.removeFocus();
      if (ele) {
        ele.classList.add(SDACTIVELI);
      }
      this.focusedIndex = index;
    };
    SpeedDial2.prototype.removeFocus = function() {
      var preEle = select("." + SDACTIVELI, this.popupEle);
      if (preEle) {
        preEle.classList.remove(SDACTIVELI);
      }
    };
    SpeedDial2.prototype.updatePositionProperties = function() {
      this.hidePopupEle();
      this.clearPosition();
      this.validateDirection();
      this.setPositionProps();
    };
    SpeedDial2.prototype.setPositionProps = function() {
      if (this.popupTemplate) {
        this.setPosition();
      } else if (this.mode === "Radial") {
        this.setRadialPosition();
        this.setPosition();
      } else {
        this.setLinearPosition();
        this.setMaxSize();
      }
    };
    SpeedDial2.prototype.validateDirection = function() {
      switch (this.direction) {
        case "Up":
          this.actualLinDirection = topPosition.indexOf(this.position) !== -1 ? "Auto" : "Up";
          break;
        case "Down":
          this.actualLinDirection = bottomPosition.indexOf(this.position) !== -1 ? "Auto" : "Down";
          break;
        case "Right":
          this.actualLinDirection = rightPosition.indexOf(this.position) !== -1 ? "Auto" : "Right";
          break;
        case "Left":
          this.actualLinDirection = leftPosition.indexOf(this.position) !== -1 ? "Auto" : "Left";
          break;
        case "Auto":
        default:
          this.actualLinDirection = "Auto";
          break;
      }
      this.isVertical = !(this.actualLinDirection === "Left" || this.actualLinDirection === "Right");
    };
    SpeedDial2.prototype.setMaxSize = function() {
      var top = this.element.offsetTop;
      var left = this.element.offsetLeft;
      var bottom = (this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.element.offsetTop - this.element.offsetHeight;
      var right = (this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.element.offsetLeft - this.element.offsetWidth;
      var limit = 0;
      var popupUlEle = this.popupEle.querySelector("." + SDUL);
      if (this.isVertical) {
        limit = this.actualLinDirection === "Up" || this.actualLinDirection === "Auto" && topPosition.indexOf(this.position) === -1 ? top : bottom;
        if (limit < popupUlEle.offsetHeight) {
          this.popupEle.classList.add(SDOVERFLOW, SDVERTOVERFLOW);
          popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + "px");
        }
      } else {
        limit = this.direction === "Right" ? right : left;
        if (limit < popupUlEle.offsetWidth) {
          this.popupEle.classList.add(SDOVERFLOW, SDHORZOVERFLOW);
          popupUlEle.style.setProperty(SDOVERFLOWLIMIT, limit + "px");
        }
      }
    };
    SpeedDial2.prototype.setLinearPosition = function() {
      var vertDist = 0;
      var isTop = this.actualLinDirection === "Down" || this.actualLinDirection === "Auto" && topPosition.indexOf(this.position) !== -1 || !this.isVertical && bottomPosition.indexOf(this.position) === -1;
      if (isTop) {
        vertDist = this.element.offsetTop + (this.isVertical ? this.element.offsetHeight : 0);
        if (!this.isVertical) {
          this.popupEle.classList.add(SDHORIZONTALTOP);
        }
      } else {
        vertDist = this.isFixed ? window.innerHeight : this.targetEle.clientHeight;
        vertDist = vertDist - this.element.offsetTop - (this.isVertical ? 0 : this.element.offsetHeight);
        if (this.isVertical) {
          this.popupEle.classList.add(SDVERTICALBOTTOM);
        }
      }
      this.popupEle.classList.add(isTop ? SDTOP : SDBOTTOM);
      this.popupEle.style.setProperty(SDVERTDIST, vertDist + "px");
      this.setLinearHorizontalPosition();
    };
    SpeedDial2.prototype.setLinearHorizontalPosition = function() {
      if (this.actualLinDirection === "Right" || this.isVertical && rightPosition.indexOf(this.position) === -1) {
        if (this.enableRtl) {
          this.setRight();
        } else {
          this.setLeft();
        }
        if (!this.isVertical) {
          this.popupEle.classList.add(SDHORIZONTALLEFT);
        }
      } else {
        if (this.enableRtl) {
          this.setLeft();
        } else {
          this.setRight();
        }
        this.popupEle.classList.add(this.isVertical ? SDVERTICALRIGHT : SDHORIZONTALRIGHT);
      }
    };
    SpeedDial2.prototype.setLeft = function() {
      var horzDist = this.element.offsetLeft + (this.isVertical ? 0 : this.element.offsetWidth);
      this.popupEle.style.setProperty(SDHORZDIST, horzDist + "px");
      this.popupEle.classList.add(SDLEFT);
    };
    SpeedDial2.prototype.setRight = function() {
      var horzDist = this.isFixed ? window.innerWidth : this.targetEle.clientWidth;
      horzDist = horzDist - this.element.offsetLeft - (this.isVertical ? this.element.offsetWidth : 0);
      this.popupEle.style.setProperty(SDHORZDIST, horzDist + "px");
      this.popupEle.classList.add(SDRIGHT);
    };
    SpeedDial2.prototype.setPosition = function() {
      if (["MiddleLeft", "MiddleRight", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(SDMIDDLE);
        var yoffset = ((this.isFixed ? window.innerHeight : this.targetEle.clientHeight) - this.popupEle.offsetHeight) / 2;
        this.popupEle.style.setProperty(SDVERTDIST, yoffset + "px");
      }
      this.popupEle.classList.add(bottomPosition.indexOf(this.position) === -1 ? SDTOP : SDBOTTOM);
      this.setHorizontalPosition();
    };
    SpeedDial2.prototype.setHorizontalPosition = function() {
      if (["TopCenter", "BottomCenter", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(SDCENTER);
        var xoffset = ((this.isFixed ? window.innerWidth : this.targetEle.clientWidth) - this.popupEle.offsetWidth) / 2;
        this.popupEle.style.setProperty(SDHORZDIST, xoffset + "px");
      }
      var isRight = rightPosition.indexOf(this.position) !== -1;
      this.popupEle.classList.add(!(this.enableRtl || isRight) || this.enableRtl && isRight ? SDLEFT : SDRIGHT);
    };
    SpeedDial2.prototype.setRadialPosition = function() {
      this.setRadialCorner();
      var range = this.getActualRange();
      this.isClock = range.direction === "Clockwise";
      var offset = formatUnit(range.offset);
      var li = selectAll("." + SDLI, this.popupEle);
      this.popupEle.style.setProperty(SDRADICALOFFSET, offset);
      this.popupEle.style.setProperty(SDRADICALMINHEIGHT, li[0].offsetHeight + "px");
      this.popupEle.style.setProperty(SDRADICALMINWIDTH, li[0].offsetWidth + "px");
      var availableAngle = Math.abs(range.endAngle - range.startAngle);
      var gaps = availableAngle === 360 || availableAngle === 0 ? li.length : li.length - 1;
      var perAngle = availableAngle / gaps;
      for (var i = 0; i < li.length; i++) {
        var ele = li[parseInt(i.toString(), 10)];
        var angle = this.isClock ? range.startAngle + perAngle * i : range.startAngle - perAngle * i;
        angle = angle % 360;
        ele.style.setProperty(SDRADICALANGLE, angle + "deg");
      }
    };
    SpeedDial2.prototype.setRadialCorner = function() {
      if (["TopLeft", "TopCenter", "MiddleLeft", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(this.enableRtl ? SDTOPRIGHT : SDTOPLEFT);
      }
      if (["TopRight", "TopCenter", "MiddleRight", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(this.enableRtl ? SDTOPLEFT : SDTOPRIGHT);
      }
      if (["BottomLeft", "BottomCenter", "MiddleLeft", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(this.enableRtl ? SDBOTTOMRIGHT : SDBOTTOMLEFT);
      }
      if (["BottomRight", "BottomCenter", "MiddleRight", "MiddleCenter"].indexOf(this.position) !== -1) {
        this.popupEle.classList.add(this.enableRtl ? SDBOTTOMLEFT : SDBOTTOMRIGHT);
      }
    };
    SpeedDial2.prototype.getActualRange = function() {
      var range = { offset: this.radialSettings.offset };
      var start = this.radialSettings.startAngle;
      var end = this.radialSettings.endAngle;
      var isClockwise;
      switch (this.position) {
        case "TopLeft":
        case "TopRight":
          if ("TopLeft" === this.position !== this.enableRtl) {
            isClockwise = this.radialSettings.direction === "Clockwise";
            this.checkAngleRange(start, end, range, isClockwise, 0, 90, false);
          } else {
            isClockwise = this.radialSettings.direction !== "AntiClockwise";
            this.checkAngleRange(start, end, range, isClockwise, 90, 180, false);
          }
          break;
        case "TopCenter":
          isClockwise = this.radialSettings.direction === "Clockwise";
          this.checkAngleRange(start, end, range, isClockwise, 0, 180, false);
          break;
        case "MiddleLeft":
        case "MiddleRight":
          if ("MiddleLeft" === this.position !== this.enableRtl) {
            isClockwise = this.radialSettings.direction === "Clockwise";
            start = isNullOrUndefined(start) || start < 0 || start > 360 || start > 90 && start < 270 ? isClockwise ? 270 : 90 : start;
            end = isNullOrUndefined(end) || end < 0 || end > 360 || end > 90 && end < 270 ? isClockwise ? 90 : 270 : end;
            start = start < 91 ? start + 360 : start;
            end = end < 91 ? end + 360 : end;
            var switchVal = isClockwise && end < start || !isClockwise && end > start;
            range.startAngle = switchVal ? end : start;
            range.endAngle = switchVal ? start : end;
          } else {
            isClockwise = this.radialSettings.direction !== "AntiClockwise";
            this.checkAngleRange(start, end, range, isClockwise, 90, 270, false);
          }
          break;
        case "MiddleCenter":
          isClockwise = this.radialSettings.direction !== "AntiClockwise";
          start = isNullOrUndefined(start) || start < 0 || start > 360 ? isClockwise ? 0 : 360 : start;
          end = isNullOrUndefined(end) || end < 0 || end > 360 ? isClockwise ? 360 : 0 : end;
          range.startAngle = !isClockwise && start <= end ? start + 360 : start;
          range.endAngle = isClockwise && end <= start ? end + 360 : end;
          break;
        case "BottomLeft":
        case "BottomRight":
          if ("BottomLeft" === this.position !== this.enableRtl) {
            isClockwise = this.radialSettings.direction === "Clockwise";
            this.checkAngleRange(start, end, range, isClockwise, 270, 360, true);
          } else {
            isClockwise = this.radialSettings.direction !== "AntiClockwise";
            this.checkAngleRange(start, end, range, isClockwise, 180, 270, true);
          }
          break;
        case "BottomCenter":
          isClockwise = this.radialSettings.direction !== "AntiClockwise";
          this.checkAngleRange(start, end, range, isClockwise, 180, 360, true);
          break;
      }
      range.direction = isClockwise ? "Clockwise" : "AntiClockwise";
      return range;
    };
    SpeedDial2.prototype.checkAngleRange = function(start, end, range, isClockwise, min, max, check0) {
      start = this.checkAngle(start, isClockwise, min, max, check0);
      end = this.checkAngle(end, !isClockwise, min, max, check0);
      var switchVal = isClockwise && end < start || !isClockwise && end > start;
      range.startAngle = switchVal ? end : start;
      range.endAngle = switchVal ? start : end;
    };
    SpeedDial2.prototype.checkAngle = function(val, isStart, min, max, check0) {
      if (isNullOrUndefined(val) || val < 0 || val > 360) {
        return isStart ? min : max;
      } else {
        val = check0 ? val === 0 ? 360 : val : val === 360 ? 0 : val;
        return val >= min && val <= max ? val : isStart ? min : max;
      }
    };
    SpeedDial2.prototype.clearPosition = function() {
      this.popupEle.style.removeProperty(SDRADICALOFFSET);
      this.popupEle.style.removeProperty(SDRADICALMINHEIGHT);
      this.popupEle.style.removeProperty(SDRADICALMINWIDTH);
      this.popupEle.classList.remove(SDTOPLEFT, SDTOPRIGHT, SDBOTTOMLEFT, SDBOTTOMRIGHT);
      this.popupEle.classList.remove(SDTOP, SDBOTTOM, SDMIDDLE);
      this.popupEle.classList.remove(SDHORIZONTALTOP, SDVERTICALBOTTOM);
      this.popupEle.style.removeProperty(SDVERTDIST);
      this.clearHorizontalPosition();
      this.clearOverflow();
    };
    SpeedDial2.prototype.clearHorizontalPosition = function() {
      this.popupEle.style.removeProperty(SDHORZDIST);
      this.popupEle.classList.remove(SDRIGHT, SDLEFT, SDCENTER);
      this.popupEle.classList.remove(SDVERTICALRIGHT, SDHORIZONTALLEFT, SDHORIZONTALRIGHT);
    };
    SpeedDial2.prototype.clearOverflow = function() {
      this.popupEle.classList.remove(SDOVERFLOW, SDVERTOVERFLOW, SDHORZOVERFLOW);
      this.popupEle.style.removeProperty(SDOVERFLOWLIMIT);
    };
    SpeedDial2.prototype.hidePopupEle = function(e) {
      var _this = this;
      if (!this.popupEle || !this.isMenuOpen) {
        return;
      }
      var eventArgs = { element: this.popupEle, event: e, cancel: false };
      this.trigger("beforeClose", eventArgs, function(args) {
        if (args.cancel) {
          return;
        }
        if (_this.animation.effect !== "None") {
          var closeAnimation_1 = {
            name: _this.animation.effect + "Out",
            timingFunction: "easeOut"
          };
          var eleArray_1 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll("." + SDLI, _this.popupEle);
          var timeOutInterval_1 = _this.animation.duration / (eleArray_1.length + 1);
          closeAnimation_1.duration = 2 * timeOutInterval_1;
          var animateElement_1 = function(curIndex) {
            var ele2 = eleArray_1[parseInt(curIndex.toString(), 10)];
            closeAnimation_1.delay = curIndex === eleArray_1.length - 1 ? _this.animation.delay : 0;
            closeAnimation_1.begin = function() {
              if (curIndex === eleArray_1.length - 1) {
                _this.startHide();
              }
            };
            closeAnimation_1.end = function() {
              ele2.classList.add(SDHIDDEN);
              if (curIndex === 0) {
                _this.endHide();
              }
            };
            new Animation(closeAnimation_1).animate(ele2);
            if (curIndex !== 0) {
              var index_1 = curIndex - 1;
              setTimeout(function() {
                animateElement_1(index_1);
              }, timeOutInterval_1);
            }
          };
          animateElement_1(eleArray_1.length - 1);
        } else {
          _this.startHide();
          if (!_this.popupTemplate) {
            var ele = selectAll("." + SDLI, _this.popupEle);
            ele.forEach(function(element) {
              element.classList.add(SDHIDDEN);
            });
          }
          _this.endHide();
        }
      });
    };
    SpeedDial2.prototype.startHide = function() {
      this.element.setAttribute("aria-expanded", "false");
      this.removeFocus();
      this.isMenuOpen = false;
    };
    SpeedDial2.prototype.endHide = function() {
      this.fab.setProperties({ iconCss: this.openIconCss });
      this.popupEle.classList.add(SDHIDDEN);
      if (this.popupTemplate) {
        this.setVisibility(true);
      }
      this.toggleOverlay();
      if (this.popupTemplate) {
        this.popupEle.removeAttribute("tabindex");
      }
      this.trigger("onClose", { element: this.popupEle });
    };
    SpeedDial2.prototype.showPopupEle = function(e) {
      var _this = this;
      if (!this.popupEle || this.isMenuOpen) {
        return;
      }
      var eventArgs = { element: this.popupEle, event: e, cancel: false };
      this.trigger("beforeOpen", eventArgs, function(args) {
        if (args.cancel) {
          return;
        }
        if (_this.animation.effect !== "None" || animationMode === "Enable" && _this.animation.effect === "None") {
          if (animationMode === "Enable" && _this.animation.effect === "None") {
            _this.animation.effect = "Fade";
          }
          if (animationMode === "Enable" && _this.animation.duration === 0) {
            _this.animation.duration = 400;
          }
          var openAnimation_1 = {
            name: _this.animation.effect + "In",
            timingFunction: "easeIn"
          };
          var eleArray_2 = _this.popupTemplate ? [_this.popupEle.firstElementChild] : selectAll("." + SDLI, _this.popupEle);
          var timeOutInterval_2 = _this.animation.duration / (eleArray_2.length + 1);
          openAnimation_1.duration = 2 * timeOutInterval_2;
          var animateElement_2 = function(curIndex) {
            var ele2 = eleArray_2[parseInt(curIndex.toString(), 10)];
            openAnimation_1.delay = curIndex === 0 ? _this.animation.delay : 0;
            openAnimation_1.begin = function() {
              if (curIndex === 0) {
                _this.startShow();
              }
              ele2.classList.remove(SDHIDDEN);
            };
            openAnimation_1.end = function() {
              if (curIndex === eleArray_2.length - 1) {
                _this.endShow();
              }
            };
            new Animation(openAnimation_1).animate(ele2);
            if (curIndex !== eleArray_2.length - 1) {
              var index_2 = curIndex + 1;
              setTimeout(function() {
                animateElement_2(index_2);
              }, timeOutInterval_2);
            }
          };
          animateElement_2(0);
        } else {
          _this.startShow();
          if (!_this.popupTemplate) {
            var ele = selectAll("." + SDLI, _this.popupEle);
            ele.forEach(function(element) {
              element.classList.remove(SDHIDDEN);
            });
          }
          _this.endShow();
        }
      });
    };
    SpeedDial2.prototype.startShow = function() {
      this.element.setAttribute("aria-expanded", "true");
      this.isMenuOpen = true;
      this.toggleOverlay();
      this.popupEle.classList.remove(SDHIDDEN);
      if (this.popupTemplate) {
        this.setVisibility(false);
      }
    };
    SpeedDial2.prototype.endShow = function() {
      if (this.closeIconCss) {
        this.fab.setProperties({ iconCss: this.closeIconCss });
      }
      if (this.popupTemplate) {
        this.popupEle.setAttribute("tabindex", "1");
        this.popupEle.focus();
      }
      this.trigger("onOpen", { element: this.popupEle });
    };
    SpeedDial2.prototype.toggleOverlay = function() {
      if (!this.overlayEle) {
        return;
      }
      this.overlayEle.classList[this.isMenuOpen ? "remove" : "add"](SDHIDDEN);
    };
    SpeedDial2.prototype.removeOverlayEle = function() {
      if (!this.overlayEle) {
        return;
      }
      remove(this.overlayEle);
      this.overlayEle = void 0;
    };
    SpeedDial2.prototype.updatePopupItems = function() {
      if (this.popupEle) {
        this.hidePopupEle();
        this.clearItems();
        this.createItems();
        this.updatePositionProperties();
      } else {
        this.createPopup();
      }
    };
    SpeedDial2.prototype.handleResize = function(e) {
      if (!this.popupEle) {
        return;
      }
      this.hidePopupEle(e);
      this.clearOverflow();
      this.setPositionProps();
    };
    SpeedDial2.prototype.triggerItemClick = function(e, item) {
      var target = e.target;
      target = target.classList.contains(SDLI) ? target : closest(target, "." + SDLI);
      var eventArgs = { element: target, item, event: e };
      this.trigger("clicked", eventArgs);
      this.hidePopupEle(e);
    };
    SpeedDial2.prototype.show = function() {
      this.showPopupEle();
    };
    SpeedDial2.prototype.hide = function() {
      this.hidePopupEle();
    };
    SpeedDial2.prototype.refreshPosition = function() {
      this.fab.refreshPosition();
      this.resizeHandler();
    };
    SpeedDial2.prototype.resizeHandler = function(e) {
      this.handleResize(e);
    };
    SpeedDial2.prototype.clearItems = function() {
      var liList = selectAll("." + SDLI, this.popupEle);
      liList.forEach(function(element) {
        remove(element);
      });
    };
    SpeedDial2.prototype.unwireEvents = function() {
      EventHandler.remove(window, "resize", this.resizeHandler);
      EventHandler.remove(document.body, "click", this.bodyClickHandler);
      if (this.opensOnHover) {
        this.unwireFabHover();
      } else {
        this.unwireFabClick();
      }
    };
    SpeedDial2.prototype.unwireFabClick = function() {
      EventHandler.remove(this.fab.element, "click", this.fabClick);
    };
    SpeedDial2.prototype.unwireFabHover = function() {
      this.popupEle.classList.remove(HOVERSD);
      EventHandler.remove(this.fab.element, "mouseover", this.mouseOverHandle);
      EventHandler.remove(this.element, "mouseleave", this.mouseLeaveHandle);
    };
    SpeedDial2.prototype.unwirePopupEvents = function() {
      if (isRippleEnabled) {
        this.removeRippleEffect();
      }
      this.removeRippleEffect = null;
      this.keyboardModule.destroy();
      this.popupKeyboardModule.destroy();
      this.documentKeyboardModule.destroy();
      this.keyboardModule = null;
      this.popupKeyboardModule = null;
      this.documentKeyboardModule = null;
      EventHandler.remove(this.popupEle, "click", this.popupClick);
      EventHandler.remove(this.popupEle, "mouseleave", this.popupMouseLeaveHandle);
    };
    SpeedDial2.prototype.destroy = function() {
      var _this = this;
      _super.prototype.destroy.call(this);
      this.unwireEvents();
      ["aria-expanded", "aria-haspopup", "aria-controls"].forEach(function(attr) {
        _this.element.removeAttribute(attr);
      });
      if (this.popupEle) {
        this.unwirePopupEvents();
        remove(this.popupEle);
        this.popupEle = void 0;
      }
      this.removeOverlayEle();
      this.fab.destroy();
      this.fab = void 0;
    };
    SpeedDial2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var fabProplist = ["content", "cssClass", "disabled", "enablePersistence", "enableRtl", "iconPosition", "position", "target", "template", "title", "visible", "isPrimary"];
      var fabModel = extend({}, newProp);
      for (var _i = 0, _a = Object.keys(fabModel); _i < _a.length; _i++) {
        var prop = _a[_i];
        if (fabProplist.indexOf(prop) < 0) {
          deleteObject(fabModel, prop);
        }
      }
      this.fab.setProperties(fabModel);
      for (var _b = 0, _c = Object.keys(newProp); _b < _c.length; _b++) {
        var prop = _c[_b];
        switch (prop) {
          case "cssClass":
            if (!this.popupEle) {
              break;
            }
            if (oldProp.cssClass) {
              removeClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass(this.overlayEle ? [this.popupEle, this.overlayEle] : [this.popupEle], newProp.cssClass.split(" "));
            }
            break;
          case "visible":
          case "disabled":
            this.hide();
            break;
          case "enableRtl":
            if (!this.popupEle) {
              break;
            }
            this.setRTL();
            break;
          case "openIconCss":
            if (!this.isMenuOpen) {
              this.fab.setProperties({ iconCss: this.openIconCss });
            }
            break;
          case "closeIconCss":
            if (this.isMenuOpen) {
              this.fab.setProperties({ iconCss: this.closeIconCss });
            }
            break;
          case "position":
            if (!this.popupEle) {
              break;
            }
            this.updatePositionProperties();
            break;
          case "direction":
            if (!this.popupEle || this.popupTemplate) {
              break;
            }
            this.updatePositionProperties();
            break;
          case "popupTemplate":
            this.updatePopupTemplate();
            break;
          case "target":
            this.hidePopupEle();
            this.checkTarget();
            if (this.overlayEle) {
              this.element.insertAdjacentElement("beforebegin", this.overlayEle);
            }
            if (!this.popupEle) {
              break;
            }
            this.element.insertAdjacentElement("afterend", this.popupEle);
            this.updatePositionProperties();
            break;
          case "items":
          case "itemTemplate":
            if (this.popupTemplate) {
              break;
            }
            this.updatePopupItems();
            break;
          case "modal":
            if (newProp.modal) {
              this.createOverlay();
            } else {
              this.removeOverlayEle();
            }
            break;
          case "mode":
            if (!this.popupEle || this.popupTemplate) {
              break;
            }
            this.popupEle.classList.remove(RADIALSD, LINEARSD);
            this.popupEle.classList.add(this.mode === "Radial" ? RADIALSD : LINEARSD);
            this.updatePositionProperties();
            break;
          case "radialSettings":
            if (this.popupEle && this.mode === "Radial" && !this.popupTemplate) {
              this.setRadialPosition();
            }
            break;
          case "opensOnHover":
            if (this.opensOnHover) {
              this.unwireFabClick();
              this.wireFabHover();
            } else {
              this.unwireFabHover();
              this.wireFabClick();
            }
            break;
        }
      }
    };
    __decorate8([
      Complex({}, SpeedDialAnimationSettings)
    ], SpeedDial2.prototype, "animation", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "content", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "closeIconCss", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "cssClass", void 0);
    __decorate8([
      Property("Auto")
    ], SpeedDial2.prototype, "direction", void 0);
    __decorate8([
      Property(false)
    ], SpeedDial2.prototype, "disabled", void 0);
    __decorate8([
      Property("Left")
    ], SpeedDial2.prototype, "iconPosition", void 0);
    __decorate8([
      Collection([], SpeedDialItem)
    ], SpeedDial2.prototype, "items", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "itemTemplate", void 0);
    __decorate8([
      Property("Linear")
    ], SpeedDial2.prototype, "mode", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "openIconCss", void 0);
    __decorate8([
      Property(false)
    ], SpeedDial2.prototype, "opensOnHover", void 0);
    __decorate8([
      Property("BottomRight")
    ], SpeedDial2.prototype, "position", void 0);
    __decorate8([
      Property(false)
    ], SpeedDial2.prototype, "modal", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "popupTemplate", void 0);
    __decorate8([
      Complex({}, RadialSettings)
    ], SpeedDial2.prototype, "radialSettings", void 0);
    __decorate8([
      Property("")
    ], SpeedDial2.prototype, "target", void 0);
    __decorate8([
      Property(true)
    ], SpeedDial2.prototype, "visible", void 0);
    __decorate8([
      Property(true)
    ], SpeedDial2.prototype, "isPrimary", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "beforeClose", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "beforeItemRender", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "beforeOpen", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "created", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "clicked", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "onClose", void 0);
    __decorate8([
      Event()
    ], SpeedDial2.prototype, "onOpen", void 0);
    SpeedDial2 = __decorate8([
      NotifyPropertyChanges
    ], SpeedDial2);
    return SpeedDial2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-buttons/fesm2020/syncfusion-ej2-angular-buttons.mjs
var _c0 = ["ejs-button", ""];
var _c1 = ["*"];
var _c2 = ["ejs-fab", ""];
var _c3 = ["itemTemplate"];
var _c4 = ["popupTemplate"];
var _c5 = ["ejs-speeddial", ""];
var inputs$6 = ["content", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "isPrimary", "isToggle", "locale"];
var outputs$8 = ["created"];
var twoWays$6 = [];
var ButtonComponent = class ButtonComponent2 extends Button {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$8);
    this.addTwoWay.call(this, twoWays$6);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) {
  return new (t || ButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: ButtonComponent,
  selectors: [["", "ejs-button", ""]],
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    isToggle: "isToggle",
    locale: "locale"
  },
  outputs: {
    created: "created"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c0,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
ButtonComponent = __decorate([ComponentMixins([ComponentBase])], ButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-button]",
      inputs: inputs$6,
      outputs: outputs$8,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var ButtonModule = class {
};
ButtonModule.ɵfac = function ButtonModule_Factory(t) {
  return new (t || ButtonModule)();
};
ButtonModule.ɵmod = ɵɵdefineNgModule({
  type: ButtonModule,
  declarations: [ButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent]
});
ButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ButtonComponent],
      exports: [ButtonComponent]
    }]
  }], null, null);
})();
var ButtonAllModule = class {
};
ButtonAllModule.ɵfac = function ButtonAllModule_Factory(t) {
  return new (t || ButtonAllModule)();
};
ButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: ButtonAllModule,
  imports: [CommonModule, ButtonModule],
  exports: [ButtonModule]
});
ButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ButtonModule], ButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ButtonModule],
      exports: [ButtonModule],
      providers: []
    }]
  }], null, null);
})();
var CheckBoxComponent_1;
var inputs$5 = ["checked", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "htmlAttributes", "indeterminate", "label", "labelPosition", "locale", "name", "value"];
var outputs$7 = ["focus", "blur", "change", "created", "checkedChange", "indeterminateChange"];
var twoWays$5 = ["checked", "indeterminate"];
var CheckBoxComponent = CheckBoxComponent_1 = class CheckBoxComponent2 extends CheckBox {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$7);
    this.addTwoWay.call(this, twoWays$5);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
CheckBoxComponent.ɵfac = function CheckBoxComponent_Factory(t) {
  return new (t || CheckBoxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
CheckBoxComponent.ɵcmp = ɵɵdefineComponent({
  type: CheckBoxComponent,
  selectors: [["ejs-checkbox"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    indeterminate: "indeterminate",
    label: "label",
    labelPosition: "labelPosition",
    locale: "locale",
    name: "name",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    checkedChange: "checkedChange",
    indeterminateChange: "indeterminateChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function CheckBoxComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
CheckBoxComponent = CheckBoxComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], CheckBoxComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxComponent, [{
    type: Component,
    args: [{
      selector: "ejs-checkbox",
      inputs: inputs$5,
      outputs: outputs$7,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckBoxComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var CheckBoxModule = class {
};
CheckBoxModule.ɵfac = function CheckBoxModule_Factory(t) {
  return new (t || CheckBoxModule)();
};
CheckBoxModule.ɵmod = ɵɵdefineNgModule({
  type: CheckBoxModule,
  declarations: [CheckBoxComponent],
  imports: [CommonModule],
  exports: [CheckBoxComponent]
});
CheckBoxModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [CheckBoxComponent],
      exports: [CheckBoxComponent]
    }]
  }], null, null);
})();
var CheckBoxAllModule = class {
};
CheckBoxAllModule.ɵfac = function CheckBoxAllModule_Factory(t) {
  return new (t || CheckBoxAllModule)();
};
CheckBoxAllModule.ɵmod = ɵɵdefineNgModule({
  type: CheckBoxAllModule,
  imports: [CommonModule, CheckBoxModule],
  exports: [CheckBoxModule]
});
CheckBoxAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, CheckBoxModule], CheckBoxModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckBoxAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CheckBoxModule],
      exports: [CheckBoxModule],
      providers: []
    }]
  }], null, null);
})();
var RadioButtonComponent_1;
var inputs$4 = ["checked", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "htmlAttributes", "label", "labelPosition", "locale", "name", "value"];
var outputs$6 = ["focus", "blur", "change", "created", "valueChange"];
var twoWays$4 = ["value"];
var RadioButtonComponent = RadioButtonComponent_1 = class RadioButtonComponent2 extends RadioButton {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$6);
    this.addTwoWay.call(this, twoWays$4);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
RadioButtonComponent.ɵfac = function RadioButtonComponent_Factory(t) {
  return new (t || RadioButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
RadioButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: RadioButtonComponent,
  selectors: [["ejs-radiobutton"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    label: "label",
    labelPosition: "labelPosition",
    locale: "locale",
    name: "name",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    valueChange: "valueChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function RadioButtonComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
RadioButtonComponent = RadioButtonComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], RadioButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonComponent, [{
    type: Component,
    args: [{
      selector: "ejs-radiobutton",
      inputs: inputs$4,
      outputs: outputs$6,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioButtonComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var RadioButtonModule = class {
};
RadioButtonModule.ɵfac = function RadioButtonModule_Factory(t) {
  return new (t || RadioButtonModule)();
};
RadioButtonModule.ɵmod = ɵɵdefineNgModule({
  type: RadioButtonModule,
  declarations: [RadioButtonComponent],
  imports: [CommonModule],
  exports: [RadioButtonComponent]
});
RadioButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [RadioButtonComponent],
      exports: [RadioButtonComponent]
    }]
  }], null, null);
})();
var RadioButtonAllModule = class {
};
RadioButtonAllModule.ɵfac = function RadioButtonAllModule_Factory(t) {
  return new (t || RadioButtonAllModule)();
};
RadioButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: RadioButtonAllModule,
  imports: [CommonModule, RadioButtonModule],
  exports: [RadioButtonModule]
});
RadioButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, RadioButtonModule], RadioButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RadioButtonModule],
      exports: [RadioButtonModule],
      providers: []
    }]
  }], null, null);
})();
var SwitchComponent_1;
var inputs$3 = ["checked", "cssClass", "disabled", "enablePersistence", "enableRtl", "htmlAttributes", "locale", "name", "offLabel", "onLabel", "value"];
var outputs$5 = ["focus", "blur", "change", "created", "checkedChange"];
var twoWays$3 = ["checked"];
var SwitchComponent = SwitchComponent_1 = class SwitchComponent2 extends Switch {
  constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.cdr = cdr;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$5);
    this.addTwoWay.call(this, twoWays$3);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.formContext = new FormBase();
    this.formCompContext = new ComponentBase();
  }
  registerOnChange(registerFunction) {
  }
  registerOnTouched(registerFunction) {
  }
  writeValue(value) {
  }
  setDisabledState(disabled) {
  }
  ngOnInit() {
    this.formCompContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.formContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.formCompContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.formCompContext.ngAfterContentChecked(this);
  }
};
SwitchComponent.ɵfac = function SwitchComponent_Factory(t) {
  return new (t || SwitchComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector), ɵɵdirectiveInject(ChangeDetectorRef));
};
SwitchComponent.ɵcmp = ɵɵdefineComponent({
  type: SwitchComponent,
  selectors: [["ejs-switch"]],
  inputs: {
    checked: "checked",
    cssClass: "cssClass",
    disabled: "disabled",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    locale: "locale",
    name: "name",
    offLabel: "offLabel",
    onLabel: "onLabel",
    value: "value"
  },
  outputs: {
    focus: "focus",
    blur: "blur",
    change: "change",
    created: "created",
    checkedChange: "checkedChange"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent_1),
    multi: true
  }]), ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function SwitchComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
SwitchComponent = SwitchComponent_1 = __decorate([ComponentMixins([ComponentBase, FormBase])], SwitchComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchComponent, [{
    type: Component,
    args: [{
      selector: "ejs-switch",
      inputs: inputs$3,
      outputs: outputs$5,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
        multi: true
      }],
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }, {
      type: ChangeDetectorRef
    }];
  }, null);
})();
var SwitchModule = class {
};
SwitchModule.ɵfac = function SwitchModule_Factory(t) {
  return new (t || SwitchModule)();
};
SwitchModule.ɵmod = ɵɵdefineNgModule({
  type: SwitchModule,
  declarations: [SwitchComponent],
  imports: [CommonModule],
  exports: [SwitchComponent]
});
SwitchModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SwitchComponent],
      exports: [SwitchComponent]
    }]
  }], null, null);
})();
var SwitchAllModule = class {
};
SwitchAllModule.ɵfac = function SwitchAllModule_Factory(t) {
  return new (t || SwitchAllModule)();
};
SwitchAllModule.ɵmod = ɵɵdefineNgModule({
  type: SwitchAllModule,
  imports: [CommonModule, SwitchModule],
  exports: [SwitchModule]
});
SwitchAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SwitchModule], SwitchModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwitchAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SwitchModule],
      exports: [SwitchModule],
      providers: []
    }]
  }], null, null);
})();
var input$1 = ["avatarIconCss", "avatarText", "cssClass", "enabled", "htmlAttributes", "leadingIconCss", "leadingIconUrl", "text", "trailingIconCss", "trailingIconUrl", "value"];
var outputs$4 = [];
var ChipDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue2("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$4);
    this.directivePropList = input$1;
  }
};
ChipDirective.ɵfac = function ChipDirective_Factory(t) {
  return new (t || ChipDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
ChipDirective.ɵdir = ɵɵdefineDirective({
  type: ChipDirective,
  selectors: [["e-chip"]],
  inputs: {
    avatarIconCss: "avatarIconCss",
    avatarText: "avatarText",
    cssClass: "cssClass",
    enabled: "enabled",
    htmlAttributes: "htmlAttributes",
    leadingIconCss: "leadingIconCss",
    leadingIconUrl: "leadingIconUrl",
    text: "text",
    trailingIconCss: "trailingIconCss",
    trailingIconUrl: "trailingIconUrl",
    value: "value"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipDirective, [{
    type: Directive,
    args: [{
      selector: "e-chips>e-chip",
      inputs: input$1,
      outputs: outputs$4,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var ChipsDirective = class extends ArrayBase {
  constructor() {
    super("chips");
  }
};
ChipsDirective.ɵfac = function ChipsDirective_Factory(t) {
  return new (t || ChipsDirective)();
};
ChipsDirective.ɵdir = ɵɵdefineDirective({
  type: ChipsDirective,
  selectors: [["e-chips"]],
  contentQueries: function ChipsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ChipDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-chiplist>e-chips",
      queries: {
        children: new ContentChildren(ChipDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$2 = ["avatarIconCss", "avatarText", "chips", "cssClass", "enableDelete", "enablePersistence", "enableRtl", "enabled", "htmlAttributes", "leadingIconCss", "leadingIconUrl", "locale", "selectedChips", "selection", "text", "trailingIconCss", "trailingIconUrl"];
var outputs$3 = ["beforeClick", "click", "created", "delete", "deleted"];
var twoWays$2 = [""];
var ChipListComponent = class ChipListComponent2 extends ChipList {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["chips"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$3);
    this.addTwoWay.call(this, twoWays$2);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childChips;
    this.context.ngAfterContentChecked(this);
  }
};
ChipListComponent.ɵfac = function ChipListComponent_Factory(t) {
  return new (t || ChipListComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ChipListComponent.ɵcmp = ɵɵdefineComponent({
  type: ChipListComponent,
  selectors: [["ejs-chiplist"]],
  contentQueries: function ChipListComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ChipsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childChips = _t.first);
    }
  },
  inputs: {
    avatarIconCss: "avatarIconCss",
    avatarText: "avatarText",
    chips: "chips",
    cssClass: "cssClass",
    enableDelete: "enableDelete",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enabled: "enabled",
    htmlAttributes: "htmlAttributes",
    leadingIconCss: "leadingIconCss",
    leadingIconUrl: "leadingIconUrl",
    locale: "locale",
    selectedChips: "selectedChips",
    selection: "selection",
    text: "text",
    trailingIconCss: "trailingIconCss",
    trailingIconUrl: "trailingIconUrl"
  },
  outputs: {
    beforeClick: "beforeClick",
    click: "click",
    created: "created",
    delete: "delete",
    deleted: "deleted"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function ChipListComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
ChipListComponent = __decorate([ComponentMixins([ComponentBase])], ChipListComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListComponent, [{
    type: Component,
    args: [{
      selector: "ejs-chiplist",
      inputs: inputs$2,
      outputs: outputs$3,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childChips: new ContentChild(ChipsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var ChipListModule = class {
};
ChipListModule.ɵfac = function ChipListModule_Factory(t) {
  return new (t || ChipListModule)();
};
ChipListModule.ɵmod = ɵɵdefineNgModule({
  type: ChipListModule,
  declarations: [ChipListComponent, ChipDirective, ChipsDirective],
  imports: [CommonModule],
  exports: [ChipListComponent, ChipDirective, ChipsDirective]
});
ChipListModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ChipListComponent, ChipDirective, ChipsDirective],
      exports: [ChipListComponent, ChipDirective, ChipsDirective]
    }]
  }], null, null);
})();
var ChipListAllModule = class {
};
ChipListAllModule.ɵfac = function ChipListAllModule_Factory(t) {
  return new (t || ChipListAllModule)();
};
ChipListAllModule.ɵmod = ɵɵdefineNgModule({
  type: ChipListAllModule,
  imports: [CommonModule, ChipListModule],
  exports: [ChipListModule]
});
ChipListAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ChipListModule], ChipListModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipListAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ChipListModule],
      exports: [ChipListModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$1 = ["content", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "isPrimary", "isToggle", "locale", "position", "target", "visible"];
var outputs$2 = ["created"];
var twoWays$1 = [];
var FabComponent = class FabComponent2 extends Fab {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$2);
    this.addTwoWay.call(this, twoWays$1);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
FabComponent.ɵfac = function FabComponent_Factory(t) {
  return new (t || FabComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
FabComponent.ɵcmp = ɵɵdefineComponent({
  type: FabComponent,
  selectors: [["", "ejs-fab", ""]],
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    isToggle: "isToggle",
    locale: "locale",
    position: "position",
    target: "target",
    visible: "visible"
  },
  outputs: {
    created: "created"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c2,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function FabComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
FabComponent = __decorate([ComponentMixins([ComponentBase])], FabComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-fab]",
      inputs: inputs$1,
      outputs: outputs$2,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var FabModule = class {
};
FabModule.ɵfac = function FabModule_Factory(t) {
  return new (t || FabModule)();
};
FabModule.ɵmod = ɵɵdefineNgModule({
  type: FabModule,
  declarations: [FabComponent],
  imports: [CommonModule],
  exports: [FabComponent]
});
FabModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [FabComponent],
      exports: [FabComponent]
    }]
  }], null, null);
})();
var FabAllModule = class {
};
FabAllModule.ɵfac = function FabAllModule_Factory(t) {
  return new (t || FabAllModule)();
};
FabAllModule.ɵmod = ɵɵdefineNgModule({
  type: FabAllModule,
  imports: [CommonModule, FabModule],
  exports: [FabModule]
});
FabAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, FabModule], FabModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FabAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FabModule],
      exports: [FabModule],
      providers: []
    }]
  }], null, null);
})();
var input = ["disabled", "iconCss", "id", "text", "title"];
var outputs$1 = [];
var SpeedDialItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue2("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$1);
    this.directivePropList = input;
  }
};
SpeedDialItemDirective.ɵfac = function SpeedDialItemDirective_Factory(t) {
  return new (t || SpeedDialItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
SpeedDialItemDirective.ɵdir = ɵɵdefineDirective({
  type: SpeedDialItemDirective,
  selectors: [["e-speeddial-item"]],
  inputs: {
    disabled: "disabled",
    iconCss: "iconCss",
    id: "id",
    text: "text",
    title: "title"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-speeddial-item",
      inputs: input,
      outputs: outputs$1,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var SpeedDialItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
SpeedDialItemsDirective.ɵfac = function SpeedDialItemsDirective_Factory(t) {
  return new (t || SpeedDialItemsDirective)();
};
SpeedDialItemsDirective.ɵdir = ɵɵdefineDirective({
  type: SpeedDialItemsDirective,
  selectors: [["e-speeddial-items"]],
  contentQueries: function SpeedDialItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, SpeedDialItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialItemsDirective, [{
    type: Directive,
    args: [{
      selector: "e-speeddial-items",
      queries: {
        children: new ContentChildren(SpeedDialItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs = ["animation", "closeIconCss", "content", "cssClass", "direction", "disabled", "enablePersistence", "enableRtl", "iconPosition", "isPrimary", "itemTemplate", "items", "locale", "modal", "mode", "openIconCss", "opensOnHover", "popupTemplate", "position", "radialSettings", "target", "visible"];
var outputs = ["beforeClose", "beforeItemRender", "beforeOpen", "clicked", "created", "onClose", "onOpen", "visibleChange"];
var twoWays = ["visible"];
var SpeedDialComponent = class SpeedDialComponent2 extends SpeedDial {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs);
    this.addTwoWay.call(this, twoWays);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
SpeedDialComponent.ɵfac = function SpeedDialComponent_Factory(t) {
  return new (t || SpeedDialComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
SpeedDialComponent.ɵcmp = ɵɵdefineComponent({
  type: SpeedDialComponent,
  selectors: [["", "ejs-speeddial", ""]],
  contentQueries: function SpeedDialComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, _c4, 5);
      ɵɵcontentQuery(dirIndex, SpeedDialItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.popupTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    animation: "animation",
    closeIconCss: "closeIconCss",
    content: "content",
    cssClass: "cssClass",
    direction: "direction",
    disabled: "disabled",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    itemTemplate: "itemTemplate",
    items: "items",
    locale: "locale",
    modal: "modal",
    mode: "mode",
    openIconCss: "openIconCss",
    opensOnHover: "opensOnHover",
    popupTemplate: "popupTemplate",
    position: "position",
    radialSettings: "radialSettings",
    target: "target",
    visible: "visible"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    clicked: "clicked",
    created: "created",
    onClose: "onClose",
    onOpen: "onOpen",
    visibleChange: "visibleChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c5,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function SpeedDialComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], SpeedDialComponent.prototype, "itemTemplate", void 0);
__decorate([Template()], SpeedDialComponent.prototype, "popupTemplate", void 0);
SpeedDialComponent = __decorate([ComponentMixins([ComponentBase])], SpeedDialComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-speeddial]",
      inputs,
      outputs,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(SpeedDialItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    itemTemplate: [{
      type: ContentChild,
      args: ["itemTemplate"]
    }],
    popupTemplate: [{
      type: ContentChild,
      args: ["popupTemplate"]
    }]
  });
})();
var SpeedDialModule = class {
};
SpeedDialModule.ɵfac = function SpeedDialModule_Factory(t) {
  return new (t || SpeedDialModule)();
};
SpeedDialModule.ɵmod = ɵɵdefineNgModule({
  type: SpeedDialModule,
  declarations: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective],
  imports: [CommonModule],
  exports: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective]
});
SpeedDialModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective],
      exports: [SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective]
    }]
  }], null, null);
})();
var SpeedDialAllModule = class {
};
SpeedDialAllModule.ɵfac = function SpeedDialAllModule_Factory(t) {
  return new (t || SpeedDialAllModule)();
};
SpeedDialAllModule.ɵmod = ɵɵdefineNgModule({
  type: SpeedDialAllModule,
  imports: [CommonModule, SpeedDialModule],
  exports: [SpeedDialModule]
});
SpeedDialAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SpeedDialModule], SpeedDialModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpeedDialAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SpeedDialModule],
      exports: [SpeedDialModule],
      providers: []
    }]
  }], null, null);
})();
export {
  Button,
  ButtonAllModule,
  ButtonComponent,
  ButtonModule,
  CheckBox,
  CheckBoxAllModule,
  CheckBoxComponent,
  CheckBoxModule,
  Chip,
  ChipDirective,
  ChipList,
  ChipListAllModule,
  ChipListComponent,
  ChipListModule,
  ChipsDirective,
  Fab,
  FabAllModule,
  FabComponent,
  FabModule,
  FabPosition,
  IconPosition,
  LinearDirection,
  RadialDirection,
  RadialSettings,
  RadioButton,
  RadioButtonAllModule,
  RadioButtonComponent,
  RadioButtonModule,
  SpeedDial,
  SpeedDialAllModule,
  SpeedDialAnimationEffect,
  SpeedDialAnimationSettings,
  SpeedDialComponent,
  SpeedDialItem,
  SpeedDialItemDirective,
  SpeedDialItemsDirective,
  SpeedDialMode,
  SpeedDialModule,
  Switch,
  SwitchAllModule,
  SwitchComponent,
  SwitchModule,
  buttonObserver,
  classNames,
  createCheckBox,
  destroy,
  getTextNode,
  preRender,
  rippleMouseHandler,
  setHiddenInput,
  wrapperInitialize
};
//# sourceMappingURL=@syncfusion_ej2-angular-buttons.js.map
