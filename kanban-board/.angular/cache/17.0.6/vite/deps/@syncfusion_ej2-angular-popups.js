import {
  Animation,
  Browser,
  ChildProperty,
  Collection,
  Complex,
  Component as Component2,
  Draggable,
  Event,
  EventHandler,
  KeyboardEvents,
  L10n,
  NotifyPropertyChanges,
  Observer,
  Property,
  SanitizeHtmlHelper,
  Touch,
  addClass,
  animationMode,
  append,
  attributes,
  classList,
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
  prepend,
  remove,
  removeClass,
  rippleEffect,
  select,
  selectAll,
  setStyleAttribute,
  setTemplateEngine,
  setValue
} from "./chunk-6LU2UWWE.js";
import {
  CommonModule
} from "./chunk-5FJW54NJ.js";
import {
  ChangeDetectionStrategy,
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
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-angular-base/src/util.js
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-angular-base/src/complex-array-base.js
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-angular-base/src/component-base.js
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-angular-base/src/form-base.js
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-angular-base/src/template.js
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

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/common/position.js
var elementRect;
var popupRect;
var element;
var parentDocument;
var fixedParent = false;
function calculateRelativeBasedPosition(anchor, element2) {
  var fixedElement = false;
  var anchorPos = { left: 0, top: 0 };
  var tempAnchor = anchor;
  if (!anchor || !element2) {
    return anchorPos;
  }
  if (isNullOrUndefined(element2.offsetParent) && element2.style.position === "fixed") {
    fixedElement = true;
  }
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left += anchor.offsetLeft;
    anchorPos.top += anchor.offsetTop;
    anchor = anchor.offsetParent;
  }
  anchor = tempAnchor;
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left -= anchor.scrollLeft;
    anchorPos.top -= anchor.scrollTop;
    anchor = anchor.parentElement;
  }
  return anchorPos;
}
function calculatePosition(currentElement, positionX, positionY, parentElement, targetValues) {
  popupRect = void 0;
  popupRect = targetValues;
  fixedParent = parentElement ? true : false;
  if (!currentElement) {
    return { left: 0, top: 0 };
  }
  if (!positionX) {
    positionX = "left";
  }
  if (!positionY) {
    positionY = "top";
  }
  parentDocument = currentElement.ownerDocument;
  element = currentElement;
  var pos = { left: 0, top: 0 };
  return updatePosition(positionX.toLowerCase(), positionY.toLowerCase(), pos);
}
function setPosx(value, pos) {
  pos.left = value;
}
function setPosy(value, pos) {
  pos.top = value;
}
function updatePosition(posX, posY, pos) {
  elementRect = element.getBoundingClientRect();
  switch (posY + posX) {
    case "topcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "topright":
      setPosx(getElementRight(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "centercenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerright":
      setPosx(getElementRight(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "bottomcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomright":
      setPosx(getElementRight(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementBottom(), pos);
      break;
    default:
    case "topleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementTop(), pos);
      break;
  }
  element = null;
  return pos;
}
function getBodyScrollTop() {
  return parentDocument.documentElement.scrollTop || parentDocument.body.scrollTop;
}
function getBodyScrollLeft() {
  return parentDocument.documentElement.scrollLeft || parentDocument.body.scrollLeft;
}
function getElementBottom() {
  return fixedParent ? elementRect.bottom : elementRect.bottom + getBodyScrollTop();
}
function getElementVCenter() {
  return getElementTop() + elementRect.height / 2;
}
function getElementTop() {
  return fixedParent ? elementRect.top : elementRect.top + getBodyScrollTop();
}
function getElementLeft() {
  return elementRect.left + getBodyScrollLeft();
}
function getElementRight() {
  var popupWidth = element && (element.classList.contains("e-date-wrapper") || element.classList.contains("e-datetime-wrapper") || element.classList.contains("e-date-range-wrapper") || element.classList.contains("e-multiselect")) ? popupRect ? popupRect.width : 0 : popupRect && elementRect.width >= popupRect.width ? popupRect.width : 0;
  return elementRect.right + getBodyScrollLeft() - popupWidth;
}
function getElementHCenter() {
  return getElementLeft() + elementRect.width / 2;
}

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/common/collision.js
var parentDocument2;
var targetContainer;
function fit(element2, viewPortElement, axis, position) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: false, Y: false };
  }
  if (!axis.Y && !axis.X) {
    return { left: 0, top: 0 };
  }
  var elemData = element2.getBoundingClientRect();
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  if (!position) {
    position = calculatePosition(element2, "left", "top");
  }
  if (axis.X) {
    var containerWidth = targetContainer ? getTargetContainerWidth() : getViewPortWidth();
    var containerLeft = ContainerLeft();
    var containerRight = ContainerRight();
    var overLeft = containerLeft - position.left;
    var overRight = position.left + elemData.width - containerRight;
    if (elemData.width > containerWidth) {
      if (overLeft > 0 && overRight <= 0) {
        position.left = containerRight - elemData.width;
      } else if (overRight > 0 && overLeft <= 0) {
        position.left = containerLeft;
      } else {
        position.left = overLeft > overRight ? containerRight - elemData.width : containerLeft;
      }
    } else if (overLeft > 0) {
      position.left += overLeft;
    } else if (overRight > 0) {
      position.left -= overRight;
    }
  }
  if (axis.Y) {
    var containerHeight = targetContainer ? getTargetContainerHeight() : getViewPortHeight();
    var containerTop = ContainerTop();
    var containerBottom = ContainerBottom();
    var overTop = containerTop - position.top;
    var overBottom = position.top + elemData.height - containerBottom;
    if (elemData.height > containerHeight) {
      if (overTop > 0 && overBottom <= 0) {
        position.top = containerBottom - elemData.height;
      } else if (overBottom > 0 && overTop <= 0) {
        position.top = containerTop;
      } else {
        position.top = overTop > overBottom ? containerBottom - elemData.height : containerTop;
      }
    } else if (overTop > 0) {
      position.top += overTop;
    } else if (overBottom > 0) {
      position.top -= overBottom;
    }
  }
  return position;
}
function isCollide(element2, viewPortElement, x, y) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  var elemOffset = calculatePosition(element2, "left", "top");
  if (x) {
    elemOffset.left = x;
  }
  if (y) {
    elemOffset.top = y;
  }
  var data = [];
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  var elementRect2 = element2.getBoundingClientRect();
  var top = elemOffset.top;
  var left = elemOffset.left;
  var right = elemOffset.left + elementRect2.width;
  var bottom = elemOffset.top + elementRect2.height;
  var topData = "", leftData = "";
  var yAxis = topCollideCheck(top, bottom);
  var xAxis = leftCollideCheck(left, right);
  if (yAxis.topSide) {
    data.push("top");
  }
  if (xAxis.rightSide) {
    data.push("right");
  }
  if (xAxis.leftSide) {
    data.push("left");
  }
  if (yAxis.bottomSide) {
    data.push("bottom");
  }
  return data;
}
function flip(element2, target, offsetX, offsetY, positionX, positionY, viewPortElement, axis, fixedParent2) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: true, Y: true };
  }
  if (!target || !element2 || !positionX || !positionY || !axis.X && !axis.Y) {
    return;
  }
  var tEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
  }, eEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
    /* eslint-enable */
  };
  var elementRect2;
  if (window.getComputedStyle(element2).display === "none") {
    var oldVisibility = element2.style.visibility;
    element2.style.visibility = "hidden";
    element2.style.display = "block";
    elementRect2 = element2.getBoundingClientRect();
    element2.style.removeProperty("display");
    element2.style.visibility = oldVisibility;
  } else {
    elementRect2 = element2.getBoundingClientRect();
  }
  var pos = {
    posX: positionX,
    posY: positionY,
    offsetX,
    offsetY,
    position: { left: 0, top: 0 }
  };
  targetContainer = viewPortElement;
  parentDocument2 = target.ownerDocument;
  updateElementData(target, tEdge, pos, fixedParent2, elementRect2);
  setPosition(eEdge, pos, elementRect2);
  if (axis.X) {
    leftFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  if (axis.Y && tEdge.TL.top > -1) {
    topFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  setPopup(element2, pos, elementRect2);
}
function setPopup(element2, pos, elementRect2) {
  var left = 0, top = 0;
  if (element2.offsetParent != null && (getComputedStyle(element2.offsetParent).position === "absolute" || getComputedStyle(element2.offsetParent).position === "relative")) {
    var data = calculatePosition(element2.offsetParent, "left", "top", false, elementRect2);
    left = data.left;
    top = data.top;
  }
  var scaleX = 1;
  var scaleY = 1;
  if (element2.offsetParent) {
    var transformStyle = getComputedStyle(element2.offsetParent).transform;
    if (transformStyle !== "none") {
      var matrix = new DOMMatrix(transformStyle);
      scaleX = matrix.a;
      scaleY = matrix.d;
    }
  }
  element2.style.top = pos.position.top / scaleY + pos.offsetY - top + "px";
  element2.style.left = pos.position.left / scaleX + pos.offsetX - left + "px";
}
function updateElementData(target, edge, pos, fixedParent2, elementRect2) {
  pos.position = calculatePosition(target, pos.posX, pos.posY, fixedParent2, elementRect2);
  edge.TL = calculatePosition(target, "left", "top", fixedParent2, elementRect2);
  edge.TR = calculatePosition(target, "right", "top", fixedParent2, elementRect2);
  edge.BR = calculatePosition(target, "left", "bottom", fixedParent2, elementRect2);
  edge.BL = calculatePosition(target, "right", "bottom", fixedParent2, elementRect2);
}
function setPosition(eStatus, pos, elementRect2) {
  eStatus.TL = { top: pos.position.top + pos.offsetY, left: pos.position.left + pos.offsetX };
  eStatus.TR = { top: eStatus.TL.top, left: eStatus.TL.left + elementRect2.width };
  eStatus.BL = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left
  };
  eStatus.BR = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left + elementRect2.width
  };
}
function leftCollideCheck(left, right) {
  var leftSide = false, rightSide = false;
  if (left - getBodyScrollLeft2() < ContainerLeft()) {
    leftSide = true;
  }
  if (right > ContainerRight()) {
    rightSide = true;
  }
  return { leftSide, rightSide };
}
function leftFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = leftCollideCheck(edge.TL.left, edge.TR.left);
  if (tEdge.TL.left - getBodyScrollLeft2() <= ContainerLeft()) {
    collideSide.leftSide = false;
  }
  if (tEdge.TR.left > ContainerRight()) {
    collideSide.rightSide = false;
  }
  if (collideSide.leftSide && !collideSide.rightSide || !collideSide.leftSide && collideSide.rightSide) {
    if (pos.posX === "right") {
      pos.posX = "left";
    } else {
      pos.posX = "right";
    }
    pos.offsetX = pos.offsetX + elementRect2.width;
    pos.offsetX = -1 * pos.offsetX;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      leftFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = topCollideCheck(edge.TL.top, edge.BL.top);
  if (tEdge.TL.top - getBodyScrollTop2() <= ContainerTop()) {
    collideSide.topSide = false;
  }
  if (tEdge.BL.top >= ContainerBottom() && target.getBoundingClientRect().bottom < window.innerHeight) {
    collideSide.bottomSide = false;
  }
  if (collideSide.topSide && !collideSide.bottomSide || !collideSide.topSide && collideSide.bottomSide) {
    if (pos.posY === "top") {
      pos.posY = "bottom";
    } else {
      pos.posY = "top";
    }
    pos.offsetY = pos.offsetY + elementRect2.height;
    pos.offsetY = -1 * pos.offsetY;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false, elementRect2);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      topFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topCollideCheck(top, bottom) {
  var topSide = false, bottomSide = false;
  if (top - getBodyScrollTop2() < ContainerTop()) {
    topSide = true;
  }
  if (bottom > ContainerBottom()) {
    bottomSide = true;
  }
  return { topSide, bottomSide };
}
function getTargetContainerWidth() {
  return targetContainer.getBoundingClientRect().width;
}
function getTargetContainerHeight() {
  return targetContainer.getBoundingClientRect().height;
}
function getTargetContainerLeft() {
  return targetContainer.getBoundingClientRect().left;
}
function getTargetContainerTop() {
  return targetContainer.getBoundingClientRect().top;
}
function ContainerTop() {
  if (targetContainer) {
    return getTargetContainerTop();
  }
  return 0;
}
function ContainerLeft() {
  if (targetContainer) {
    return getTargetContainerLeft();
  }
  return 0;
}
function ContainerRight() {
  if (targetContainer) {
    return getBodyScrollLeft2() + getTargetContainerLeft() + getTargetContainerWidth();
  }
  return getBodyScrollLeft2() + getViewPortWidth();
}
function ContainerBottom() {
  if (targetContainer) {
    return getBodyScrollTop2() + getTargetContainerTop() + getTargetContainerHeight();
  }
  return getBodyScrollTop2() + getViewPortHeight();
}
function getBodyScrollTop2() {
  return parentDocument2.documentElement.scrollTop || parentDocument2.body.scrollTop;
}
function getBodyScrollLeft2() {
  return parentDocument2.documentElement.scrollLeft || parentDocument2.body.scrollLeft;
}
function getViewPortHeight() {
  return window.innerHeight;
}
function getViewPortWidth() {
  var windowWidth = window.innerWidth;
  var documentReact = document.documentElement.getBoundingClientRect();
  var offsetWidth = isNullOrUndefined(document.documentElement) ? 0 : documentReact.width;
  return windowWidth - (windowWidth - offsetWidth);
}

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/popup/popup.js
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
var PositionData = (
  /** @class */
  function(_super) {
    __extends(PositionData2, _super);
    function PositionData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate2([
      Property("left")
    ], PositionData2.prototype, "X", void 0);
    __decorate2([
      Property("top")
    ], PositionData2.prototype, "Y", void 0);
    return PositionData2;
  }(ChildProperty)
);
var CLASSNAMES = {
  ROOT: "e-popup",
  RTL: "e-rtl",
  OPEN: "e-popup-open",
  CLOSE: "e-popup-close"
};
var Popup = (
  /** @class */
  function(_super) {
    __extends(Popup2, _super);
    function Popup2(element2, options) {
      return _super.call(this, options, element2) || this;
    }
    Popup2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            break;
          case "zIndex":
            setStyleAttribute(this.element, { "zIndex": newProp.zIndex });
            break;
          case "enableRtl":
            this.setEnableRtl();
            break;
          case "position":
          case "relateTo":
            this.refreshPosition();
            break;
          case "offsetX":
            var x = newProp.offsetX - oldProp.offsetX;
            this.element.style.left = (parseInt(this.element.style.left, 10) + x).toString() + "px";
            break;
          case "offsetY":
            var y = newProp.offsetY - oldProp.offsetY;
            this.element.style.top = (parseInt(this.element.style.top, 10) + y).toString() + "px";
            break;
          case "content":
            this.setContent();
            break;
          case "actionOnScroll":
            if (newProp.actionOnScroll !== "none") {
              this.wireScrollEvents();
            } else {
              this.unwireScrollEvents();
            }
            break;
        }
      }
    };
    Popup2.prototype.getModuleName = function() {
      return "popup";
    };
    Popup2.prototype.resolveCollision = function() {
      this.checkCollision();
    };
    Popup2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Popup2.prototype.destroy = function() {
      if (this.element.classList.contains("e-popup-open")) {
        this.unwireEvents();
      }
      this.element.classList.remove(CLASSNAMES.ROOT, CLASSNAMES.RTL, CLASSNAMES.OPEN, CLASSNAMES.CLOSE);
      this.content = null;
      this.relateTo = null;
      _super.prototype.destroy.call(this);
    };
    Popup2.prototype.render = function() {
      this.element.classList.add(CLASSNAMES.ROOT);
      var styles = {};
      if (this.zIndex !== 1e3) {
        styles.zIndex = this.zIndex;
      }
      if (this.width !== "auto") {
        styles.width = formatUnit(this.width);
      }
      if (this.height !== "auto") {
        styles.height = formatUnit(this.height);
      }
      setStyleAttribute(this.element, styles);
      this.fixedParent = false;
      this.setEnableRtl();
      this.setContent();
    };
    Popup2.prototype.wireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.add(window, "orientationchange", this.orientationOnChange, this);
      }
      if (this.actionOnScroll !== "none") {
        this.wireScrollEvents();
      }
    };
    Popup2.prototype.wireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_1 = _a[_i];
          EventHandler.add(parent_1, "scroll", this.scrollRefresh, this);
        }
      }
    };
    Popup2.prototype.unwireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.remove(window, "orientationchange", this.orientationOnChange);
      }
      if (this.actionOnScroll !== "none") {
        this.unwireScrollEvents();
      }
    };
    Popup2.prototype.unwireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_2 = _a[_i];
          EventHandler.remove(parent_2, "scroll", this.scrollRefresh);
        }
      }
    };
    Popup2.prototype.getRelateToElement = function() {
      var relateToElement = this.relateTo === "" || isNullOrUndefined(this.relateTo) ? document.body : this.relateTo;
      this.setProperties({ relateTo: relateToElement }, true);
      return typeof this.relateTo === "string" ? document.querySelector(this.relateTo) : this.relateTo;
    };
    Popup2.prototype.scrollRefresh = function(e) {
      if (this.actionOnScroll === "reposition") {
        if (!isNullOrUndefined(this.element) && !(this.element.offsetParent === e.target || this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && e.target.parentElement == null)) {
          this.refreshPosition();
        }
      } else if (this.actionOnScroll === "hide") {
        this.hide();
      }
      if (this.actionOnScroll !== "none") {
        if (this.getRelateToElement()) {
          var targetVisible = this.isElementOnViewport(this.getRelateToElement(), e.target);
          if (!targetVisible && !this.targetInvisibleStatus) {
            this.trigger("targetExitViewport");
            this.targetInvisibleStatus = true;
          } else if (targetVisible) {
            this.targetInvisibleStatus = false;
          }
        }
      }
    };
    Popup2.prototype.isElementOnViewport = function(relateToElement, scrollElement) {
      var scrollParents = this.getScrollableParent(relateToElement);
      for (var parent_3 = 0; parent_3 < scrollParents.length; parent_3++) {
        if (this.isElementVisible(relateToElement, scrollParents[parent_3])) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    };
    Popup2.prototype.isElementVisible = function(relateToElement, scrollElement) {
      var rect = this.checkGetBoundingClientRect(relateToElement);
      if (!rect.height || !rect.width) {
        return false;
      }
      if (!isNullOrUndefined(this.checkGetBoundingClientRect(scrollElement))) {
        var parent_4 = scrollElement.getBoundingClientRect();
        return !(rect.bottom < parent_4.top) && (!(rect.bottom > parent_4.bottom) && (!(rect.right > parent_4.right) && !(rect.left < parent_4.left)));
      } else {
        var win = window;
        var windowView = {
          top: win.scrollY,
          left: win.scrollX,
          right: win.scrollX + win.outerWidth,
          bottom: win.scrollY + win.outerHeight
        };
        var off = calculatePosition(relateToElement);
        var ele = {
          top: off.top,
          left: off.left,
          right: off.left + rect.width,
          bottom: off.top + rect.height
        };
        var elementView = {
          top: windowView.bottom - ele.top,
          left: windowView.right - ele.left,
          bottom: ele.bottom - windowView.top,
          right: ele.right - windowView.left
        };
        return elementView.top > 0 && elementView.left > 0 && elementView.right > 0 && elementView.bottom > 0;
      }
    };
    Popup2.prototype.preRender = function() {
    };
    Popup2.prototype.setEnableRtl = function() {
      this.reposition();
      this.enableRtl ? this.element.classList.add(CLASSNAMES.RTL) : this.element.classList.remove(CLASSNAMES.RTL);
    };
    Popup2.prototype.setContent = function() {
      if (!isNullOrUndefined(this.content)) {
        this.element.innerHTML = "";
        if (typeof this.content === "string") {
          this.element.textContent = this.content;
        } else {
          var relateToElem = this.getRelateToElement();
          var props = this.content.props;
          if (!relateToElem.classList.contains("e-dropdown-btn") || isNullOrUndefined(props)) {
            this.element.appendChild(this.content);
          }
        }
      }
    };
    Popup2.prototype.orientationOnChange = function() {
      var _this = this;
      setTimeout(function() {
        _this.refreshPosition();
      }, 200);
    };
    Popup2.prototype.refreshPosition = function(target, collision) {
      if (!isNullOrUndefined(target)) {
        this.checkFixedParent(target);
      }
      this.reposition();
      if (!collision) {
        this.checkCollision();
      }
    };
    Popup2.prototype.reposition = function() {
      var pos;
      var position;
      var relateToElement = this.getRelateToElement();
      if (typeof this.position.X === "number" && typeof this.position.Y === "number") {
        pos = { left: this.position.X, top: this.position.Y };
      } else if (typeof this.position.X === "string" && typeof this.position.Y === "number" || typeof this.position.X === "number" && typeof this.position.Y === "string") {
        var parentDisplay = void 0;
        var display = this.element.style.display;
        this.element.style.display = "block";
        if (this.element.classList.contains("e-dlg-modal")) {
          parentDisplay = this.element.parentElement.style.display;
          this.element.parentElement.style.display = "block";
        }
        position = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY);
        if (typeof this.position.X === "string") {
          pos = { left: position.left, top: this.position.Y };
        } else {
          pos = { left: this.position.X, top: position.top };
        }
        this.element.style.display = display;
        if (this.element.classList.contains("e-dlg-modal")) {
          this.element.parentElement.style.display = parentDisplay;
        }
      } else if (relateToElement) {
        var height = this.element.clientHeight;
        var display = this.element.style.display;
        this.element.style.display = "block";
        pos = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY, height);
        this.element.style.display = display;
      } else {
        pos = { left: 0, top: 0 };
      }
      if (!isNullOrUndefined(pos)) {
        this.element.style.left = pos.left + "px";
        this.element.style.top = pos.top + "px";
      }
    };
    Popup2.prototype.checkGetBoundingClientRect = function(ele) {
      var eleRect;
      try {
        eleRect = ele.getBoundingClientRect();
        return eleRect;
      } catch (error) {
        return null;
      }
    };
    Popup2.prototype.getAnchorPosition = function(anchorEle, ele, position, offsetX, offsetY, height) {
      if (height === void 0) {
        height = 0;
      }
      var eleRect = this.checkGetBoundingClientRect(ele);
      var anchorRect = this.checkGetBoundingClientRect(anchorEle);
      if (isNullOrUndefined(eleRect) || isNullOrUndefined(anchorRect)) {
        return null;
      }
      var anchor = anchorEle;
      var anchorPos = { left: 0, top: 0 };
      if (ele.offsetParent && ele.offsetParent.tagName === "BODY" && anchorEle.tagName === "BODY") {
        anchorPos = calculatePosition(anchorEle);
      } else {
        if (ele.classList.contains("e-dlg-modal") && anchor.tagName !== "BODY") {
          ele = ele.parentElement;
        }
        anchorPos = calculateRelativeBasedPosition(anchor, ele);
      }
      switch (position.X) {
        default:
        case "left":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth / 2 - eleRect.width / 2;
          } else if (this.targetType === "container") {
            anchorPos.left += anchorRect.width / 2 - eleRect.width / 2;
          } else {
            anchorPos.left += anchorRect.width / 2;
          }
          break;
        case "right":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth - eleRect.width;
          } else if (this.targetType === "container") {
            anchorPos.left += anchorRect.width - eleRect.width;
          } else {
            anchorPos.left += anchorRect.width;
          }
          break;
      }
      switch (position.Y) {
        default:
        case "top":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight / 2 - eleRect.height / 2;
          } else if (this.targetType === "container") {
            anchorPos.top += anchorRect.height / 2 - eleRect.height / 2;
          } else {
            anchorPos.top += anchorRect.height / 2;
          }
          break;
        case "bottom":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight - eleRect.height;
          } else if (this.targetType === "container" && !ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - eleRect.height;
          } else if (this.targetType === "container" && ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - height;
          } else {
            anchorPos.top += anchorRect.height;
          }
          break;
      }
      anchorPos.left += offsetX;
      anchorPos.top += offsetY;
      return anchorPos;
    };
    Popup2.prototype.callFlip = function(param) {
      var relateToElement = this.getRelateToElement();
      flip(this.element, relateToElement, this.offsetX, this.offsetY, this.position.X, this.position.Y, this.viewPortElement, param, this.fixedParent);
    };
    Popup2.prototype.callFit = function(param) {
      if (isCollide(this.element, this.viewPortElement).length !== 0) {
        if (isNullOrUndefined(this.viewPortElement)) {
          var data = fit(this.element, this.viewPortElement, param);
          if (param.X) {
            this.element.style.left = data.left + "px";
          }
          if (param.Y) {
            this.element.style.top = data.top + "px";
          }
        } else {
          var elementRect2 = this.checkGetBoundingClientRect(this.element);
          var viewPortRect = this.checkGetBoundingClientRect(this.viewPortElement);
          if (isNullOrUndefined(elementRect2) || isNullOrUndefined(viewPortRect)) {
            return null;
          }
          if (param && param.Y === true) {
            if (viewPortRect.top > elementRect2.top) {
              this.element.style.top = "0px";
            } else if (viewPortRect.bottom < elementRect2.bottom) {
              this.element.style.top = parseInt(this.element.style.top, 10) - (elementRect2.bottom - viewPortRect.bottom) + "px";
            }
          }
          if (param && param.X === true) {
            if (viewPortRect.right < elementRect2.right) {
              this.element.style.left = parseInt(this.element.style.left, 10) - (elementRect2.right - viewPortRect.right) + "px";
            } else if (viewPortRect.left > elementRect2.left) {
              this.element.style.left = parseInt(this.element.style.left, 10) + (viewPortRect.left - elementRect2.left) + "px";
            }
          }
        }
      }
    };
    Popup2.prototype.checkCollision = function() {
      var horz = this.collision.X;
      var vert = this.collision.Y;
      if (horz === "none" && vert === "none") {
        return;
      }
      if (horz === "flip" && vert === "flip") {
        this.callFlip({ X: true, Y: true });
      } else if (horz === "fit" && vert === "fit") {
        this.callFit({ X: true, Y: true });
      } else {
        if (horz === "flip") {
          this.callFlip({ X: true, Y: false });
        } else if (vert === "flip") {
          this.callFlip({ Y: true, X: false });
        }
        if (horz === "fit") {
          this.callFit({ X: true, Y: false });
        } else if (vert === "fit") {
          this.callFit({ X: false, Y: true });
        }
      }
    };
    Popup2.prototype.show = function(animationOptions, relativeElement) {
      var _this = this;
      var relateToElement = this.getRelateToElement();
      if (relateToElement.classList.contains("e-filemanager")) {
        this.fmDialogContainer = this.element.getElementsByClassName("e-file-select-wrap")[0];
      }
      this.wireEvents();
      if (!isNullOrUndefined(this.fmDialogContainer) && Browser.isIos) {
        this.fmDialogContainer.style.display = "block";
      }
      if (this.zIndex === 1e3 || !isNullOrUndefined(relativeElement)) {
        var zIndexElement = isNullOrUndefined(relativeElement) ? this.element : relativeElement;
        this.zIndex = getZindexPartial(zIndexElement);
        setStyleAttribute(this.element, { "zIndex": this.zIndex });
      }
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.showAnimation;
      if (this.collision.X !== "none" || this.collision.Y !== "none") {
        removeClass([this.element], CLASSNAMES.CLOSE);
        addClass([this.element], CLASSNAMES.OPEN);
        this.checkCollision();
        removeClass([this.element], CLASSNAMES.OPEN);
        addClass([this.element], CLASSNAMES.CLOSE);
      }
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.begin = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES.CLOSE);
            addClass([_this.element], CLASSNAMES.OPEN);
          }
        };
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            _this.trigger("open");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES.CLOSE);
        addClass([this.element], CLASSNAMES.OPEN);
        this.trigger("open");
      }
    };
    Popup2.prototype.hide = function(animationOptions) {
      var _this = this;
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.hideAnimation;
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES.OPEN);
            addClass([_this.element], CLASSNAMES.CLOSE);
            _this.trigger("close");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES.OPEN);
        addClass([this.element], CLASSNAMES.CLOSE);
        this.trigger("close");
      }
      this.unwireEvents();
    };
    Popup2.prototype.getScrollableParent = function(element2) {
      this.checkFixedParent(element2);
      return getScrollableParent(element2, this.fixedParent);
    };
    Popup2.prototype.checkFixedParent = function(element2) {
      var parent = element2.parentElement;
      while (parent && parent.tagName !== "HTML") {
        var parentStyle = getComputedStyle(parent);
        if (parentStyle.position === "fixed" && !isNullOrUndefined(this.element) && this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && getComputedStyle(this.element.offsetParent).overflow !== "hidden") {
          this.element.style.top = window.scrollY > parseInt(this.element.style.top, 10) ? formatUnit(window.scrollY - parseInt(this.element.style.top, 10)) : formatUnit(parseInt(this.element.style.top, 10) - window.scrollY);
          this.element.style.position = "fixed";
          this.fixedParent = true;
        }
        parent = parent.parentElement;
        if (!isNullOrUndefined(this.element) && isNullOrUndefined(this.element.offsetParent) && parentStyle.position === "fixed" && this.element.style.position === "fixed") {
          this.fixedParent = true;
        }
      }
    };
    __decorate2([
      Property("auto")
    ], Popup2.prototype, "height", void 0);
    __decorate2([
      Property("auto")
    ], Popup2.prototype, "width", void 0);
    __decorate2([
      Property(null)
    ], Popup2.prototype, "content", void 0);
    __decorate2([
      Property("container")
    ], Popup2.prototype, "targetType", void 0);
    __decorate2([
      Property(null)
    ], Popup2.prototype, "viewPortElement", void 0);
    __decorate2([
      Property({ X: "none", Y: "none" })
    ], Popup2.prototype, "collision", void 0);
    __decorate2([
      Property("")
    ], Popup2.prototype, "relateTo", void 0);
    __decorate2([
      Complex({}, PositionData)
    ], Popup2.prototype, "position", void 0);
    __decorate2([
      Property(0)
    ], Popup2.prototype, "offsetX", void 0);
    __decorate2([
      Property(0)
    ], Popup2.prototype, "offsetY", void 0);
    __decorate2([
      Property(1e3)
    ], Popup2.prototype, "zIndex", void 0);
    __decorate2([
      Property(false)
    ], Popup2.prototype, "enableRtl", void 0);
    __decorate2([
      Property("reposition")
    ], Popup2.prototype, "actionOnScroll", void 0);
    __decorate2([
      Property(null)
    ], Popup2.prototype, "showAnimation", void 0);
    __decorate2([
      Property(null)
    ], Popup2.prototype, "hideAnimation", void 0);
    __decorate2([
      Event()
    ], Popup2.prototype, "open", void 0);
    __decorate2([
      Event()
    ], Popup2.prototype, "close", void 0);
    __decorate2([
      Event()
    ], Popup2.prototype, "targetExitViewport", void 0);
    Popup2 = __decorate2([
      NotifyPropertyChanges
    ], Popup2);
    return Popup2;
  }(Component2)
);
function getScrollableParent(element2, fixedParent2) {
  var eleStyle = getComputedStyle(element2);
  var scrollParents = [];
  var overflowRegex = /(auto|scroll)/;
  var parent = element2.parentElement;
  while (parent && parent.tagName !== "HTML") {
    var parentStyle = getComputedStyle(parent);
    if (!(eleStyle.position === "absolute" && parentStyle.position === "static") && overflowRegex.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
      scrollParents.push(parent);
    }
    parent = parent.parentElement;
  }
  if (!fixedParent2) {
    scrollParents.push(document);
  }
  return scrollParents;
}
function getZindexPartial(element2) {
  var parent = element2.parentElement;
  var parentZindex = [];
  while (parent) {
    if (parent.tagName !== "BODY") {
      var index = document.defaultView.getComputedStyle(parent, null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(parent, null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        parentZindex.push(index);
      }
      parent = parent.parentElement;
    } else {
      break;
    }
  }
  var childrenZindex = [];
  for (var i = 0; i < document.body.children.length; i++) {
    if (!element2.isEqualNode(document.body.children[i])) {
      var index = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        childrenZindex.push(index);
      }
    }
  }
  childrenZindex.push("999");
  var siblingsZindex = [];
  if (!isNullOrUndefined(element2.parentElement) && element2.parentElement.tagName !== "BODY") {
    var childNodes = [].slice.call(element2.parentElement.children);
    for (var i = 0; i < childNodes.length; i++) {
      if (!element2.isEqualNode(childNodes[i])) {
        var index = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("z-index");
        var position = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("position");
        if (index !== "auto" && position !== "static") {
          siblingsZindex.push(index);
        }
      }
    }
  }
  var finalValue = parentZindex.concat(childrenZindex, siblingsZindex);
  var currentZindexValue = Math.max.apply(Math, finalValue) + 1;
  return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}
function getMaxZindex(tagName) {
  if (tagName === void 0) {
    tagName = ["*"];
  }
  var maxZindex = [];
  for (var i = 0; i < tagName.length; i++) {
    var elements = document.getElementsByTagName(tagName[i]);
    for (var i_1 = 0; i_1 < elements.length; i_1++) {
      var index = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        maxZindex.push(index);
      }
    }
  }
  var currentZindexValue = Math.max.apply(Math, maxZindex) + 1;
  return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/common/common.js
function wrapperInitialize(createElement2, tag, type, element2, WRAPPER4, role) {
  var input2 = element2;
  if (element2.tagName === tag) {
    var ejInstance = getValue("ej2_instances", element2);
    input2 = createElement2("input", { attrs: { "type": type } });
    var props = ["change", "cssClass", "label", "labelPosition", "id"];
    for (var index = 0, len = element2.attributes.length; index < len; index++) {
      if (props.indexOf(element2.attributes[index].nodeName) === -1) {
        input2.setAttribute(element2.attributes[index].nodeName, element2.attributes[index].nodeValue);
      }
    }
    attributes(element2, { "class": WRAPPER4 });
    element2.appendChild(input2);
    setValue("ej2_instances", ejInstance, input2);
    deleteObject(element2, "ej2_instances");
  }
  return input2;
}
function getTextNode(element2) {
  var node;
  var childnode = element2.childNodes;
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
function preRender(proxy2, control, wrapper, element2, moduleName) {
  element2 = wrapperInitialize(proxy2.createElement, control, "checkbox", element2, wrapper, moduleName);
  proxy2.element = element2;
  if (proxy2.element.getAttribute("type") !== "checkbox") {
    proxy2.element.setAttribute("type", "checkbox");
  }
  if (!proxy2.element.id) {
    proxy2.element.id = getUniqueID("e-" + moduleName);
  }
}
function rippleMouseHandler(e, rippleSpan) {
  if (rippleSpan) {
    var event_1 = document.createEvent("MouseEvents");
    event_1.initEvent(e.type, false, true);
    rippleSpan.dispatchEvent(event_1);
  }
}
function setHiddenInput(proxy2, wrap) {
  if (proxy2.element.getAttribute("ejs-for")) {
    wrap.appendChild(proxy2.createElement("input", {
      attrs: { "name": proxy2.name || proxy2.element.name, "value": "false", "type": "hidden" }
    }));
  }
}

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/button/button.js
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
    __extends2(Button2, _super);
    function Button2(options, element2) {
      return _super.call(this, options, element2) || this;
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
      var classList2 = [
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
        classList2 = classList2.concat(this.cssClass.split(" "));
      }
      _super.prototype.destroy.call(this);
      removeClass([this.element], classList2);
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
    __decorate3([
      Property("Left")
    ], Button2.prototype, "iconPosition", void 0);
    __decorate3([
      Property("")
    ], Button2.prototype, "iconCss", void 0);
    __decorate3([
      Property(false)
    ], Button2.prototype, "disabled", void 0);
    __decorate3([
      Property(false)
    ], Button2.prototype, "isPrimary", void 0);
    __decorate3([
      Property("")
    ], Button2.prototype, "cssClass", void 0);
    __decorate3([
      Property("")
    ], Button2.prototype, "content", void 0);
    __decorate3([
      Property(false)
    ], Button2.prototype, "isToggle", void 0);
    __decorate3([
      Property()
    ], Button2.prototype, "locale", void 0);
    __decorate3([
      Property(false)
    ], Button2.prototype, "enableHtmlSanitizer", void 0);
    __decorate3([
      Event()
    ], Button2.prototype, "created", void 0);
    Button2 = __decorate3([
      NotifyPropertyChanges
    ], Button2);
    return Button2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/check-box/check-box.js
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
    __extends3(CheckBox2, _super);
    function CheckBox2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
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
      var element2 = this.element;
      this.tagName = this.element.tagName;
      element2 = wrapperInitialize(this.createElement, "EJS-CHECKBOX", "checkbox", element2, WRAPPER, "checkbox");
      this.element = element2;
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
    __decorate4([
      Event()
    ], CheckBox2.prototype, "change", void 0);
    __decorate4([
      Event()
    ], CheckBox2.prototype, "created", void 0);
    __decorate4([
      Property(false)
    ], CheckBox2.prototype, "checked", void 0);
    __decorate4([
      Property("")
    ], CheckBox2.prototype, "cssClass", void 0);
    __decorate4([
      Property(false)
    ], CheckBox2.prototype, "disabled", void 0);
    __decorate4([
      Property(false)
    ], CheckBox2.prototype, "indeterminate", void 0);
    __decorate4([
      Property("")
    ], CheckBox2.prototype, "label", void 0);
    __decorate4([
      Property("After")
    ], CheckBox2.prototype, "labelPosition", void 0);
    __decorate4([
      Property("")
    ], CheckBox2.prototype, "name", void 0);
    __decorate4([
      Property("")
    ], CheckBox2.prototype, "value", void 0);
    __decorate4([
      Property(false)
    ], CheckBox2.prototype, "enableHtmlSanitizer", void 0);
    __decorate4([
      Property({})
    ], CheckBox2.prototype, "htmlAttributes", void 0);
    CheckBox2 = __decorate4([
      NotifyPropertyChanges
    ], CheckBox2);
    return CheckBox2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/radio-button/radio-button.js
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
var LABEL2 = "e-label";
var RIPPLE2 = "e-ripple-container";
var RTL2 = "e-rtl";
var WRAPPER2 = "e-radio-wrapper";
var ATTRIBUTES = ["title", "class", "style", "disabled", "readonly", "name", "value"];
var RadioButton = (
  /** @class */
  function(_super) {
    __extends4(RadioButton2, _super);
    function RadioButton2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
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
      var element2 = this.element;
      this.formElement = closest(this.element, "form");
      this.tagName = this.element.tagName;
      element2 = wrapperInitialize(this.createElement, "EJS-RADIOBUTTON", "radio", element2, WRAPPER2, "radio");
      this.element = element2;
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
    __decorate5([
      Event()
    ], RadioButton2.prototype, "change", void 0);
    __decorate5([
      Event()
    ], RadioButton2.prototype, "created", void 0);
    __decorate5([
      Property(false)
    ], RadioButton2.prototype, "checked", void 0);
    __decorate5([
      Property("")
    ], RadioButton2.prototype, "cssClass", void 0);
    __decorate5([
      Property(false)
    ], RadioButton2.prototype, "disabled", void 0);
    __decorate5([
      Property("")
    ], RadioButton2.prototype, "label", void 0);
    __decorate5([
      Property("After")
    ], RadioButton2.prototype, "labelPosition", void 0);
    __decorate5([
      Property("")
    ], RadioButton2.prototype, "name", void 0);
    __decorate5([
      Property("")
    ], RadioButton2.prototype, "value", void 0);
    __decorate5([
      Property(false)
    ], RadioButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate5([
      Property({})
    ], RadioButton2.prototype, "htmlAttributes", void 0);
    RadioButton2 = RadioButton_1 = __decorate5([
      NotifyPropertyChanges
    ], RadioButton2);
    return RadioButton2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/switch/switch.js
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
    __extends5(Switch2, _super);
    function Switch2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
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
      var element2 = this.element;
      this.formElement = closest(this.element, "form");
      this.tagName = this.element.tagName;
      preRender(this, "EJS-SWITCH", WRAPPER3, element2, this.getModuleName());
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
    __decorate6([
      Event()
    ], Switch2.prototype, "change", void 0);
    __decorate6([
      Event()
    ], Switch2.prototype, "created", void 0);
    __decorate6([
      Property(false)
    ], Switch2.prototype, "checked", void 0);
    __decorate6([
      Property("")
    ], Switch2.prototype, "cssClass", void 0);
    __decorate6([
      Property(false)
    ], Switch2.prototype, "disabled", void 0);
    __decorate6([
      Property("")
    ], Switch2.prototype, "name", void 0);
    __decorate6([
      Property("")
    ], Switch2.prototype, "onLabel", void 0);
    __decorate6([
      Property("")
    ], Switch2.prototype, "offLabel", void 0);
    __decorate6([
      Property("")
    ], Switch2.prototype, "value", void 0);
    __decorate6([
      Property({})
    ], Switch2.prototype, "htmlAttributes", void 0);
    Switch2 = __decorate6([
      NotifyPropertyChanges
    ], Switch2);
    return Switch2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/chips/chip-list.js
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
    __extends6(ChipList2, _super);
    function ChipList2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
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
        chipElements_1.forEach(function(element2) {
          var chips = _this.element.querySelectorAll("." + classNames.chip);
          var index = Array.prototype.slice.call(chips).indexOf(element2);
          _this.deleteHandler(element2, index);
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
    ChipList2.prototype.removeMultipleAttributes = function(attributes2, element2) {
      attributes2.forEach(function(attr) {
        element2.removeAttribute(attr);
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
    __decorate7([
      Property([])
    ], ChipList2.prototype, "chips", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "text", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "avatarText", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "avatarIconCss", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "htmlAttributes", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "leadingIconCss", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "trailingIconCss", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "leadingIconUrl", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "trailingIconUrl", void 0);
    __decorate7([
      Property("")
    ], ChipList2.prototype, "cssClass", void 0);
    __decorate7([
      Property(true)
    ], ChipList2.prototype, "enabled", void 0);
    __decorate7([
      Property([])
    ], ChipList2.prototype, "selectedChips", void 0);
    __decorate7([
      Property("None")
    ], ChipList2.prototype, "selection", void 0);
    __decorate7([
      Property(false)
    ], ChipList2.prototype, "enableDelete", void 0);
    __decorate7([
      Event()
    ], ChipList2.prototype, "created", void 0);
    __decorate7([
      Event()
    ], ChipList2.prototype, "click", void 0);
    __decorate7([
      Event()
    ], ChipList2.prototype, "beforeClick", void 0);
    __decorate7([
      Event()
    ], ChipList2.prototype, "delete", void 0);
    __decorate7([
      Event()
    ], ChipList2.prototype, "deleted", void 0);
    ChipList2 = __decorate7([
      NotifyPropertyChanges
    ], ChipList2);
    return ChipList2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/chips/chip.js
var Chip = (
  /** @class */
  function() {
    function Chip2() {
    }
    return Chip2;
  }()
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/floating-action-button/floating-action-button.js
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
    __extends7(Fab2, _super);
    function Fab2(options, element2) {
      return _super.call(this, options, element2) || this;
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
    __decorate8([
      Property("BottomRight")
    ], Fab2.prototype, "position", void 0);
    __decorate8([
      Property("")
    ], Fab2.prototype, "target", void 0);
    __decorate8([
      Property(true)
    ], Fab2.prototype, "visible", void 0);
    __decorate8([
      Property(true)
    ], Fab2.prototype, "isPrimary", void 0);
    Fab2 = __decorate8([
      NotifyPropertyChanges
    ], Fab2);
    return Fab2;
  }(Button)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-buttons/src/speed-dial/speed-dial.js
var __extends8 = function() {
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
var __decorate9 = function(decorators, target, key, desc) {
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
    __extends8(SpeedDialAnimationSettings2, _super);
    function SpeedDialAnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate9([
      Property("Fade")
    ], SpeedDialAnimationSettings2.prototype, "effect", void 0);
    __decorate9([
      Property(400)
    ], SpeedDialAnimationSettings2.prototype, "duration", void 0);
    __decorate9([
      Property(0)
    ], SpeedDialAnimationSettings2.prototype, "delay", void 0);
    return SpeedDialAnimationSettings2;
  }(ChildProperty)
);
var RadialSettings = (
  /** @class */
  function(_super) {
    __extends8(RadialSettings2, _super);
    function RadialSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate9([
      Property("Auto")
    ], RadialSettings2.prototype, "direction", void 0);
    __decorate9([
      Property(-1)
    ], RadialSettings2.prototype, "endAngle", void 0);
    __decorate9([
      Property("100px")
    ], RadialSettings2.prototype, "offset", void 0);
    __decorate9([
      Property(-1)
    ], RadialSettings2.prototype, "startAngle", void 0);
    return RadialSettings2;
  }(ChildProperty)
);
var SpeedDialItem = (
  /** @class */
  function(_super) {
    __extends8(SpeedDialItem2, _super);
    function SpeedDialItem2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate9([
      Property("")
    ], SpeedDialItem2.prototype, "iconCss", void 0);
    __decorate9([
      Property("")
    ], SpeedDialItem2.prototype, "id", void 0);
    __decorate9([
      Property("")
    ], SpeedDialItem2.prototype, "text", void 0);
    __decorate9([
      Property("")
    ], SpeedDialItem2.prototype, "title", void 0);
    __decorate9([
      Property(false)
    ], SpeedDialItem2.prototype, "disabled", void 0);
    return SpeedDialItem2;
  }(ChildProperty)
);
var SpeedDial = (
  /** @class */
  function(_super) {
    __extends8(SpeedDial2, _super);
    function SpeedDial2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
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
            ele.forEach(function(element2) {
              element2.classList.add(SDHIDDEN);
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
            ele.forEach(function(element2) {
              element2.classList.remove(SDHIDDEN);
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
      liList.forEach(function(element2) {
        remove(element2);
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
    __decorate9([
      Complex({}, SpeedDialAnimationSettings)
    ], SpeedDial2.prototype, "animation", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "content", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "closeIconCss", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "cssClass", void 0);
    __decorate9([
      Property("Auto")
    ], SpeedDial2.prototype, "direction", void 0);
    __decorate9([
      Property(false)
    ], SpeedDial2.prototype, "disabled", void 0);
    __decorate9([
      Property("Left")
    ], SpeedDial2.prototype, "iconPosition", void 0);
    __decorate9([
      Collection([], SpeedDialItem)
    ], SpeedDial2.prototype, "items", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "itemTemplate", void 0);
    __decorate9([
      Property("Linear")
    ], SpeedDial2.prototype, "mode", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "openIconCss", void 0);
    __decorate9([
      Property(false)
    ], SpeedDial2.prototype, "opensOnHover", void 0);
    __decorate9([
      Property("BottomRight")
    ], SpeedDial2.prototype, "position", void 0);
    __decorate9([
      Property(false)
    ], SpeedDial2.prototype, "modal", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "popupTemplate", void 0);
    __decorate9([
      Complex({}, RadialSettings)
    ], SpeedDial2.prototype, "radialSettings", void 0);
    __decorate9([
      Property("")
    ], SpeedDial2.prototype, "target", void 0);
    __decorate9([
      Property(true)
    ], SpeedDial2.prototype, "visible", void 0);
    __decorate9([
      Property(true)
    ], SpeedDial2.prototype, "isPrimary", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "beforeClose", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "beforeItemRender", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "beforeOpen", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "created", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "clicked", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "onClose", void 0);
    __decorate9([
      Event()
    ], SpeedDial2.prototype, "onOpen", void 0);
    SpeedDial2 = __decorate9([
      NotifyPropertyChanges
    ], SpeedDial2);
    return SpeedDial2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/common/resize.js
var elementClass = ["north-west", "north", "north-east", "west", "east", "south-west", "south", "south-east"];
var RESIZE_HANDLER = "e-resize-handle";
var FOCUSED_HANDLER = "e-focused-handle";
var DIALOG_RESIZABLE = "e-dlg-resizable";
var RESTRICT_LEFT = ["e-restrict-left"];
var RESIZE_WITHIN_VIEWPORT = "e-resize-viewport";
var dialogBorderResize = ["north", "west", "east", "south"];
var targetElement;
var selectedHandler;
var originalWidth = 0;
var originalHeight = 0;
var originalX = 0;
var originalY = 0;
var originalMouseX = 0;
var originalMouseY = 0;
var minHeight;
var maxHeight;
var minWidth;
var maxWidth;
var containerElement;
var resizeStart = null;
var resize = null;
var resizeEnd = null;
var resizeWestWidth;
var setLeft = true;
var previousWidth = 0;
var setWidth = true;
var proxy;
function createResize(args) {
  resizeStart = args.resizeBegin;
  resize = args.resizing;
  resizeEnd = args.resizeComplete;
  targetElement = getDOMElement(args.element);
  containerElement = getDOMElement(args.boundary);
  var directions = args.direction.split(" ");
  for (var i = 0; i < directions.length; i++) {
    if (dialogBorderResize.indexOf(directions[i]) >= 0 && directions[i]) {
      setBorderResizeElm(directions[i]);
    } else if (directions[i].trim() !== "") {
      var resizeHandler = createElement("div", { className: "e-icons " + RESIZE_HANDLER + " e-" + directions[i] });
      targetElement.appendChild(resizeHandler);
    }
  }
  minHeight = args.minHeight;
  minWidth = args.minWidth;
  maxWidth = args.maxWidth;
  maxHeight = args.maxHeight;
  if (args.proxy && args.proxy.element && args.proxy.element.classList.contains("e-dialog")) {
    wireEvents(args.proxy);
  } else {
    wireEvents();
  }
}
function setBorderResizeElm(direction) {
  calculateValues();
  var borderBottom = createElement("span", {
    attrs: {
      "unselectable": "on",
      "contenteditable": "false"
    }
  });
  borderBottom.setAttribute("class", "e-dialog-border-resize e-" + direction);
  if (direction === "south") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.bottom = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "north") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.top = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "east") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.right = "0px";
    borderBottom.style.top = "0px";
  }
  if (direction === "west") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.left = "0px";
    borderBottom.style.top = "0px";
  }
  targetElement.appendChild(borderBottom);
}
function getDOMElement(element2) {
  var domElement;
  if (!isNullOrUndefined(element2)) {
    if (typeof element2 === "string") {
      domElement = document.querySelector(element2);
    } else {
      domElement = element2;
    }
  }
  return domElement;
}
function wireEvents(args) {
  if (isNullOrUndefined(args)) {
    args = this;
  }
  var resizers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < resizers.length; i++) {
    selectedHandler = resizers[i];
    EventHandler.add(selectedHandler, "mousedown", onMouseDown, args);
    var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
    EventHandler.add(selectedHandler, eventName, onTouchStart, args);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      selectedHandler = borderResizers[i];
      EventHandler.add(selectedHandler, "mousedown", onMouseDown, args);
      var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
      EventHandler.add(selectedHandler, eventName, onTouchStart, args);
    }
  }
}
function getEventType(e) {
  return e.indexOf("mouse") > -1 ? "mouse" : "touch";
}
function onMouseDown(e) {
  e.preventDefault();
  targetElement = e.target.parentElement;
  calculateValues();
  originalMouseX = e.pageX;
  originalMouseY = e.pageY;
  e.target.classList.add(FOCUSED_HANDLER);
  if (!isNullOrUndefined(resizeStart)) {
    proxy = this;
    if (resizeStart(e, proxy) === true) {
      return;
    }
  }
  if (this.targetEle && targetElement && targetElement.querySelector("." + DIALOG_RESIZABLE)) {
    containerElement = this.target === "body" ? null : this.targetEle;
    maxWidth = this.targetEle.clientWidth;
    maxHeight = this.targetEle.clientHeight;
  }
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, "mousemove", onMouseMove, this);
  EventHandler.add(document, "mouseup", onMouseUp, this);
  for (var i = 0; i < RESTRICT_LEFT.length; i++) {
    if (targetElement.classList.contains(RESTRICT_LEFT[i])) {
      setLeft = false;
    } else {
      setLeft = true;
    }
  }
}
function onMouseUp(e) {
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
  EventHandler.remove(target, "mousemove", onMouseMove);
  EventHandler.remove(target, touchMoveEvent, onMouseMove);
  EventHandler.remove(target, eventName, onMouseMove);
  if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    document.body.querySelector("." + FOCUSED_HANDLER).classList.remove(FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(resizeEnd)) {
    proxy = this;
    resizeEnd(e, proxy);
  }
  EventHandler.remove(document, "mouseup", onMouseUp);
  EventHandler.remove(document, touchEndEvent, onMouseUp);
}
function calculateValues() {
  originalWidth = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("width").replace("px", ""));
  originalHeight = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("height").replace("px", ""));
  originalX = targetElement.getBoundingClientRect().left;
  originalY = targetElement.getBoundingClientRect().top;
}
function onTouchStart(e) {
  targetElement = e.target.parentElement;
  calculateValues();
  var dialogResizeElement = targetElement.classList.contains("e-dialog");
  if ((e.target.classList.contains(RESIZE_HANDLER) || e.target.classList.contains("e-dialog-border-resize")) && dialogResizeElement) {
    e.target.classList.add(FOCUSED_HANDLER);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  originalMouseX = coordinates.pageX;
  originalMouseY = coordinates.pageY;
  if (!isNullOrUndefined(resizeStart)) {
    proxy = this;
    if (resizeStart(e, proxy) === true) {
      return;
    }
  }
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, touchMoveEvent, onMouseMove, this);
  EventHandler.add(document, touchEndEvent, onMouseUp, this);
}
function onMouseMove(e) {
  if (e.target.classList.contains(RESIZE_HANDLER) && e.target.classList.contains(FOCUSED_HANDLER)) {
    selectedHandler = e.target;
  } else if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    selectedHandler = document.body.querySelector("." + FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(selectedHandler)) {
    var resizeTowards = "";
    for (var i = 0; i < elementClass.length; i++) {
      if (selectedHandler.classList.contains("e-" + elementClass[i])) {
        resizeTowards = elementClass[i];
      }
    }
    if (!isNullOrUndefined(resize)) {
      proxy = this;
      resize(e, proxy);
    }
    switch (resizeTowards) {
      case "south":
        resizeSouth(e);
        break;
      case "north":
        resizeNorth(e);
        break;
      case "west":
        resizeWest(e);
        break;
      case "east":
        resizeEast(e);
        break;
      case "south-east":
        resizeSouth(e);
        resizeEast(e);
        break;
      case "south-west":
        resizeSouth(e);
        resizeWest(e);
        break;
      case "north-east":
        resizeNorth(e);
        resizeEast(e);
        break;
      case "north-west":
        resizeNorth(e);
        resizeWest(e);
        break;
      default:
        break;
    }
  }
}
function getClientRectValues(element2) {
  return element2.getBoundingClientRect();
}
function resizeSouth(e) {
  var documentHeight = document.documentElement.clientHeight;
  var calculateValue = false;
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var currentpageY = coordinates.pageY;
  var targetRectValues = getClientRectValues(targetElement);
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && (documentHeight - currentpageY >= 0 || targetRectValues.top < 0)) {
    calculateValue = true;
  }
  var calculatedHeight = originalHeight + (currentpageY - originalMouseY);
  calculatedHeight = calculatedHeight > minHeight ? calculatedHeight : minHeight;
  var containerTop = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerTop = containerRectValues.top;
  }
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetHeight - containerElement.clientHeight;
  var topWithoutborder = targetRectValues.top - containerTop - borderValue / 2;
  topWithoutborder = topWithoutborder < 0 ? 0 : topWithoutborder;
  if (targetRectValues.top > 0 && topWithoutborder + calculatedHeight > maxHeight) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.height = maxHeight - parseInt(topWithoutborder.toString(), 10) + "px";
    return;
  }
  var targetTop = 0;
  if (calculateValue) {
    if (targetRectValues.top < 0 && documentHeight + (targetRectValues.height + targetRectValues.top) > 0) {
      targetTop = targetRectValues.top;
      if (calculatedHeight + targetTop <= 30) {
        calculatedHeight = targetRectValues.height - (targetRectValues.height + targetRectValues.top) + 30;
      }
    }
    if (calculatedHeight + targetRectValues.top >= maxHeight) {
      targetElement.style.height = targetRectValues.height + (documentHeight - (targetRectValues.height + targetRectValues.top)) + "px";
    }
    var calculatedTop = isNullOrUndefined(containerElement) ? targetTop : topWithoutborder;
    if (calculatedHeight >= minHeight && calculatedHeight + calculatedTop <= maxHeight) {
      targetElement.style.height = calculatedHeight + "px";
    }
  }
}
function resizeNorth(e) {
  var calculateValue = false;
  var boundaryRectValues;
  var pageY = getEventType(e.type) === "mouse" ? e.pageY : e.touches[0].pageY;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement)) {
    boundaryRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement) && targetRectValues.top - boundaryRectValues.top > 0) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageY > 0) {
    calculateValue = true;
  }
  var currentHeight = originalHeight - (pageY - originalMouseY);
  if (calculateValue) {
    if (currentHeight >= minHeight && currentHeight <= maxHeight) {
      var containerTop = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerTop = boundaryRectValues.top;
      }
      var top_1 = originalY - containerTop + (pageY - originalMouseY);
      top_1 = top_1 > 0 ? top_1 : 1;
      targetElement.style.height = currentHeight + "px";
      targetElement.style.top = top_1 + "px";
    }
  }
}
function resizeWest(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var rectValues;
  if (!isNullOrUndefined(containerElement)) {
    rectValues = getClientRectValues(containerElement);
  }
  var pageX = getEventType(e.type) === "mouse" ? e.pageX : e.touches[0].pageX;
  var targetRectValues = getClientRectValues(targetElement);
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetWidth - containerElement.clientWidth;
  var left = isNullOrUndefined(containerElement) ? 0 : rectValues.left;
  var containerWidth = isNullOrUndefined(containerElement) ? 0 : rectValues.width;
  if (isNullOrUndefined(resizeWestWidth)) {
    if (!isNullOrUndefined(containerElement)) {
      resizeWestWidth = targetRectValues.left - left - borderValue / 2 + targetRectValues.width;
      resizeWestWidth = resizeWestWidth + (containerWidth - borderValue - resizeWestWidth);
    } else {
      resizeWestWidth = documentWidth;
    }
  }
  if (!isNullOrUndefined(containerElement) && Math.floor(targetRectValues.left - rectValues.left + targetRectValues.width + (rectValues.right - targetRectValues.right)) - borderValue <= maxWidth) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageX >= 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth - (pageX - originalMouseX);
  if (setLeft) {
    calculatedWidth = calculatedWidth > resizeWestWidth ? resizeWestWidth : calculatedWidth;
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      var containerLeft = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerLeft = rectValues.left;
      }
      var left_1 = originalX - containerLeft + (pageX - originalMouseX);
      left_1 = left_1 > 0 ? left_1 : 1;
      if (calculatedWidth !== previousWidth && setWidth) {
        targetElement.style.width = calculatedWidth + "px";
      }
      if (setLeft) {
        targetElement.style.left = left_1 + "px";
        if (left_1 === 1) {
          setWidth = false;
        } else {
          setWidth = true;
        }
      }
    }
  }
  previousWidth = calculatedWidth;
}
function resizeEast(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var pageX = coordinates.pageX;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement) && (targetRectValues.left - containerRectValues.left + targetRectValues.width <= maxWidth || targetRectValues.right - containerRectValues.left >= targetRectValues.width)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && documentWidth - pageX > 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth + (pageX - originalMouseX);
  var containerLeft = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerLeft = containerRectValues.left;
  }
  if (targetRectValues.left - containerLeft + calculatedWidth > maxWidth) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.width = maxWidth - (targetRectValues.left - containerLeft) + "px";
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      targetElement.style.width = calculatedWidth + "px";
    }
  }
}
function setMinHeight(minimumHeight) {
  minHeight = minimumHeight;
}
function setMaxWidth(value) {
  maxWidth = value;
}
function setMaxHeight(value) {
  maxHeight = value;
}
function removeResize() {
  var handlers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < handlers.length; i++) {
    detach(handlers[i]);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      detach(borderResizers[i]);
    }
  }
}

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/dialog/dialog.js
var __extends9 = function() {
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
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ButtonProps = (
  /** @class */
  function(_super) {
    __extends9(ButtonProps2, _super);
    function ButtonProps2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate10([
      Property(true)
    ], ButtonProps2.prototype, "isFlat", void 0);
    __decorate10([
      Property()
    ], ButtonProps2.prototype, "buttonModel", void 0);
    __decorate10([
      Property("Button")
    ], ButtonProps2.prototype, "type", void 0);
    __decorate10([
      Event()
    ], ButtonProps2.prototype, "click", void 0);
    return ButtonProps2;
  }(ChildProperty)
);
var AnimationSettings = (
  /** @class */
  function(_super) {
    __extends9(AnimationSettings2, _super);
    function AnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate10([
      Property("Fade")
    ], AnimationSettings2.prototype, "effect", void 0);
    __decorate10([
      Property(400)
    ], AnimationSettings2.prototype, "duration", void 0);
    __decorate10([
      Property(0)
    ], AnimationSettings2.prototype, "delay", void 0);
    return AnimationSettings2;
  }(ChildProperty)
);
var ROOT = "e-dialog";
var RTL4 = "e-rtl";
var DLG_HEADER_CONTENT = "e-dlg-header-content";
var DLG_HEADER = "e-dlg-header";
var DLG_FOOTER_CONTENT = "e-footer-content";
var MODAL_DLG = "e-dlg-modal";
var DLG_CONTENT = "e-dlg-content";
var DLG_CLOSE_ICON = "e-icon-dlg-close";
var DLG_OVERLAY = "e-dlg-overlay";
var DLG_TARGET = "e-dlg-target";
var DLG_CONTAINER = "e-dlg-container";
var SCROLL_DISABLED = "e-scroll-disabled";
var DLG_PRIMARY_BUTTON = "e-primary";
var ICON = "e-icons";
var POPUP_ROOT = "e-popup";
var DEVICE = "e-device";
var FULLSCREEN = "e-dlg-fullscreen";
var DLG_CLOSE_ICON_BTN = "e-dlg-closeicon-btn";
var DLG_HIDE = "e-popup-close";
var DLG_SHOW = "e-popup-open";
var DLG_UTIL_DEFAULT_TITLE = "Information";
var DLG_UTIL_ROOT = "e-scroll-disabled";
var DLG_UTIL_ALERT = "e-alert-dialog";
var DLG_UTIL_CONFIRM = "e-confirm-dialog";
var DLG_RESIZABLE = "e-dlg-resizable";
var DLG_RESTRICT_LEFT_VALUE = "e-restrict-left";
var DLG_RESTRICT_WIDTH_VALUE = "e-resize-viewport";
var DLG_REF_ELEMENT = "e-dlg-ref-element";
var DLG_USER_ACTION_CLOSED = "user action";
var DLG_CLOSE_ICON_CLOSED = "close icon";
var DLG_ESCAPE_CLOSED = "escape";
var DLG_OVERLAYCLICK_CLOSED = "overlayClick";
var DLG_DRAG = "e-draggable";
var Dialog = (
  /** @class */
  function(_super) {
    __extends9(Dialog2, _super);
    function Dialog2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.needsID = true;
      return _this;
    }
    Dialog2.prototype.render = function() {
      this.initialize();
      this.initRender();
      this.wireEvents();
      if (this.width === "100%") {
        this.element.style.width = "";
      }
      if (this.minHeight !== "") {
        this.element.style.minHeight = formatUnit(this.minHeight);
      }
      if (this.enableResize) {
        this.setResize();
        if (this.animationSettings.effect === "None") {
          this.getMinHeight();
        }
      }
      this.renderComplete();
    };
    Dialog2.prototype.initializeValue = function() {
      this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
    };
    Dialog2.prototype.preRender = function() {
      var _this = this;
      this.initializeValue();
      this.headerContent = null;
      this.allowMaxHeight = true;
      this.preventVisibility = true;
      this.clonedEle = this.element.cloneNode(true);
      this.closeIconClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_CLOSE_ICON_CLOSED;
        _this.hide(event);
      };
      this.dlgOverlayClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_OVERLAYCLICK_CLOSED;
        event.preventFocus = false;
        _this.trigger("overlayClick", event, function(overlayClickEventArgs) {
          if (!overlayClickEventArgs.preventFocus) {
            _this.focusContent();
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      };
      var localeText = { close: "Close" };
      this.l10n = new L10n("dialog", localeText, this.locale);
      this.checkPositionData();
      if (isNullOrUndefined(this.target)) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.target = document.body;
        this.isProtectedOnChange = prevOnChange;
      }
    };
    Dialog2.prototype.updatePersistData = function() {
      if (this.enablePersistence) {
        this.setProperties({
          width: parseFloat(this.element.style.width),
          height: parseFloat(this.element.style.height),
          position: { X: parseFloat(this.dragObj.element.style.left), Y: parseFloat(this.dragObj.element.style.top) }
        }, true);
      }
    };
    Dialog2.prototype.isNumberValue = function(value) {
      var isNumber = /^[-+]?\d*\.?\d+$/.test(value);
      return isNumber;
    };
    Dialog2.prototype.checkPositionData = function() {
      if (!isNullOrUndefined(this.position)) {
        if (!isNullOrUndefined(this.position.X) && typeof this.position.X !== "number") {
          var isNumber = this.isNumberValue(this.position.X);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.X = parseFloat(this.position.X);
            this.isProtectedOnChange = prevOnChange;
          }
        }
        if (!isNullOrUndefined(this.position.Y) && typeof this.position.Y !== "number") {
          var isNumber = this.isNumberValue(this.position.Y);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.Y = parseFloat(this.position.Y);
            this.isProtectedOnChange = prevOnChange;
          }
        }
      }
    };
    Dialog2.prototype.getEle = function(list, selector) {
      var element2 = void 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].classList.contains(selector)) {
          element2 = list[i];
          break;
        }
      }
      return element2;
    };
    Dialog2.prototype.getMinHeight = function() {
      var computedHeaderHeight = "0px";
      var computedFooterHeight = "0px";
      if (!isNullOrUndefined(this.element.querySelector("." + DLG_HEADER_CONTENT))) {
        computedHeaderHeight = getComputedStyle(this.headerContent).height;
      }
      var footerEle = this.getEle(this.element.children, DLG_FOOTER_CONTENT);
      if (!isNullOrUndefined(footerEle)) {
        computedFooterHeight = getComputedStyle(footerEle).height;
      }
      var headerHeight = parseInt(computedHeaderHeight.slice(0, computedHeaderHeight.indexOf("p")), 10);
      var footerHeight = parseInt(computedFooterHeight.slice(0, computedFooterHeight.indexOf("p")), 10);
      setMinHeight(headerHeight + 30 + (isNaN(footerHeight) ? 0 : footerHeight));
      return headerHeight + 30 + footerHeight;
    };
    Dialog2.prototype.onResizeStart = function(args, dialogObj) {
      dialogObj.trigger("resizeStart", args);
      return args.cancel;
    };
    Dialog2.prototype.onResizing = function(args, dialogObj) {
      dialogObj.trigger("resizing", args);
    };
    Dialog2.prototype.onResizeComplete = function(args, dialogObj) {
      dialogObj.trigger("resizeStop", args);
      this.updatePersistData();
    };
    Dialog2.prototype.setResize = function() {
      if (this.enableResize) {
        if (this.isBlazorServerRender() && !isNullOrUndefined(this.element.querySelector(".e-icons.e-resize-handle"))) {
          return;
        }
        this.element.classList.add(DLG_RESIZABLE);
        var computedHeight = getComputedStyle(this.element).minHeight;
        var computedWidth = getComputedStyle(this.element).minWidth;
        var direction = "";
        for (var i = 0; i < this.resizeHandles.length; i++) {
          if (this.resizeHandles[i] === "All") {
            direction = "south north east west north-east north-west south-east south-west";
            break;
          } else {
            var directionValue = "";
            switch (this.resizeHandles[i].toString()) {
              case "SouthEast":
                directionValue = "south-east";
                break;
              case "SouthWest":
                directionValue = "south-west";
                break;
              case "NorthEast":
                directionValue = "north-east";
                break;
              case "NorthWest":
                directionValue = "north-west";
                break;
              default:
                directionValue = this.resizeHandles[i].toString();
                break;
            }
            direction += directionValue.toLocaleLowerCase() + " ";
          }
        }
        if (this.enableRtl && direction.trim() === "south-east") {
          direction = "south-west";
        } else if (this.enableRtl && direction.trim() === "south-west") {
          direction = "south-east";
        }
        if (this.isModal && this.enableRtl) {
          this.element.classList.add(DLG_RESTRICT_LEFT_VALUE);
        } else if (this.isModal && this.target === document.body) {
          this.element.classList.add(DLG_RESTRICT_WIDTH_VALUE);
        }
        createResize({
          element: this.element,
          direction,
          minHeight: parseInt(computedHeight.slice(0, computedWidth.indexOf("p")), 10),
          maxHeight: this.targetEle.clientHeight,
          minWidth: parseInt(computedWidth.slice(0, computedWidth.indexOf("p")), 10),
          maxWidth: this.targetEle.clientWidth,
          boundary: this.target === document.body ? null : this.targetEle,
          resizeBegin: this.onResizeStart.bind(this),
          resizeComplete: this.onResizeComplete.bind(this),
          resizing: this.onResizing.bind(this),
          proxy: this
        });
        this.wireWindowResizeEvent();
      } else {
        removeResize();
        this.unWireWindowResizeEvent();
        if (this.isModal) {
          this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
        } else {
          this.element.classList.remove(DLG_RESTRICT_WIDTH_VALUE);
        }
        this.element.classList.remove(DLG_RESIZABLE);
      }
    };
    Dialog2.prototype.getFocusElement = function(target) {
      var value = 'input,select,textarea,button:enabled,a,[contenteditable="true"],[tabindex]';
      var items = target.querySelectorAll(value);
      return { element: items[items.length - 1] };
    };
    Dialog2.prototype.keyDown = function(event) {
      var _this = this;
      if (event.keyCode === 9) {
        if (this.isModal) {
          var buttonObj = void 0;
          if (!isNullOrUndefined(this.btnObj)) {
            buttonObj = this.btnObj[this.btnObj.length - 1];
          }
          if (isNullOrUndefined(this.btnObj) && !isNullOrUndefined(this.ftrTemplateContent)) {
            buttonObj = this.getFocusElement(this.ftrTemplateContent);
          }
          if (isNullOrUndefined(this.btnObj) && isNullOrUndefined(this.ftrTemplateContent) && !isNullOrUndefined(this.contentEle)) {
            buttonObj = this.getFocusElement(this.contentEle);
          }
          if (!isNullOrUndefined(buttonObj) && document.activeElement === buttonObj.element && !event.shiftKey) {
            event.preventDefault();
            this.focusableElements(this.element).focus();
          }
          if (document.activeElement === this.focusableElements(this.element) && event.shiftKey) {
            event.preventDefault();
            if (!isNullOrUndefined(buttonObj)) {
              buttonObj.element.focus();
            }
          }
        }
      }
      var element2 = document.activeElement;
      var isTagName = ["input", "textarea"].indexOf(element2.tagName.toLowerCase()) > -1;
      var isContentEdit = false;
      if (!isTagName) {
        isContentEdit = element2.hasAttribute("contenteditable") && element2.getAttribute("contenteditable") === "true";
      }
      if (event.keyCode === 27 && this.closeOnEscape) {
        this.dlgClosedBy = DLG_ESCAPE_CLOSED;
        var query = document.querySelector(".e-popup-open:not(.e-dialog)");
        if (!(!isNullOrUndefined(query) && !query.classList.contains("e-toolbar-pop"))) {
          this.hide(event);
        }
      }
      if (event.keyCode === 13 && !event.ctrlKey && element2.tagName.toLowerCase() !== "textarea" && isTagName && !isNullOrUndefined(this.primaryButtonEle) || event.keyCode === 13 && event.ctrlKey && (element2.tagName.toLowerCase() === "textarea" || isContentEdit) && !isNullOrUndefined(this.primaryButtonEle)) {
        var buttonIndex_1;
        var firstPrimary = this.buttons.some(function(data, index) {
          buttonIndex_1 = index;
          var buttonModel = data.buttonModel;
          return !isNullOrUndefined(buttonModel) && buttonModel.isPrimary === true;
        });
        if (firstPrimary && typeof this.buttons[buttonIndex_1].click === "function") {
          setTimeout(function() {
            _this.buttons[buttonIndex_1].click.call(_this, event);
          });
        }
      }
    };
    Dialog2.prototype.initialize = function() {
      if (!isNullOrUndefined(this.target)) {
        this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      }
      if (!this.isBlazorServerRender()) {
        addClass([this.element], ROOT);
      }
      if (Browser.isDevice) {
        addClass([this.element], DEVICE);
      }
      if (!this.isBlazorServerRender()) {
        this.setCSSClass();
      }
      this.setMaxHeight();
    };
    Dialog2.prototype.initRender = function() {
      var _this = this;
      this.initialRender = true;
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { role: "dialog" });
      }
      if (this.zIndex === 1e3) {
        this.setzIndex(this.element, false);
        this.calculatezIndex = true;
      } else {
        this.calculatezIndex = false;
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.element.getElementsByClassName("e-dlg-header-content")[0];
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.contentEle)) {
        this.contentEle = this.element.querySelector("#" + this.element.id + "_dialog-content");
      }
      if (!this.isBlazorServerRender()) {
        this.setTargetContent();
        if (this.header !== "" && !isNullOrUndefined(this.header)) {
          this.setHeader();
        }
        this.renderCloseIcon();
        this.setContent();
        if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
          this.setFooterTemplate();
        } else if (!isNullOrUndefined(this.buttons[0].buttonModel)) {
          this.setButton();
        }
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.buttons[0].buttonModel) && this.footerTemplate === "") {
          this.setButton();
        }
      }
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { "aria-modal": this.isModal ? "true" : "false" });
        if (this.isModal) {
          this.setIsModal();
        }
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.dlgContainer)) {
        this.dlgContainer = this.element.parentElement;
        for (var i = 0, childNodes = this.dlgContainer.children; i < childNodes.length; i++) {
          if (childNodes[i].classList.contains("e-dlg-overlay")) {
            this.dlgOverlay = childNodes[i];
          }
        }
      }
      if (this.element.classList.contains(DLG_UTIL_ALERT) !== true && this.element.classList.contains(DLG_UTIL_CONFIRM) !== true && !isNullOrUndefined(this.element.parentElement)) {
        var parentEle = this.isModal ? this.dlgContainer.parentElement : this.element.parentElement;
        this.refElement = this.createElement("div", { className: DLG_REF_ELEMENT });
        parentEle.insertBefore(this.refElement, this.isModal ? this.dlgContainer : this.element);
      }
      if (!isNullOrUndefined(this.targetEle)) {
        this.isModal ? this.targetEle.appendChild(this.dlgContainer) : this.targetEle.appendChild(this.element);
      }
      this.popupObj = new Popup(this.element, {
        height: this.height,
        width: this.width,
        zIndex: this.zIndex,
        relateTo: this.target,
        actionOnScroll: "none",
        enableRtl: this.enableRtl,
        // eslint-disable-next-line
        open: function(event) {
          var eventArgs = {
            container: _this.isModal ? _this.dlgContainer : _this.element,
            element: _this.element,
            target: _this.target,
            preventFocus: false
          };
          if (_this.enableResize) {
            _this.resetResizeIcon();
          }
          _this.trigger("open", eventArgs, function(openEventArgs) {
            if (!openEventArgs.preventFocus) {
              _this.focusContent();
            }
          });
        },
        // eslint-disable-next-line
        close: function(event) {
          if (_this.isModal) {
            addClass([_this.dlgOverlay], "e-fade");
          }
          _this.unBindEvent(_this.element);
          if (_this.isModal) {
            _this.dlgContainer.style.display = "none";
          }
          _this.trigger("close", _this.closeArgs);
          var activeEle = document.activeElement;
          if (!isNullOrUndefined(activeEle) && !isNullOrUndefined(activeEle.blur)) {
            activeEle.blur();
          }
          if (!isNullOrUndefined(_this.storeActiveElement) && !isNullOrUndefined(_this.storeActiveElement.focus)) {
            _this.storeActiveElement.focus();
          }
        }
      });
      this.positionChange();
      this.setEnableRTL();
      if (!this.isBlazorServerRender()) {
        addClass([this.element], DLG_HIDE);
        if (this.isModal) {
          this.setOverlayZindex();
        }
      }
      if (this.visible) {
        this.show();
        if (this.isModal) {
          var targetType = this.getTargetContainer(this.target);
          if (targetType instanceof Element) {
            var computedStyle = window.getComputedStyle(targetType);
            if (computedStyle.getPropertyValue("direction") === "rtl") {
              this.setPopupPosition();
            }
          }
        }
      } else {
        if (this.isModal) {
          this.dlgOverlay.style.display = "none";
        }
      }
      this.initialRender = false;
    };
    Dialog2.prototype.getTargetContainer = function(targetValue) {
      var targetElement2 = null;
      if (typeof targetValue === "string") {
        if (targetValue.startsWith("#")) {
          targetElement2 = document.getElementById(targetValue.substring(1));
        } else if (targetValue.startsWith(".")) {
          var elements = document.getElementsByClassName(targetValue.substring(1));
          targetElement2 = elements.length > 0 ? elements[0] : null;
        } else {
          if (!(targetValue instanceof HTMLElement) && targetValue !== document.body) {
            targetElement2 = document.querySelector(targetValue);
          }
        }
      } else if (targetValue instanceof HTMLElement) {
        targetElement2 = targetValue;
      }
      return targetElement2;
    };
    Dialog2.prototype.resetResizeIcon = function() {
      var dialogConHeight = this.getMinHeight();
      if (this.targetEle.offsetHeight < dialogConHeight) {
        var className = this.enableRtl ? "e-south-west" : "e-south-east";
        var resizeIcon = this.element.querySelector("." + className);
        if (!isNullOrUndefined(resizeIcon)) {
          resizeIcon.style.bottom = "-" + dialogConHeight.toString() + "px";
        }
      }
    };
    Dialog2.prototype.setOverlayZindex = function(zIndexValue) {
      var zIndex;
      if (isNullOrUndefined(zIndexValue)) {
        zIndex = parseInt(this.element.style.zIndex, 10) ? parseInt(this.element.style.zIndex, 10) : this.zIndex;
      } else {
        zIndex = zIndexValue;
      }
      this.dlgOverlay.style.zIndex = (zIndex - 1).toString();
      this.dlgContainer.style.zIndex = zIndex.toString();
    };
    Dialog2.prototype.positionChange = function() {
      if (this.isModal) {
        if (!isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else if (!isNaN(parseFloat(this.position.X)) && isNaN(parseFloat(this.position.Y)) || isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else {
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          this.dlgContainer.classList.add("e-dlg-" + this.position.X + "-" + this.position.Y);
        }
      } else {
        this.setPopupPosition();
      }
    };
    Dialog2.prototype.setPopupPosition = function() {
      this.popupObj.setProperties({
        position: {
          X: this.position.X,
          Y: this.position.Y
        }
      });
    };
    Dialog2.prototype.setAllowDragging = function() {
      var _this = this;
      var handleContent = "." + DLG_HEADER_CONTENT;
      if (!this.element.classList.contains(DLG_DRAG)) {
        this.dragObj = new Draggable(this.element, {
          clone: false,
          isDragScroll: true,
          abort: ".e-dlg-closeicon-btn",
          handle: handleContent,
          dragStart: function(event) {
            _this.trigger("dragStart", event, function(dragEventArgs) {
              if (isBlazor()) {
                dragEventArgs.bindEvents(event.dragElement);
              }
            });
          },
          dragStop: function(event) {
            if (_this.isModal) {
              if (!isNullOrUndefined(_this.position)) {
                _this.dlgContainer.classList.remove("e-dlg-" + _this.position.X + "-" + _this.position.Y);
              }
              var targetType = _this.getTargetContainer(_this.target);
              if (targetType instanceof Element) {
                var computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue("direction") === "rtl") {
                  _this.element.style.position = "absolute";
                } else {
                  _this.element.style.position = "relative";
                }
              } else {
                _this.element.style.position = "relative";
              }
            }
            _this.trigger("dragStop", event);
            _this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            _this.updatePersistData();
          },
          drag: function(event) {
            _this.trigger("drag", event);
          }
        });
        if (!isNullOrUndefined(this.targetEle)) {
          this.dragObj.dragArea = this.targetEle;
        }
      }
    };
    Dialog2.prototype.setButton = function() {
      if (!this.isBlazorServerRender()) {
        this.buttonContent = [];
        this.btnObj = [];
        var primaryBtnFlag = true;
        for (var i = 0; i < this.buttons.length; i++) {
          var buttonType = !isNullOrUndefined(this.buttons[i].type) ? this.buttons[i].type.toLowerCase() : "button";
          var btn = this.createElement("button", { className: this.cssClass, attrs: { type: buttonType } });
          this.buttonContent.push(btn.outerHTML);
        }
        this.setFooterTemplate();
      }
      var footerBtn;
      for (var i = 0, childNodes = this.element.children; i < childNodes.length; i++) {
        if (childNodes[i].classList.contains(DLG_FOOTER_CONTENT)) {
          footerBtn = childNodes[i].querySelectorAll("button");
        }
      }
      for (var i = 0; i < this.buttons.length; i++) {
        if (!this.isBlazorServerRender()) {
          this.btnObj[i] = new Button(this.buttons[i].buttonModel);
        }
        if (this.isBlazorServerRender()) {
          this.ftrTemplateContent = this.element.querySelector("." + DLG_FOOTER_CONTENT);
        }
        if (!isNullOrUndefined(this.ftrTemplateContent) && footerBtn.length > 0) {
          if (typeof this.buttons[i].click === "function") {
            EventHandler.add(footerBtn[i], "click", this.buttons[i].click, this);
          }
          if (typeof this.buttons[i].click === "object") {
            EventHandler.add(footerBtn[i], "click", this.buttonClickHandler.bind(this, i), this);
          }
        }
        if (!this.isBlazorServerRender() && !isNullOrUndefined(this.ftrTemplateContent)) {
          this.btnObj[i].appendTo(this.ftrTemplateContent.children[i]);
          if (this.buttons[i].isFlat) {
            this.btnObj[i].element.classList.add("e-flat");
          }
          this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
        }
      }
    };
    Dialog2.prototype.buttonClickHandler = function(index) {
      this.trigger("buttons[" + index + "].click", {});
    };
    Dialog2.prototype.setContent = function() {
      this.contentEle = this.createElement("div", { className: DLG_CONTENT, id: this.element.id + "_dialog-content" });
      if (this.innerContentElement) {
        this.contentEle.appendChild(this.innerContentElement);
      } else if (!isNullOrUndefined(this.content) && this.content !== "" || !this.initialRender) {
        var blazorContain = Object.keys(window);
        if (typeof this.content === "string" && !isBlazor()) {
          this.setTemplate(this.content, this.contentEle, "content");
        } else if (this.content instanceof HTMLElement) {
          this.contentEle.appendChild(this.content);
        } else {
          this.setTemplate(this.content, this.contentEle, "content");
        }
      }
      if (!isNullOrUndefined(this.headerContent)) {
        this.element.insertBefore(this.contentEle, this.element.children[1]);
      } else {
        this.element.insertBefore(this.contentEle, this.element.children[0]);
      }
      if (this.height === "auto") {
        if (!this.isBlazorServerRender() && Browser.isIE && this.element.style.width === "" && !isNullOrUndefined(this.width)) {
          this.element.style.width = formatUnit(this.width);
        }
        this.setMaxHeight();
      }
    };
    Dialog2.prototype.setTemplate = function(template, toElement, prop) {
      var templateFn;
      var templateProps;
      var blazorContain = Object.keys(window);
      if (toElement.classList.contains(DLG_HEADER)) {
        templateProps = this.element.id + "header";
      } else if (toElement.classList.contains(DLG_FOOTER_CONTENT)) {
        templateProps = this.element.id + "footerTemplate";
      } else {
        templateProps = this.element.id + "content";
      }
      var templateValue;
      if (!isNullOrUndefined(template.outerHTML)) {
        toElement.appendChild(template);
      } else if (typeof template === "string" || typeof template !== "string" || isBlazor() && !this.isStringTemplate) {
        if (typeof template === "string") {
          template = this.sanitizeHelper(template);
        }
        if (this.isVue || typeof template !== "string") {
          templateFn = compile(template);
          templateValue = template;
        } else {
          toElement.innerHTML = template;
        }
      }
      var fromElements = [];
      if (!isNullOrUndefined(templateFn)) {
        var isString = isBlazor() && !this.isStringTemplate && templateValue.indexOf("<div>Blazor") === 0 ? this.isStringTemplate : true;
        for (var _i = 0, _a = templateFn({}, this, prop, templateProps, isString); _i < _a.length; _i++) {
          var item = _a[_i];
          fromElements.push(item);
        }
        append([].slice.call(fromElements), toElement);
      }
    };
    Dialog2.prototype.sanitizeHelper = function(value) {
      if (this.enableHtmlSanitizer) {
        var dialogItem = SanitizeHtmlHelper.beforeSanitize();
        var beforeEvent = {
          cancel: false,
          helper: null
        };
        extend(dialogItem, dialogItem, beforeEvent);
        this.trigger("beforeSanitizeHtml", dialogItem);
        if (dialogItem.cancel && !isNullOrUndefined(dialogItem.helper)) {
          value = dialogItem.helper(value);
        } else if (!dialogItem.cancel) {
          value = SanitizeHtmlHelper.serializeValue(dialogItem, value);
        }
      }
      return value;
    };
    Dialog2.prototype.setMaxHeight = function() {
      if (!this.allowMaxHeight) {
        return;
      }
      var display = this.element.style.display;
      this.element.style.display = "none";
      this.element.style.maxHeight = !isNullOrUndefined(this.target) && this.targetEle.offsetHeight < window.innerHeight ? this.targetEle.offsetHeight - 20 + "px" : window.innerHeight - 20 + "px";
      this.element.style.display = display;
      if (Browser.isIE && this.height === "auto" && !isNullOrUndefined(this.contentEle) && this.element.offsetHeight < this.contentEle.offsetHeight) {
        this.element.style.height = "inherit";
      }
    };
    Dialog2.prototype.setEnableRTL = function() {
      if (!this.isBlazorServerRender()) {
        this.enableRtl ? addClass([this.element], RTL4) : removeClass([this.element], RTL4);
      }
      if (!isNullOrUndefined(this.element.querySelector(".e-resize-handle"))) {
        removeResize();
        this.setResize();
      }
    };
    Dialog2.prototype.setTargetContent = function() {
      var _this = this;
      if (isNullOrUndefined(this.content) || this.content === "") {
        var isContent = this.element.innerHTML.replace(/\s|<(\/?|\/?)(!--!--)>/g, "") !== "";
        if (this.element.children.length > 0 || isContent) {
          this.innerContentElement = document.createDocumentFragment();
          [].slice.call(this.element.childNodes).forEach(function(el) {
            if (el.nodeType !== 8) {
              _this.innerContentElement.appendChild(el);
            }
          });
        }
      }
    };
    Dialog2.prototype.setHeader = function() {
      if (this.headerEle) {
        this.headerEle.innerHTML = "";
      } else {
        this.headerEle = this.createElement("div", { id: this.element.id + "_title", className: DLG_HEADER });
      }
      this.createHeaderContent();
      this.headerContent.appendChild(this.headerEle);
      this.setTemplate(this.header, this.headerEle, "header");
      attributes(this.element, { "aria-labelledby": this.element.id + "_title" });
      this.element.insertBefore(this.headerContent, this.element.children[0]);
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
    };
    Dialog2.prototype.setFooterTemplate = function() {
      if (this.ftrTemplateContent) {
        this.ftrTemplateContent.innerHTML = "";
      } else {
        this.ftrTemplateContent = this.createElement("div", {
          className: DLG_FOOTER_CONTENT
        });
      }
      if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
        this.setTemplate(this.footerTemplate, this.ftrTemplateContent, "footerTemplate");
      } else {
        this.ftrTemplateContent.innerHTML = this.buttonContent.join("");
      }
      this.element.appendChild(this.ftrTemplateContent);
    };
    Dialog2.prototype.createHeaderContent = function() {
      if (isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.createElement("div", { id: this.element.id + "_dialog-header", className: DLG_HEADER_CONTENT });
      }
    };
    Dialog2.prototype.renderCloseIcon = function() {
      if (this.showCloseIcon) {
        this.closeIcon = this.createElement("button", { className: DLG_CLOSE_ICON_BTN, attrs: { type: "button" } });
        this.closeIconBtnObj = new Button({ cssClass: "e-flat", iconCss: DLG_CLOSE_ICON + " " + ICON });
        this.closeIconTitle();
        if (!isNullOrUndefined(this.headerContent)) {
          prepend([this.closeIcon], this.headerContent);
        } else {
          this.createHeaderContent();
          prepend([this.closeIcon], this.headerContent);
          this.element.insertBefore(this.headerContent, this.element.children[0]);
        }
        this.closeIconBtnObj.appendTo(this.closeIcon);
      }
    };
    Dialog2.prototype.closeIconTitle = function() {
      this.l10n.setLocale(this.locale);
      var closeIconTitle = this.l10n.getConstant("close");
      this.closeIcon.setAttribute("title", closeIconTitle);
      this.closeIcon.setAttribute("aria-label", closeIconTitle);
    };
    Dialog2.prototype.setCSSClass = function(oldCSSClass) {
      if (oldCSSClass) {
        removeClass([this.element], oldCSSClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          removeClass([this.dlgContainer], oldCSSClass.split(" "));
        }
      }
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          addClass([this.dlgContainer], this.cssClass.split(" "));
        }
      }
    };
    Dialog2.prototype.setIsModal = function() {
      this.dlgContainer = this.createElement("div", { className: DLG_CONTAINER });
      this.setCSSClass();
      this.element.classList.remove(DLG_SHOW);
      this.element.parentNode.insertBefore(this.dlgContainer, this.element);
      this.dlgContainer.appendChild(this.element);
      addClass([this.element], MODAL_DLG);
      this.dlgOverlay = this.createElement("div", { className: DLG_OVERLAY });
      this.dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
      this.dlgContainer.appendChild(this.dlgOverlay);
    };
    Dialog2.prototype.getValidFocusNode = function(items) {
      var node;
      for (var u = 0; u < items.length; u++) {
        node = items[u];
        if ((node.clientHeight > 0 || node.tagName.toLowerCase() === "a" && node.hasAttribute("href")) && node.tabIndex > -1 && !node.disabled && !this.disableElement(node, '[disabled],[aria-disabled="true"],[type="hidden"]')) {
          return node;
        } else {
          node = null;
        }
      }
      return node;
    };
    Dialog2.prototype.focusableElements = function(content) {
      if (!isNullOrUndefined(content)) {
        var value = 'input,select,textarea,button,a,[contenteditable="true"],[tabindex]';
        var items = content.querySelectorAll(value);
        return this.getValidFocusNode(items);
      }
      return null;
    };
    Dialog2.prototype.getAutoFocusNode = function(container) {
      var node = container.querySelector("." + DLG_CLOSE_ICON_BTN);
      var value = "[autofocus]";
      var items = container.querySelectorAll(value);
      var validNode = this.getValidFocusNode(items);
      if (isBlazor()) {
        this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
      }
      if (!isNullOrUndefined(validNode)) {
        node = validNode;
      } else {
        validNode = this.focusableElements(this.contentEle);
        if (!isNullOrUndefined(validNode)) {
          return node = validNode;
        } else if (!isNullOrUndefined(this.primaryButtonEle)) {
          return this.element.querySelector("." + DLG_PRIMARY_BUTTON);
        }
      }
      return node;
    };
    Dialog2.prototype.disableElement = function(element2, t) {
      var elementMatch = element2 ? element2.matches || element2.webkitMatchesSelector || element2.msGetRegionContent : null;
      if (elementMatch) {
        for (; element2; element2 = element2.parentNode) {
          if (element2 instanceof Element && elementMatch.call(element2, t)) {
            return element2;
          }
        }
      }
      return null;
    };
    Dialog2.prototype.focusContent = function() {
      var element2 = this.getAutoFocusNode(this.element);
      var node = !isNullOrUndefined(element2) ? element2 : this.element;
      var userAgent = Browser.userAgent;
      if (userAgent.indexOf("MSIE ") > 0 || userAgent.indexOf("Trident/") > 0) {
        this.element.focus();
      }
      node.focus();
      this.unBindEvent(this.element);
      this.bindEvent(this.element);
    };
    Dialog2.prototype.bindEvent = function(element2) {
      EventHandler.add(element2, "keydown", this.keyDown, this);
    };
    Dialog2.prototype.unBindEvent = function(element2) {
      EventHandler.remove(element2, "keydown", this.keyDown);
    };
    Dialog2.prototype.updateSanitizeContent = function() {
      if (!this.isBlazorServerRender()) {
        this.contentEle.innerHTML = this.sanitizeHelper(this.content);
      }
    };
    Dialog2.prototype.isBlazorServerRender = function() {
      return isBlazor() && this.isServerRendered;
    };
    Dialog2.prototype.getModuleName = function() {
      return "dialog";
    };
    Dialog2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            if (!isNullOrUndefined(this.content) && this.content !== "") {
              if (this.isBlazorServerRender()) {
                this.contentEle = this.element.querySelector(".e-dlg-content");
              }
              if (!isNullOrUndefined(this.contentEle) && this.contentEle.getAttribute("role") !== "dialog") {
                if (!this.isBlazorServerRender()) {
                  this.contentEle.innerHTML = "";
                }
                if (typeof this.content === "function") {
                  this.clearTemplate(["content"]);
                  detach(this.contentEle);
                  this.contentEle = null;
                  this.setContent();
                } else {
                  typeof this.content === "string" ? this.isBlazorServerRender() && this.contentEle.innerText === "" ? this.contentEle.insertAdjacentHTML("beforeend", this.sanitizeHelper(this.content)) : this.updateSanitizeContent() : this.contentEle.appendChild(this.content);
                }
                this.setMaxHeight();
              } else {
                if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-content"))) {
                  this.setContent();
                }
              }
            } else if (!isNullOrUndefined(this.contentEle)) {
              detach(this.contentEle);
              this.contentEle = null;
            }
            break;
          case "header":
            if (this.header === "" || isNullOrUndefined(this.header)) {
              if (this.headerEle) {
                detach(this.headerEle);
                this.headerEle = null;
              }
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-header-content"))) {
                this.setHeader();
              }
            }
            break;
          case "footerTemplate":
            if (this.footerTemplate === "" || isNullOrUndefined(this.footerTemplate)) {
              if (!this.ftrTemplateContent) {
                return;
              }
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
              this.buttons = [{}];
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-footer-content"))) {
                this.setFooterTemplate();
              }
              this.buttons = [{}];
            }
            break;
          case "showCloseIcon":
            if (this.element.getElementsByClassName(DLG_CLOSE_ICON).length > 0) {
              if (!this.showCloseIcon && (this.header === "" || isNullOrUndefined(this.header))) {
                detach(this.headerContent);
                this.headerContent = null;
              } else if (!this.showCloseIcon) {
                detach(this.closeIcon);
              } else {
                if (this.isBlazorServerRender()) {
                  this.wireEvents();
                }
              }
            } else {
              if (!this.isBlazorServerRender()) {
                this.renderCloseIcon();
              }
              this.wireEvents();
            }
            break;
          case "locale":
            if (this.showCloseIcon) {
              this.closeIconTitle();
            }
            break;
          case "visible":
            this.visible ? this.show() : this.hide();
            break;
          case "isModal":
            this.updateIsModal();
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            this.updatePersistData();
            break;
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            this.updatePersistData();
            break;
          case "zIndex":
            this.popupObj.zIndex = this.zIndex;
            if (this.isModal) {
              this.setOverlayZindex(this.zIndex);
            }
            if (this.element.style.zIndex !== this.zIndex.toString()) {
              this.calculatezIndex = false;
            }
            break;
          case "cssClass":
            this.setCSSClass(oldProp.cssClass);
            break;
          case "buttons": {
            var buttonCount = this.buttons.length;
            if (!isNullOrUndefined(this.ftrTemplateContent) && !this.isBlazorServerRender()) {
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
            }
            for (var i = 0; i < buttonCount; i++) {
              if (!isNullOrUndefined(this.buttons[i].buttonModel)) {
                this.footerTemplate = "";
                this.setButton();
              }
            }
            break;
          }
          case "allowDragging":
            if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
              this.setAllowDragging();
            } else {
              this.dragObj.destroy();
            }
            break;
          case "target":
            this.setTarget(newProp.target);
            break;
          case "position":
            this.checkPositionData();
            if (this.isModal) {
              var positionX = !isNullOrUndefined(oldProp.position) && !isNullOrUndefined(oldProp.position.X) ? oldProp.position.X : this.position.X;
              var positionY = !isNullOrUndefined(oldProp.position) && !isNullOrUndefined(oldProp.position.Y) ? oldProp.position.Y : this.position.Y;
              if (this.dlgContainer.classList.contains("e-dlg-" + positionX + "-" + positionY)) {
                this.dlgContainer.classList.remove("e-dlg-" + positionX + "-" + positionY);
              }
            }
            this.positionChange();
            this.updatePersistData();
            break;
          case "enableRtl":
            this.setEnableRTL();
            break;
          case "enableResize":
            this.setResize();
            break;
          case "minHeight":
            if (this.minHeight !== "") {
              this.element.style.minHeight = formatUnit(this.minHeight);
            }
            break;
        }
      }
    };
    Dialog2.prototype.setTarget = function(target) {
      this.popupObj.relateTo = target;
      this.target = target;
      this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      if (this.dragObj) {
        this.dragObj.dragArea = this.targetEle;
      }
      this.setMaxHeight();
      if (this.isModal) {
        this.updateIsModal();
      }
      if (this.enableResize) {
        this.setResize();
      }
    };
    Dialog2.prototype.updateIsModal = function() {
      this.element.setAttribute("aria-modal", this.isModal ? "true" : "false");
      if (this.isModal) {
        if (isNullOrUndefined(this.dlgOverlay)) {
          this.setIsModal();
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          if (!isNullOrUndefined(this.targetEle)) {
            this.targetEle.appendChild(this.dlgContainer);
          }
        }
      } else {
        removeClass([this.element], MODAL_DLG);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        detach(this.dlgOverlay);
        while (this.dlgContainer.firstChild) {
          this.dlgContainer.parentElement.insertBefore(this.dlgContainer.firstChild, this.dlgContainer);
        }
        this.dlgContainer.parentElement.removeChild(this.dlgContainer);
      }
      if (this.visible) {
        this.show();
      }
      this.positionChange();
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.setzIndex = function(zIndexElement, setPopupZindex) {
      var prevOnChange = this.isProtectedOnChange;
      this.isProtectedOnChange = true;
      var currentzIndex = getZindexPartial(zIndexElement);
      this.zIndex = currentzIndex > this.zIndex ? currentzIndex : this.zIndex;
      this.isProtectedOnChange = prevOnChange;
      if (setPopupZindex) {
        this.popupObj.zIndex = this.zIndex;
      }
    };
    Dialog2.prototype.windowResizeHandler = function() {
      setMaxWidth(this.targetEle.clientWidth);
      setMaxHeight(this.targetEle.clientHeight);
      this.setMaxHeight();
    };
    Dialog2.prototype.getPersistData = function() {
      return this.addOnPersist(["width", "height", "position"]);
    };
    Dialog2.prototype.destroy = function() {
      if (this.isDestroyed) {
        return;
      }
      var classArray = [RTL4, MODAL_DLG, DLG_RESIZABLE, DLG_RESTRICT_LEFT_VALUE, FULLSCREEN, DEVICE];
      var attrs = ["role", "aria-modal", "aria-labelledby", "aria-describedby", "aria-grabbed", "tabindex", "style"];
      removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
      if (!isNullOrUndefined(this.element) && this.element.classList.contains(FULLSCREEN)) {
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
      }
      if (this.isModal) {
        removeClass([!isNullOrUndefined(this.targetEle) ? this.targetEle : document.body], SCROLL_DISABLED);
      }
      this.unWireEvents();
      if (!isNullOrUndefined(this.btnObj)) {
        for (var i = 0; i < this.btnObj.length; i++) {
          this.btnObj[i].destroy();
        }
      }
      if (!isNullOrUndefined(this.closeIconBtnObj)) {
        this.closeIconBtnObj.destroy();
      }
      if (!isNullOrUndefined(this.dragObj)) {
        this.dragObj.destroy();
      }
      if (!isNullOrUndefined(this.popupObj.element) && this.popupObj.element.classList.contains(POPUP_ROOT)) {
        this.popupObj.destroy();
      }
      removeClass([this.element], classArray);
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        removeClass([this.element], this.cssClass.split(" "));
      }
      if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
        this.refElement.parentElement.insertBefore(this.isModal ? this.dlgContainer : this.element, this.refElement);
        detach(this.refElement);
        this.refElement = void 0;
      }
      if (this.isModal && !this.isBlazorServerRender()) {
        detach(this.dlgOverlay);
        this.dlgContainer.parentNode.insertBefore(this.element, this.dlgContainer);
        detach(this.dlgContainer);
      }
      if (!this.isBlazorServerRender()) {
        this.element.innerHTML = this.clonedEle.innerHTML;
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.element.children)) {
          for (var i = 0; i <= this.element.children.length; i++) {
            i = i - i;
            detach(this.element.children[i]);
          }
        }
      }
      for (var i = 0; i < attrs.length; i++) {
        this.element.removeAttribute(attrs[i]);
      }
      this.ftrTemplateContent = null;
      this.headerContent = null;
      this.contentEle = null;
      if (!this.isBlazorServerRender()) {
        _super.prototype.destroy.call(this);
      } else {
        this.isDestroyed = true;
      }
      if (this.isReact) {
        this.clearTemplate();
      }
    };
    Dialog2.prototype.wireWindowResizeEvent = function() {
      window.addEventListener("resize", this.windowResizeHandler.bind(this));
    };
    Dialog2.prototype.unWireWindowResizeEvent = function() {
      window.removeEventListener("resize", this.windowResizeHandler.bind(this));
    };
    Dialog2.prototype.wireEvents = function() {
      if (this.isBlazorServerRender() && this.showCloseIcon) {
        this.closeIcon = this.element.getElementsByClassName("e-dlg-closeicon-btn")[0];
      }
      if (this.showCloseIcon) {
        EventHandler.add(this.closeIcon, "click", this.closeIconClickEventHandler, this);
      }
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.unWireEvents = function() {
      if (this.showCloseIcon) {
        EventHandler.remove(this.closeIcon, "click", this.closeIconClickEventHandler);
      }
      if (this.isModal) {
        EventHandler.remove(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler);
      }
      if (this.buttons.length > 0 && !isNullOrUndefined(this.buttons[0].buttonModel) && this.footerTemplate === "") {
        for (var i = 0; i < this.buttons.length; i++) {
          if (typeof this.buttons[i].click === "function") {
            EventHandler.remove(this.ftrTemplateContent.children[i], "click", this.buttons[i].click);
          }
        }
      }
    };
    Dialog2.prototype.refreshPosition = function() {
      this.popupObj.refreshPosition();
      if (this.element.classList.contains(MODAL_DLG)) {
        this.positionChange();
      }
    };
    Dialog2.prototype.getDimension = function() {
      var dialogWidth = this.element.offsetWidth;
      var dialogHeight = this.element.offsetHeight;
      return { width: dialogWidth, height: dialogHeight };
    };
    Dialog2.prototype.show = function(isFullScreen) {
      var _this = this;
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      if (!this.element.classList.contains(DLG_SHOW) || !isNullOrUndefined(isFullScreen)) {
        if (!isNullOrUndefined(isFullScreen)) {
          this.fullScreen(isFullScreen);
        }
        var eventArgs_1 = isBlazor() ? {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          maxHeight: this.element.style.maxHeight
        } : {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          target: this.target,
          maxHeight: this.element.style.maxHeight
        };
        this.trigger("beforeOpen", eventArgs_1, function(beforeOpenArgs) {
          if (!beforeOpenArgs.cancel) {
            if (_this.element.style.maxHeight !== eventArgs_1.maxHeight) {
              _this.allowMaxHeight = false;
              _this.element.style.maxHeight = eventArgs_1.maxHeight;
            }
            _this.storeActiveElement = document.activeElement;
            _this.element.tabIndex = -1;
            if (_this.isModal && !isNullOrUndefined(_this.dlgOverlay)) {
              _this.dlgOverlay.style.display = "block";
              _this.dlgContainer.style.display = "flex";
              removeClass([_this.dlgOverlay], "e-fade");
              if (!isNullOrUndefined(_this.targetEle)) {
                if (_this.targetEle === document.body) {
                  _this.dlgContainer.style.position = "fixed";
                } else {
                  _this.dlgContainer.style.position = "absolute";
                }
                _this.dlgOverlay.style.position = "absolute";
                var targetType = _this.getTargetContainer(_this.target);
                if (targetType instanceof Element) {
                  var computedStyle = window.getComputedStyle(targetType);
                  if (computedStyle.getPropertyValue("direction") === "rtl") {
                    _this.element.style.position = "absolute";
                  } else {
                    _this.element.style.position = "relative";
                  }
                } else {
                  _this.element.style.position = "relative";
                }
                addClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              } else {
                addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            var openAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomIn" : _this.animationSettings.effect + "In",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            var zIndexElement = _this.isModal ? _this.element.parentElement : _this.element;
            if (_this.calculatezIndex) {
              _this.setzIndex(zIndexElement, true);
              setStyleAttribute(_this.element, { "zIndex": _this.zIndex });
              if (_this.isModal) {
                _this.setOverlayZindex(_this.zIndex);
              }
            }
            _this.animationSettings.effect === "None" && animationMode === "Enable" ? _this.popupObj.show(openAnimation) : _this.animationSettings.effect === "None" ? _this.popupObj.show() : _this.popupObj.show(openAnimation);
            _this.dialogOpen = true;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = true;
            _this.preventVisibility = true;
            _this.isProtectedOnChange = prevOnChange;
          }
        });
      }
      if (this.isReact) {
        this.renderReactTemplates();
      }
    };
    Dialog2.prototype.hide = function(event) {
      var _this = this;
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      if (this.preventVisibility) {
        var eventArgs = isBlazor() ? {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          event
        } : {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          target: this.target,
          container: this.isModal ? this.dlgContainer : this.element,
          event,
          closedBy: this.dlgClosedBy
        };
        this.closeArgs = eventArgs;
        this.trigger("beforeClose", eventArgs, function(beforeCloseArgs) {
          if (!beforeCloseArgs.cancel) {
            if (_this.isModal) {
              if (!isNullOrUndefined(_this.targetEle)) {
                removeClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            if (document.body.classList.contains(DLG_TARGET) && document.body.classList.contains(SCROLL_DISABLED)) {
              removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            }
            var closeAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomOut" : _this.animationSettings.effect + "Out",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            _this.animationSettings.effect === "None" && animationMode === "Enable" ? _this.popupObj.hide(closeAnimation) : _this.animationSettings.effect === "None" ? _this.popupObj.hide() : _this.popupObj.hide(closeAnimation);
            _this.dialogOpen = false;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = false;
            _this.preventVisibility = false;
            _this.isProtectedOnChange = prevOnChange;
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      }
    };
    Dialog2.prototype.fullScreen = function(args) {
      var top = this.element.offsetTop;
      var left = this.element.offsetLeft;
      if (args) {
        this.element.style.top = document.scrollingElement.scrollTop + "px";
        addClass([this.element], FULLSCREEN);
        var display = this.element.style.display;
        this.element.style.display = "none";
        this.element.style.maxHeight = !isNullOrUndefined(this.target) ? this.targetEle.offsetHeight + "px" : window.innerHeight + "px";
        this.element.style.display = display;
        addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.dragObj)) {
          this.dragObj.destroy();
        }
      } else {
        removeClass([this.element], FULLSCREEN);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
          this.setAllowDragging();
        }
      }
      return args;
    };
    Dialog2.prototype.getButtons = function(index) {
      if (!isNullOrUndefined(index)) {
        return this.btnObj[index];
      }
      return this.btnObj;
    };
    __decorate10([
      Property("")
    ], Dialog2.prototype, "content", void 0);
    __decorate10([
      Property(true)
    ], Dialog2.prototype, "enableHtmlSanitizer", void 0);
    __decorate10([
      Property(false)
    ], Dialog2.prototype, "enablePersistence", void 0);
    __decorate10([
      Property(false)
    ], Dialog2.prototype, "showCloseIcon", void 0);
    __decorate10([
      Property(false)
    ], Dialog2.prototype, "isModal", void 0);
    __decorate10([
      Property("")
    ], Dialog2.prototype, "header", void 0);
    __decorate10([
      Property(true)
    ], Dialog2.prototype, "visible", void 0);
    __decorate10([
      Property(false)
    ], Dialog2.prototype, "enableResize", void 0);
    __decorate10([
      Property(["South-East"])
    ], Dialog2.prototype, "resizeHandles", void 0);
    __decorate10([
      Property("auto")
    ], Dialog2.prototype, "height", void 0);
    __decorate10([
      Property("")
    ], Dialog2.prototype, "minHeight", void 0);
    __decorate10([
      Property("100%")
    ], Dialog2.prototype, "width", void 0);
    __decorate10([
      Property("")
    ], Dialog2.prototype, "cssClass", void 0);
    __decorate10([
      Property(1e3)
    ], Dialog2.prototype, "zIndex", void 0);
    __decorate10([
      Property(null)
    ], Dialog2.prototype, "target", void 0);
    __decorate10([
      Property("")
    ], Dialog2.prototype, "footerTemplate", void 0);
    __decorate10([
      Property(false)
    ], Dialog2.prototype, "allowDragging", void 0);
    __decorate10([
      Collection([{}], ButtonProps)
    ], Dialog2.prototype, "buttons", void 0);
    __decorate10([
      Property(true)
    ], Dialog2.prototype, "closeOnEscape", void 0);
    __decorate10([
      Complex({}, AnimationSettings)
    ], Dialog2.prototype, "animationSettings", void 0);
    __decorate10([
      Complex({ X: "center", Y: "center" }, PositionData)
    ], Dialog2.prototype, "position", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "created", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "open", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "beforeSanitizeHtml", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "beforeOpen", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "close", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "beforeClose", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "dragStart", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "dragStop", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "drag", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "overlayClick", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "resizeStart", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "resizing", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "resizeStop", void 0);
    __decorate10([
      Event()
    ], Dialog2.prototype, "destroyed", void 0);
    Dialog2 = __decorate10([
      NotifyPropertyChanges
    ], Dialog2);
    return Dialog2;
  }(Component2)
);
var DialogUtility;
(function(DialogUtility2) {
  function alert(args) {
    var dialogComponent;
    var dialogElement = createElement("div", { "className": DLG_UTIL_ALERT });
    document.body.appendChild(dialogElement);
    var alertDialogObj;
    var okButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      alertDialogObj = createDialog({
        content: args,
        position: { X: "center", Y: "top" },
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okButtonModel
      }, dialogElement);
    } else {
      alertDialogObj = createDialog(alertOptions(args), dialogElement);
    }
    alertDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(alertDialogObj);
      }
      alertDialogObj.destroy();
      if (alertDialogObj.element.classList.contains("e-dlg-modal")) {
        alertDialogObj.element.parentElement.remove();
        alertDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        alertDialogObj.element.remove();
      }
    };
    return alertDialogObj;
  }
  DialogUtility2.alert = alert;
  function confirm(args) {
    var dialogComponent;
    var dialogElement = createElement("div", { "className": DLG_UTIL_CONFIRM });
    document.body.appendChild(dialogElement);
    var confirmDialogObj;
    var okCancelButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }, {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      confirmDialogObj = createDialog({
        position: { X: "center", Y: "top" },
        content: args,
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okCancelButtonModel
      }, dialogElement);
    } else {
      confirmDialogObj = createDialog(confirmOptions(args), dialogElement);
    }
    confirmDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(confirmDialogObj);
      }
      confirmDialogObj.destroy();
      if (confirmDialogObj.element.classList.contains("e-dlg-modal")) {
        confirmDialogObj.element.parentElement.remove();
        confirmDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        confirmDialogObj.element.remove();
      }
    };
    return confirmDialogObj;
  }
  DialogUtility2.confirm = confirm;
  function createDialog(options, element2) {
    var dialogObject = new Dialog(options);
    dialogObject.appendTo(element2);
    return dialogObject;
  }
  function alertOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setAlertButtonModel(options, option);
    return options;
  }
  function confirmOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setConfirmButtonModel(options, option);
    return options;
  }
  function formOptions(options, option) {
    options.header = !isNullOrUndefined(option.title) ? option.title : null;
    options.content = !isNullOrUndefined(option.content) ? option.content : "";
    options.isModal = !isNullOrUndefined(option.isModal) ? option.isModal : true;
    options.showCloseIcon = !isNullOrUndefined(option.showCloseIcon) ? option.showCloseIcon : false;
    options.allowDragging = !isNullOrUndefined(option.isDraggable) ? option.isDraggable : false;
    options.closeOnEscape = !isNullOrUndefined(option.closeOnEscape) ? option.closeOnEscape : false;
    options.position = !isNullOrUndefined(option.position) ? option.position : { X: "center", Y: "top" };
    options.animationSettings = !isNullOrUndefined(option.animationSettings) ? option.animationSettings : { effect: "Fade", duration: 400, delay: 0 };
    options.cssClass = !isNullOrUndefined(option.cssClass) ? option.cssClass : "";
    options.zIndex = !isNullOrUndefined(option.zIndex) ? option.zIndex : 1e3;
    options.open = !isNullOrUndefined(option.open) ? option.open : null;
    options.width = !isNullOrUndefined(option.width) ? option.width : "auto";
    options.height = !isNullOrUndefined(option.height) ? option.height : "auto";
    return options;
  }
  function setAlertButtonModel(options, option) {
    var alertButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, alertButtonModel[0]);
    } else {
      options.buttons = alertButtonModel;
    }
    return options;
  }
  function setConfirmButtonModel(options, option) {
    var okButtonModel = {
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    };
    var cancelButtonModel = {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    };
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, okButtonModel);
    } else {
      options.buttons[0] = okButtonModel;
    }
    if (!isNullOrUndefined(option.cancelButton)) {
      options.buttons[1] = formButtonModel(options.buttons[1], option.cancelButton, cancelButtonModel);
    } else {
      options.buttons[1] = cancelButtonModel;
    }
    return options;
  }
  function formButtonModel(buttonModel, option, buttonPropModel) {
    var buttonProps = buttonPropModel;
    if (!isNullOrUndefined(option.text)) {
      buttonProps.buttonModel.content = option.text;
    }
    if (!isNullOrUndefined(option.icon)) {
      buttonProps.buttonModel.iconCss = option.icon;
    }
    if (!isNullOrUndefined(option.cssClass)) {
      buttonProps.buttonModel.cssClass = option.cssClass;
    }
    if (!isNullOrUndefined(option.click)) {
      buttonProps.click = option.click;
    }
    if (!isNullOrUndefined(option.isFlat)) {
      buttonProps.isFlat = option.isFlat;
    }
    return buttonProps;
  }
})(DialogUtility || (DialogUtility = {}));

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/tooltip/tooltip.js
var __extends10 = function() {
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
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TOUCHEND_HIDE_DELAY = 1500;
var TAPHOLD_THRESHOLD = 500;
var SHOW_POINTER_TIP_GAP = 0;
var HIDE_POINTER_TIP_GAP = 8;
var MOUSE_TRAIL_GAP = 2;
var POINTER_ADJUST = 2;
var ROOT2 = "e-tooltip";
var RTL5 = "e-rtl";
var DEVICE2 = "e-bigger";
var ICON2 = "e-icons";
var CLOSE = "e-tooltip-close";
var TOOLTIP_WRAP = "e-tooltip-wrap";
var CONTENT = "e-tip-content";
var ARROW_TIP = "e-arrow-tip";
var ARROW_TIP_OUTER = "e-arrow-tip-outer";
var ARROW_TIP_INNER = "e-arrow-tip-inner";
var TIP_BOTTOM = "e-tip-bottom";
var TIP_TOP = "e-tip-top";
var TIP_LEFT = "e-tip-left";
var TIP_RIGHT = "e-tip-right";
var POPUP_ROOT2 = "e-popup";
var POPUP_OPEN = "e-popup-open";
var POPUP_CLOSE = "e-popup-close";
var POPUP_LIB = "e-lib";
var HIDE_POPUP = "e-hidden";
var POPUP_CONTAINER = "e-tooltip-popup-container";
var Animation2 = (
  /** @class */
  function(_super) {
    __extends10(Animation3, _super);
    function Animation3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate11([
      Property({ effect: "FadeIn", duration: 150, delay: 0 })
    ], Animation3.prototype, "open", void 0);
    __decorate11([
      Property({ effect: "FadeOut", duration: 150, delay: 0 })
    ], Animation3.prototype, "close", void 0);
    return Animation3;
  }(ChildProperty)
);
var Tooltip = (
  /** @class */
  function(_super) {
    __extends10(Tooltip2, _super);
    function Tooltip2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.mouseMoveEvent = null;
      _this.mouseMoveTarget = null;
      _this.containerElement = null;
      _this.isBodyContainer = true;
      return _this;
    }
    Tooltip2.prototype.initialize = function() {
      this.formatPosition();
      addClass([this.element], ROOT2);
    };
    Tooltip2.prototype.formatPosition = function() {
      var _a, _b;
      if (this.position.indexOf("Top") === 0 || this.position.indexOf("Bottom") === 0) {
        _a = this.position.split(/(?=[A-Z])/), this.tooltipPositionY = _a[0], this.tooltipPositionX = _a[1];
      } else {
        _b = this.position.split(/(?=[A-Z])/), this.tooltipPositionX = _b[0], this.tooltipPositionY = _b[1];
      }
    };
    Tooltip2.prototype.renderArrow = function() {
      this.setTipClass(this.position);
      var tip = this.createElement("div", { className: ARROW_TIP + " " + this.tipClass });
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_OUTER + " " + this.tipClass }));
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_INNER + " " + this.tipClass }));
      this.tooltipEle.appendChild(tip);
    };
    Tooltip2.prototype.setTipClass = function(position) {
      if (position.indexOf("Right") === 0) {
        this.tipClass = TIP_LEFT;
      } else if (position.indexOf("Bottom") === 0) {
        this.tipClass = TIP_TOP;
      } else if (position.indexOf("Left") === 0) {
        this.tipClass = TIP_RIGHT;
      } else {
        this.tipClass = TIP_BOTTOM;
      }
    };
    Tooltip2.prototype.renderPopup = function(target) {
      var elePos = this.mouseTrail ? { top: 0, left: 0 } : this.getTooltipPosition(target);
      this.tooltipEle.classList.remove(POPUP_LIB);
      this.popupObj = new Popup(this.tooltipEle, {
        height: this.height,
        width: this.width,
        position: { X: elePos.left, Y: elePos.top },
        enableRtl: this.enableRtl,
        open: this.openPopupHandler.bind(this),
        close: this.closePopupHandler.bind(this)
      });
    };
    Tooltip2.prototype.getScalingFactor = function(target) {
      if (!target) {
        return { x: 1, y: 1 };
      }
      var scalingFactors = { x: 1, y: 1 };
      var elementsWithTransform = target.closest('[style*="transform: scale"]');
      if (elementsWithTransform && elementsWithTransform != this.tooltipEle && elementsWithTransform.contains(this.tooltipEle)) {
        var computedStyle = window.getComputedStyle(elementsWithTransform);
        var transformValue = computedStyle.getPropertyValue("transform");
        var matrixValues = transformValue.match(/matrix\(([^)]+)\)/)[1].split(",").map(parseFloat);
        scalingFactors.x = matrixValues[0];
        scalingFactors.y = matrixValues[3];
      }
      return scalingFactors;
    };
    Tooltip2.prototype.getTooltipPosition = function(target) {
      this.tooltipEle.style.display = "block";
      var parentWithZoomStyle = this.element.closest('[style*="zoom"]');
      if (parentWithZoomStyle) {
        if (!parentWithZoomStyle.contains(this.tooltipEle)) {
          this.tooltipEle.style.zoom = getComputedStyle(parentWithZoomStyle).zoom;
        }
      }
      var pos = calculatePosition(target, this.tooltipPositionX, this.tooltipPositionY, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
      var scalingFactors = this.getScalingFactor(target);
      var offsetPos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var collisionPosition = this.calculateElementPosition(pos, offsetPos);
      var collisionLeft = collisionPosition[0];
      var collisionTop = collisionPosition[1];
      var elePos = this.collisionFlipFit(target, collisionLeft, collisionTop);
      elePos.left = elePos.left / scalingFactors.x;
      elePos.top = elePos.top / scalingFactors.y;
      this.tooltipEle.style.display = "";
      return elePos;
    };
    Tooltip2.prototype.windowResize = function() {
      this.reposition(this.findTarget());
    };
    Tooltip2.prototype.reposition = function(target) {
      if (this.popupObj && target) {
        var elePos = this.getTooltipPosition(target);
        this.popupObj.position = { X: elePos.left, Y: elePos.top };
        this.popupObj.dataBind();
      }
    };
    Tooltip2.prototype.openPopupHandler = function() {
      if (!this.mouseTrail && this.needTemplateReposition()) {
        this.reposition(this.findTarget());
      }
      this.trigger("afterOpen", this.tooltipEventArgs);
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.closePopupHandler = function() {
      if (this.isReact && !(this.opensOn === "Click" && typeof this.content === "function")) {
        this.clearTemplate(["content"]);
      }
      this.clear();
      this.trigger("afterClose", this.tooltipEventArgs);
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.calculateTooltipOffset = function(position, xScalingFactor, yScalingFactor) {
      if (xScalingFactor === void 0) {
        xScalingFactor = 1;
      }
      if (yScalingFactor === void 0) {
        yScalingFactor = 1;
      }
      var pos = { top: 0, left: 0 };
      var tipWidth, tipHeight, tooltipEleWidth, tooltipEleHeight, arrowEle;
      var tipAdjust, tipHeightAdjust, tipWidthAdjust;
      if (xScalingFactor != 1 || yScalingFactor != 1) {
        var tooltipEleRect = this.tooltipEle.getBoundingClientRect();
        var arrowEleRect = void 0;
        tooltipEleWidth = Math.round(tooltipEleRect.width);
        tooltipEleHeight = Math.round(tooltipEleRect.height);
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        if (arrowEle) {
          arrowEleRect = arrowEle.getBoundingClientRect();
        }
        tipWidth = arrowEle ? Math.round(arrowEleRect.width) : 0;
        tipHeight = arrowEle ? Math.round(arrowEleRect.height) : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (tooltipEleHeight - this.tooltipEle.clientHeight * yScalingFactor);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (tooltipEleWidth - this.tooltipEle.clientWidth * xScalingFactor);
      } else {
        tooltipEleWidth = this.tooltipEle.offsetWidth;
        tooltipEleHeight = this.tooltipEle.offsetHeight;
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        tipWidth = arrowEle ? arrowEle.offsetWidth : 0;
        tipHeight = arrowEle ? arrowEle.offsetHeight : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (this.tooltipEle.offsetHeight - this.tooltipEle.clientHeight);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (this.tooltipEle.offsetWidth - this.tooltipEle.clientWidth);
      }
      if (this.mouseTrail) {
        tipAdjust += MOUSE_TRAIL_GAP;
      }
      switch (position) {
        case "RightTop":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "RightCenter":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "RightBottom":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "BottomRight":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        case "BottomCenter":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
        case "BottomLeft":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "LeftBottom":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "LeftCenter":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "LeftTop":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "TopLeft":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "TopRight":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        default:
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
      }
      pos.left += this.offsetX;
      pos.top += this.offsetY;
      return pos;
    };
    Tooltip2.prototype.updateTipPosition = function(position) {
      var selEle = selectAll("." + ARROW_TIP + ",." + ARROW_TIP_OUTER + ",." + ARROW_TIP_INNER, this.tooltipEle);
      var removeList = [TIP_BOTTOM, TIP_TOP, TIP_LEFT, TIP_RIGHT];
      removeClass(selEle, removeList);
      this.setTipClass(position);
      addClass(selEle, this.tipClass);
    };
    Tooltip2.prototype.adjustArrow = function(target, position, tooltipPositionX, tooltipPositionY) {
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer === false || arrowEle === null) {
        return;
      }
      this.updateTipPosition(position);
      var leftValue;
      var topValue;
      this.tooltipEle.style.display = "block";
      var tooltipWidth = this.tooltipEle.clientWidth;
      var tooltipHeight = this.tooltipEle.clientHeight;
      var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
      var tipWidth = arrowEle.offsetWidth;
      var tipHeight = arrowEle.offsetHeight;
      this.tooltipEle.style.display = "";
      if (this.tipClass === TIP_BOTTOM || this.tipClass === TIP_TOP) {
        if (this.tipClass === TIP_BOTTOM) {
          topValue = "99.9%";
          arrowInnerELe.style.top = "-" + (tipHeight - 2) + "px";
        } else {
          topValue = -(tipHeight - 1) + "px";
          arrowInnerELe.style.top = "-" + (tipHeight - 6) + "px";
        }
        if (target) {
          var tipPosExclude = tooltipPositionX !== "Center" || tooltipWidth > target.offsetWidth || this.mouseTrail;
          if (tipPosExclude && tooltipPositionX === "Left" || !tipPosExclude && this.tipPointerPosition === "End") {
            leftValue = tooltipWidth - tipWidth - POINTER_ADJUST + "px";
          } else if (tipPosExclude && tooltipPositionX === "Right" || !tipPosExclude && this.tipPointerPosition === "Start") {
            leftValue = POINTER_ADJUST + "px";
          } else if (tipPosExclude && (this.tipPointerPosition === "End" || this.tipPointerPosition === "Start")) {
            leftValue = this.tipPointerPosition === "End" ? target.offsetWidth + (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 - POINTER_ADJUST + "px" : (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 + POINTER_ADJUST + "px";
          } else {
            leftValue = tooltipWidth / 2 - tipWidth / 2 + "px";
          }
        }
      } else {
        if (this.tipClass === TIP_RIGHT) {
          leftValue = "99.9%";
          arrowInnerELe.style.left = "-" + (tipWidth - 2) + "px";
        } else {
          leftValue = -(tipWidth - 1) + "px";
          arrowInnerELe.style.left = -tipWidth + (tipWidth - 2) + "px";
        }
        var tipPosExclude = tooltipPositionY !== "Center" || tooltipHeight > target.offsetHeight || this.mouseTrail;
        if (tipPosExclude && tooltipPositionY === "Top" || !tipPosExclude && this.tipPointerPosition === "End") {
          topValue = tooltipHeight - tipHeight - POINTER_ADJUST + "px";
        } else if (tipPosExclude && tooltipPositionY === "Bottom" || !tipPosExclude && this.tipPointerPosition === "Start") {
          topValue = POINTER_ADJUST + "px";
        } else {
          topValue = tooltipHeight / 2 - tipHeight / 2 + "px";
        }
      }
      arrowEle.style.top = topValue;
      arrowEle.style.left = leftValue;
    };
    Tooltip2.prototype.renderContent = function(target) {
      var tooltipContent = select("." + CONTENT, this.tooltipEle);
      if (this.cssClass) {
        addClass([this.tooltipEle], this.cssClass.split(" "));
      }
      if (target && !isNullOrUndefined(target.getAttribute("title"))) {
        target.setAttribute("data-content", target.getAttribute("title"));
        target.removeAttribute("title");
      }
      if (!isNullOrUndefined(this.content)) {
        tooltipContent.innerHTML = "";
        if (this.content instanceof HTMLElement) {
          tooltipContent.appendChild(this.content);
        } else if (typeof this.content === "string") {
          if (this.enableHtmlSanitizer) {
            this.setProperties({ content: SanitizeHtmlHelper.sanitize(this.content) }, true);
          }
          if (this.enableHtmlParse) {
            var tempFunction = compile(this.content);
            var tempArr = tempFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent, this.root);
            if (tempArr) {
              append(tempArr, tooltipContent);
            }
          } else {
            tooltipContent["textContent"] = this.content;
          }
        } else {
          var templateFunction = compile(this.content);
          var tempArr = templateFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent);
          if (tempArr) {
            append(tempArr, tooltipContent);
          }
          this.renderReactTemplates();
        }
      } else {
        if (target && !isNullOrUndefined(target.getAttribute("data-content"))) {
          tooltipContent.innerHTML = target.getAttribute("data-content");
        }
      }
    };
    Tooltip2.prototype.renderCloseIcon = function() {
      if (!this.isSticky) {
        var existingCloseIcon = this.tooltipEle.querySelector("." + ICON2 + "." + CLOSE);
        if (existingCloseIcon) {
          remove(existingCloseIcon);
        }
        return;
      }
      var tipClose = this.createElement("div", { className: ICON2 + " " + CLOSE });
      this.tooltipEle.appendChild(tipClose);
      EventHandler.add(tipClose, Browser.touchStartEvent, this.onStickyClose, this);
    };
    Tooltip2.prototype.addDescribedBy = function(target, id) {
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      if (describedby.indexOf(id) < 0) {
        describedby.push(id);
      }
      attributes(target, { "aria-describedby": describedby.join(" ").trim(), "data-tooltip-id": id });
    };
    Tooltip2.prototype.removeDescribedBy = function(target) {
      var id = target.getAttribute("data-tooltip-id");
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      var index = describedby.indexOf(id);
      if (index !== -1) {
        describedby.splice(index, 1);
      }
      target.removeAttribute("data-tooltip-id");
      var orgdescribedby = describedby.join(" ").trim();
      if (orgdescribedby) {
        target.setAttribute("aria-describedby", orgdescribedby);
      } else {
        target.removeAttribute("aria-describedby");
      }
    };
    Tooltip2.prototype.tapHoldHandler = function(evt) {
      clearTimeout(this.autoCloseTimer);
      this.targetHover(evt.originalEvent);
    };
    Tooltip2.prototype.touchEndHandler = function(e) {
      var _this = this;
      if (this.isSticky) {
        return;
      }
      var close = function() {
        _this.close();
      };
      this.autoCloseTimer = setTimeout(close, TOUCHEND_HIDE_DELAY);
    };
    Tooltip2.prototype.targetClick = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target)) {
        return;
      }
      if (target.getAttribute("data-tooltip-id") === null) {
        this.targetHover(e);
      } else if (!this.isSticky) {
        this.hideTooltip(this.animation.close, e, target);
      }
    };
    Tooltip2.prototype.targetHover = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target) || target.getAttribute("data-tooltip-id") !== null && this.closeDelay === 0) {
        return;
      }
      var targetList = [].slice.call(selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', document));
      for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
        var target_1 = targetList_1[_i];
        this.restoreElement(target_1);
      }
      this.showTooltip(target, this.animation.open, e);
    };
    Tooltip2.prototype.mouseMoveBeforeOpen = function(e) {
      this.mouseMoveEvent = e;
    };
    Tooltip2.prototype.mouseMoveBeforeRemove = function() {
      if (this.mouseMoveTarget) {
        EventHandler.remove(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen);
      }
    };
    Tooltip2.prototype.showTooltip = function(target, showAnimation, e) {
      var _this = this;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      if (this.openDelay && this.mouseTrail) {
        this.mouseMoveBeforeRemove();
        this.mouseMoveTarget = target;
        EventHandler.add(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen, this);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      var observeCallback = function(beforeRenderArgs) {
        _this.beforeRenderCallback(beforeRenderArgs, target, e, showAnimation);
      };
      this.trigger("beforeRender", this.tooltipEventArgs, observeCallback.bind(this));
    };
    Tooltip2.prototype.beforeRenderCallback = function(beforeRenderArgs, target, e, showAnimation) {
      if (beforeRenderArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
      } else {
        this.isHidden = false;
        if (isNullOrUndefined(this.tooltipEle)) {
          this.ctrlId = this.element.getAttribute("id") ? getUniqueID(this.element.getAttribute("id")) : getUniqueID("tooltip");
          this.tooltipEle = this.createElement("div", {
            className: TOOLTIP_WRAP + " " + POPUP_ROOT2 + " " + POPUP_LIB,
            attrs: {
              role: "tooltip",
              "aria-hidden": "false",
              "id": this.ctrlId + "_content"
            },
            styles: "width:" + formatUnit(this.width) + ";height:" + formatUnit(this.height) + ";position:absolute;"
          });
          this.tooltipBeforeRender(target, this);
          this.tooltipAfterRender(target, e, showAnimation, this);
        } else {
          if (target) {
            this.adjustArrow(target, this.position, this.tooltipPositionX, this.tooltipPositionY);
            this.addDescribedBy(target, this.ctrlId + "_content");
            this.renderContent(target);
            Animation.stop(this.tooltipEle);
            this.reposition(target);
            this.tooltipAfterRender(target, e, showAnimation, this);
          }
        }
      }
    };
    Tooltip2.prototype.appendContainer = function(ctrlObj) {
      if (typeof this.container == "string") {
        if (this.container === "body") {
          this.containerElement = document.body;
        } else {
          this.isBodyContainer = false;
          this.containerElement = select(this.container, document);
        }
      } else if (this.container instanceof HTMLElement) {
        this.containerElement = this.container;
        this.isBodyContainer = this.containerElement.tagName === "BODY";
      }
      if (!this.isBodyContainer) {
        addClass([this.containerElement], POPUP_CONTAINER);
      }
      this.containerElement.appendChild(ctrlObj.tooltipEle);
    };
    Tooltip2.prototype.tooltipBeforeRender = function(target, ctrlObj) {
      if (target) {
        if (Browser.isDevice) {
          addClass([ctrlObj.tooltipEle], DEVICE2);
        }
        if (ctrlObj.width !== "auto") {
          ctrlObj.tooltipEle.style.maxWidth = formatUnit(ctrlObj.width);
        }
        ctrlObj.tooltipEle.appendChild(ctrlObj.createElement("div", { className: CONTENT }));
        this.appendContainer(ctrlObj);
        removeClass([ctrlObj.tooltipEle], HIDE_POPUP);
        ctrlObj.addDescribedBy(target, ctrlObj.ctrlId + "_content");
        ctrlObj.renderContent(target);
        addClass([ctrlObj.tooltipEle], POPUP_OPEN);
        if (ctrlObj.showTipPointer) {
          ctrlObj.renderArrow();
        }
        ctrlObj.renderCloseIcon();
        ctrlObj.renderPopup(target);
        ctrlObj.adjustArrow(target, ctrlObj.position, ctrlObj.tooltipPositionX, ctrlObj.tooltipPositionY);
        Animation.stop(ctrlObj.tooltipEle);
        ctrlObj.reposition(target);
      }
    };
    Tooltip2.prototype.tooltipAfterRender = function(target, e, showAnimation, ctrlObj) {
      if (target) {
        removeClass([ctrlObj.tooltipEle], POPUP_OPEN);
        addClass([ctrlObj.tooltipEle], POPUP_CLOSE);
        ctrlObj.tooltipEventArgs = {
          type: e ? e.type : null,
          cancel: false,
          target,
          event: e ? e : null,
          element: ctrlObj.tooltipEle,
          isInteracted: !isNullOrUndefined(e)
        };
        if (ctrlObj.needTemplateReposition() && !ctrlObj.mouseTrail) {
          ctrlObj.tooltipEle.style.display = "none";
        }
        var observeCallback = function(observedArgs) {
          ctrlObj.beforeOpenCallback(observedArgs, target, showAnimation, e);
        };
        ctrlObj.trigger("beforeOpen", ctrlObj.tooltipEventArgs, observeCallback.bind(ctrlObj));
      }
    };
    Tooltip2.prototype.beforeOpenCallback = function(observedArgs, target, showAnimation, e) {
      var _this = this;
      if (observedArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
        this.restoreElement(target);
      } else {
        var openAnimation_1 = {
          name: showAnimation.effect === "None" && animationMode === "Enable" ? "FadeIn" : this.animation.open.effect,
          duration: showAnimation.duration,
          delay: showAnimation.delay,
          timingFunction: "easeOut"
        };
        if (showAnimation.effect === "None") {
          openAnimation_1 = void 0;
        }
        if (this.openDelay > 0) {
          var show = function() {
            if (_this.mouseTrail) {
              EventHandler.add(target, "mousemove touchstart mouseenter", _this.onMouseMove, _this);
            }
            if (_this.popupObj) {
              _this.popupObj.show(openAnimation_1, target);
              if (_this.mouseMoveEvent && _this.mouseTrail) {
                _this.onMouseMove(_this.mouseMoveEvent);
              }
            }
          };
          this.showTimer = setTimeout(show, this.openDelay);
        } else {
          if (this.popupObj) {
            this.popupObj.show(openAnimation_1, target);
          }
        }
      }
      if (e) {
        this.wireMouseEvents(e, target);
      }
    };
    Tooltip2.prototype.needTemplateReposition = function() {
      var tooltip = this;
      return !isNullOrUndefined(tooltip.viewContainerRef) && typeof tooltip.viewContainerRef !== "string";
    };
    Tooltip2.prototype.checkCollision = function(target, x, y) {
      var elePos = {
        left: x,
        top: y,
        position: this.position,
        horizontal: this.tooltipPositionX,
        vertical: this.tooltipPositionY
      };
      var affectedPos = isCollide(this.tooltipEle, this.checkCollideTarget(), x, y);
      if (affectedPos.length > 0) {
        elePos.horizontal = affectedPos.indexOf("left") >= 0 ? "Right" : affectedPos.indexOf("right") >= 0 ? "Left" : this.tooltipPositionX;
        elePos.vertical = affectedPos.indexOf("top") >= 0 ? "Bottom" : affectedPos.indexOf("bottom") >= 0 ? "Top" : this.tooltipPositionY;
      }
      return elePos;
    };
    Tooltip2.prototype.calculateElementPosition = function(pos, offsetPos) {
      return [
        this.isBodyContainer ? pos.left + offsetPos.left : pos.left - this.containerElement.offsetLeft + offsetPos.left + window.pageXOffset + this.containerElement.scrollLeft,
        this.isBodyContainer ? pos.top + offsetPos.top : pos.top - this.containerElement.offsetTop + offsetPos.top + window.pageYOffset + this.containerElement.scrollTop
      ];
    };
    Tooltip2.prototype.collisionFlipFit = function(target, x, y) {
      var elePos = this.checkCollision(target, x, y);
      var newpos = elePos.position;
      if (this.tooltipPositionY !== elePos.vertical) {
        newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + this.tooltipPositionX : this.tooltipPositionX + elePos.vertical;
      }
      if (this.tooltipPositionX !== elePos.horizontal) {
        if (newpos.indexOf("Left") === 0) {
          elePos.vertical = newpos === "LeftTop" || newpos === "LeftCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Left";
        }
        if (newpos.indexOf("Right") === 0) {
          elePos.vertical = newpos === "RightTop" || newpos === "RightCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Right";
        }
        elePos.horizontal = this.tooltipPositionX;
      }
      this.tooltipEventArgs = {
        type: null,
        cancel: false,
        target,
        event: null,
        element: this.tooltipEle,
        collidedPosition: newpos
      };
      this.trigger("beforeCollision", this.tooltipEventArgs);
      if (this.tooltipEventArgs.cancel) {
        newpos = this.position;
      } else {
        var elePosVertical = elePos.vertical;
        var elePosHorizontal = elePos.horizontal;
        if (elePos.position !== newpos) {
          var pos = calculatePosition(target, elePosHorizontal, elePosVertical, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
          var scalingFactors = this.getScalingFactor(target);
          var offsetPos = this.calculateTooltipOffset(newpos, scalingFactors.x, scalingFactors.y);
          offsetPos.top -= this.getOffSetPosition("TopBottom", newpos, this.offsetY);
          offsetPos.left -= this.getOffSetPosition("RightLeft", newpos, this.offsetX);
          elePos.position = newpos;
          var elePosition = this.calculateElementPosition(pos, offsetPos);
          elePos.left = elePosition[0];
          elePos.top = elePosition[1];
        } else {
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
        }
      }
      var eleOffset = { left: elePos.left, top: elePos.top };
      var position = this.isBodyContainer ? fit(this.tooltipEle, this.checkCollideTarget(), { X: true, Y: this.windowCollision }, eleOffset) : eleOffset;
      this.tooltipEle.style.display = "block";
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer && arrowEle != null && (newpos.indexOf("Bottom") === 0 || newpos.indexOf("Top") === 0)) {
        var arrowleft = parseInt(arrowEle.style.left, 10) - (position.left - elePos.left);
        if (arrowleft < 0) {
          arrowleft = 0;
        } else if (arrowleft + arrowEle.offsetWidth > this.tooltipEle.clientWidth) {
          arrowleft = this.tooltipEle.clientWidth - arrowEle.offsetWidth;
        }
        arrowEle.style.left = arrowleft.toString() + "px";
      }
      this.tooltipEle.style.display = "";
      eleOffset.left = position.left;
      eleOffset.top = position.top;
      return eleOffset;
    };
    Tooltip2.prototype.getOffSetPosition = function(positionString, newPos, offsetType) {
      return positionString.indexOf(this.position.split(/(?=[A-Z])/)[0]) !== -1 && positionString.indexOf(newPos.split(/(?=[A-Z])/)[0]) !== -1 ? 2 * offsetType : 0;
    };
    Tooltip2.prototype.checkCollideTarget = function() {
      return !this.windowCollision && this.target ? this.element : null;
    };
    Tooltip2.prototype.hideTooltip = function(hideAnimation, e, targetElement2) {
      var _this = this;
      if (this.closeDelay > 0) {
        clearTimeout(this.hideTimer);
        clearTimeout(this.showTimer);
        var hide = function() {
          if (_this.closeDelay && _this.tooltipEle && _this.isTooltipOpen) {
            return;
          }
          _this.tooltipHide(hideAnimation, e, targetElement2);
        };
        this.hideTimer = setTimeout(hide, this.closeDelay);
      } else {
        this.tooltipHide(hideAnimation, e, targetElement2);
      }
    };
    Tooltip2.prototype.tooltipHide = function(hideAnimation, e, targetElement2) {
      var _this = this;
      var target;
      if (e) {
        target = this.target ? targetElement2 || e.target : this.element;
      } else {
        target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      this.trigger("beforeClose", this.tooltipEventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          _this.mouseMoveBeforeRemove();
          _this.popupHide(hideAnimation, target);
        } else {
          _this.isHidden = false;
        }
      });
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.popupHide = function(hideAnimation, target) {
      if (target) {
        this.restoreElement(target);
      }
      this.isHidden = true;
      var closeAnimation = {
        name: hideAnimation.effect === "None" && animationMode === "Enable" ? "FadeOut" : this.animation.close.effect,
        duration: hideAnimation.duration,
        delay: hideAnimation.delay,
        timingFunction: "easeIn"
      };
      if (hideAnimation.effect === "None") {
        closeAnimation = void 0;
      }
      if (this.popupObj) {
        this.popupObj.hide(closeAnimation);
      }
    };
    Tooltip2.prototype.restoreElement = function(target) {
      this.unwireMouseEvents(target);
      if (!isNullOrUndefined(target.getAttribute("data-content"))) {
        target.setAttribute("title", target.getAttribute("data-content"));
        target.removeAttribute("data-content");
      }
      this.removeDescribedBy(target);
    };
    Tooltip2.prototype.clear = function() {
      if (this.tooltipEle) {
        removeClass([this.tooltipEle], POPUP_CLOSE);
        addClass([this.tooltipEle], POPUP_OPEN);
      }
      if (this.isHidden) {
        if (this.popupObj) {
          this.popupObj.destroy();
        }
        if (this.tooltipEle) {
          remove(this.tooltipEle);
        }
        this.tooltipEle = null;
        this.popupObj = null;
      }
    };
    Tooltip2.prototype.tooltipHover = function(e) {
      if (this.tooltipEle) {
        this.isTooltipOpen = true;
      }
    };
    Tooltip2.prototype.tooltipMouseOut = function(e) {
      this.isTooltipOpen = false;
      this.hideTooltip(this.animation.close, e, this.findTarget());
    };
    Tooltip2.prototype.onMouseOut = function(e) {
      var enteredElement = e.relatedTarget;
      if (enteredElement && !this.mouseTrail) {
        var checkForTooltipElement = closest(enteredElement, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2);
        if (checkForTooltipElement) {
          EventHandler.add(checkForTooltipElement, "mouseleave", this.tooltipElementMouseOut, this);
        } else {
          this.hideTooltip(this.animation.close, e, this.findTarget());
          if (this.closeDelay === 0) {
            this.clear();
          }
        }
      } else {
        this.hideTooltip(this.animation.close, e, this.findTarget());
        this.clear();
      }
    };
    Tooltip2.prototype.tooltipElementMouseOut = function(e) {
      this.hideTooltip(this.animation.close, e, this.findTarget());
      EventHandler.remove(this.element, "mouseleave", this.tooltipElementMouseOut);
      this.clear();
    };
    Tooltip2.prototype.onStickyClose = function(e) {
      this.close();
    };
    Tooltip2.prototype.onMouseMove = function(event) {
      var eventPageX = 0;
      var eventPageY = 0;
      if (event.type.indexOf("touch") > -1) {
        event.preventDefault();
        eventPageX = event.touches[0].pageX;
        eventPageY = event.touches[0].pageY;
      } else {
        eventPageX = event.pageX;
        eventPageY = event.pageY;
      }
      Animation.stop(this.tooltipEle);
      removeClass([this.tooltipEle], POPUP_CLOSE);
      addClass([this.tooltipEle], POPUP_OPEN);
      this.adjustArrow(event.target, this.position, this.tooltipPositionX, this.tooltipPositionY);
      var scalingFactors = this.getScalingFactor(event.target);
      var pos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var x = eventPageX + pos.left + this.offsetX;
      var y = eventPageY + pos.top + this.offsetY;
      var elePos = this.checkCollision(event.target, x, y);
      if (this.tooltipPositionX !== elePos.horizontal || this.tooltipPositionY !== elePos.vertical) {
        var newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + elePos.horizontal : elePos.horizontal + elePos.vertical;
        elePos.position = newpos;
        this.adjustArrow(event.target, elePos.position, elePos.horizontal, elePos.vertical);
        var colpos = this.calculateTooltipOffset(elePos.position, scalingFactors.x, scalingFactors.y);
        elePos.left = eventPageX + colpos.left - this.offsetX;
        elePos.top = eventPageY + colpos.top - this.offsetY;
      }
      this.tooltipEle.style.left = elePos.left + "px";
      this.tooltipEle.style.top = elePos.top + "px";
    };
    Tooltip2.prototype.keyDown = function(event) {
      if (this.tooltipEle && event.keyCode === 27) {
        this.close();
      }
    };
    Tooltip2.prototype.touchEnd = function(e) {
      if (this.tooltipEle && closest(e.target, "." + ROOT2) === null && !this.isSticky) {
        this.close();
      }
    };
    Tooltip2.prototype.scrollHandler = function(e) {
      if (this.tooltipEle && !this.isSticky) {
        if (!closest(e.target, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2)) {
          this.close();
        }
      }
    };
    Tooltip2.prototype.render = function() {
      this.initialize();
      this.wireEvents(this.opensOn);
      this.renderComplete();
    };
    Tooltip2.prototype.preRender = function() {
      this.tipClass = TIP_BOTTOM;
      this.tooltipPositionX = "Center";
      this.tooltipPositionY = "Top";
      this.isHidden = true;
    };
    Tooltip2.prototype.wireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_1 = triggerList; _i < triggerList_1.length; _i++) {
        var opensOn = triggerList_1[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.wireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.add(this.element, Browser.touchStartEvent, this.targetClick, this);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            this.touchModule = new Touch(this.element, {
              tapHoldThreshold: TAPHOLD_THRESHOLD,
              tapHold: this.tapHoldHandler.bind(this)
            });
            EventHandler.add(this.element, Browser.touchEndEvent, this.touchEndHandler, this);
          } else {
            EventHandler.add(this.element, "mouseover", this.targetHover, this);
          }
        }
      }
      EventHandler.add(document, "touchend", this.touchEnd, this);
      EventHandler.add(document, "scroll wheel", this.scrollHandler, this);
      EventHandler.add(window, "resize", this.windowResize, this);
      EventHandler.add(document, "keydown", this.keyDown, this);
    };
    Tooltip2.prototype.getTriggerList = function(trigger) {
      if (trigger === "Auto") {
        trigger = Browser.isDevice ? "Hover" : "Hover Focus";
      }
      return trigger.split(" ");
    };
    Tooltip2.prototype.wireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        this.targetsList = targetList;
        for (var _i = 0, targetList_2 = targetList; _i < targetList_2.length; _i++) {
          var target = targetList_2[_i];
          EventHandler.add(target, "focus", this.targetHover, this);
        }
      } else {
        EventHandler.add(this.element, "focusin", this.targetHover, this);
      }
    };
    Tooltip2.prototype.wireMouseEvents = function(e, target) {
      if (this.tooltipEle) {
        if (!this.isSticky) {
          if (e.type === "focus") {
            EventHandler.add(target, "blur", this.onMouseOut, this);
          }
          if (e.type === "focusin") {
            EventHandler.add(target, "focusout", this.onMouseOut, this);
          }
          if (e.type === "mouseover") {
            EventHandler.add(target, "mouseleave", this.onMouseOut, this);
          }
          if (this.closeDelay) {
            EventHandler.add(this.tooltipEle, "mouseenter", this.tooltipHover, this);
            EventHandler.add(this.tooltipEle, "mouseleave", this.tooltipMouseOut, this);
          }
        }
        if (this.mouseTrail && this.openDelay === 0) {
          EventHandler.add(target, "mousemove touchstart mouseenter", this.onMouseMove, this);
        }
      }
    };
    Tooltip2.prototype.unwireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_2 = triggerList; _i < triggerList_2.length; _i++) {
        var opensOn = triggerList_2[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.unwireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.remove(this.element, Browser.touchStartEvent, this.targetClick);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            if (this.touchModule) {
              this.touchModule.destroy();
            }
            EventHandler.remove(this.element, Browser.touchEndEvent, this.touchEndHandler);
          } else {
            EventHandler.remove(this.element, "mouseover", this.targetHover);
          }
        }
      }
      EventHandler.remove(document, "touchend", this.touchEnd);
      EventHandler.remove(document, "scroll wheel", this.scrollHandler);
      EventHandler.remove(window, "resize", this.windowResize);
      EventHandler.remove(document, "keydown", this.keyDown);
    };
    Tooltip2.prototype.unwireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        for (var _i = 0, targetList_3 = targetList; _i < targetList_3.length; _i++) {
          var target = targetList_3[_i];
          EventHandler.remove(target, "focus", this.targetHover);
        }
      } else {
        EventHandler.remove(this.element, "focusin", this.targetHover);
      }
    };
    Tooltip2.prototype.unwireMouseEvents = function(target) {
      if (!this.isSticky) {
        var triggerList = this.getTriggerList(this.opensOn);
        for (var _i = 0, triggerList_3 = triggerList; _i < triggerList_3.length; _i++) {
          var opensOn = triggerList_3[_i];
          if (opensOn === "Focus") {
            EventHandler.remove(target, "blur", this.onMouseOut);
            EventHandler.remove(target, "focusout", this.onMouseOut);
          }
          if (opensOn === "Hover" && !Browser.isDevice) {
            EventHandler.remove(target, "mouseleave", this.onMouseOut);
          }
        }
        if (this.closeDelay) {
          EventHandler.remove(target, "mouseenter", this.tooltipHover);
          EventHandler.remove(target, "mouseleave", this.tooltipMouseOut);
        }
      }
      if (this.mouseTrail) {
        EventHandler.remove(target, "mousemove touchstart mouseenter", this.onMouseMove);
      }
    };
    Tooltip2.prototype.findTarget = function() {
      var target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      return target;
    };
    Tooltip2.prototype.getModuleName = function() {
      return "tooltip";
    };
    Tooltip2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Tooltip2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var targetElement2 = this.findTarget();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.width = this.tooltipEle.style.maxWidth = formatUnit(newProp.width);
              this.reposition(targetElement2);
            }
            break;
          case "height":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.height = formatUnit(newProp.height);
              this.reposition(targetElement2);
            }
            break;
          case "content":
            if (this.tooltipEle) {
              this.renderContent();
            }
            break;
          case "opensOn":
            this.unwireEvents(oldProp.opensOn);
            this.wireEvents(newProp.opensOn);
            break;
          case "position":
            this.formatPosition();
            if (this.tooltipEle && targetElement2) {
              var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
              if (arrowInnerELe) {
                arrowInnerELe.style.top = arrowInnerELe.style.left = null;
              }
              this.reposition(targetElement2);
            }
            break;
          case "tipPointerPosition":
            if (this.tooltipEle && targetElement2) {
              this.reposition(targetElement2);
            }
            break;
          case "offsetX":
            if (this.tooltipEle) {
              var x = newProp.offsetX - oldProp.offsetX;
              this.tooltipEle.style.left = (parseInt(this.tooltipEle.style.left, 10) + x).toString() + "px";
            }
            break;
          case "offsetY":
            if (this.tooltipEle) {
              var y = newProp.offsetY - oldProp.offsetY;
              this.tooltipEle.style.top = (parseInt(this.tooltipEle.style.top, 10) + y).toString() + "px";
            }
            break;
          case "cssClass":
            if (this.tooltipEle) {
              if (oldProp.cssClass) {
                removeClass([this.tooltipEle], oldProp.cssClass.split(" "));
              }
              if (newProp.cssClass) {
                addClass([this.tooltipEle], newProp.cssClass.split(" "));
              }
            }
            break;
          case "enableRtl":
            if (this.tooltipEle) {
              if (this.enableRtl) {
                addClass([this.tooltipEle], RTL5);
              } else {
                removeClass([this.tooltipEle], RTL5);
              }
            }
            break;
          case "isSticky":
            if (this.tooltipEle && targetElement2) {
              this.renderCloseIcon();
              this.reposition(targetElement2);
            }
            break;
          case "container":
            if (!isNullOrUndefined(this.containerElement)) {
              removeClass([this.containerElement], POPUP_CONTAINER);
            }
            this.container = newProp.container;
            if (this.tooltipEle && targetElement2) {
              this.appendContainer(this);
              this.reposition(targetElement2);
            }
        }
      }
    };
    Tooltip2.prototype.open = function(element2, animation) {
      if (isNullOrUndefined(animation)) {
        animation = this.animation.open;
      }
      if (isNullOrUndefined(element2)) {
        element2 = this.element;
      }
      if (element2.style.display === "none") {
        return;
      }
      this.showTooltip(element2, animation);
    };
    Tooltip2.prototype.close = function(animation) {
      if (!animation) {
        animation = this.animation.close;
      }
      this.hideTooltip(animation);
    };
    Tooltip2.prototype.refresh = function(target) {
      if (this.tooltipEle) {
        this.renderContent(target);
      }
      if (this.popupObj && target) {
        this.reposition(target);
      }
      if (!isNullOrUndefined(this.targetsList) && !isNullOrUndefined(this.target)) {
        var target_2 = selectAll(this.target, this.element);
        if (target_2.length !== this.targetsList.length) {
          this.unwireEvents(this.opensOn);
          this.wireEvents(this.opensOn);
        }
      }
    };
    Tooltip2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      if (this.tooltipEle) {
        remove(this.tooltipEle);
      }
      if (this.popupObj) {
        this.popupObj.destroy();
      }
      removeClass([this.element], ROOT2);
      this.unwireEvents(this.opensOn);
      this.unwireMouseEvents(this.element);
      this.tooltipEle = null;
      this.popupObj = null;
      var currentTarget = selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', this.element);
      for (var _i = 0, currentTarget_1 = currentTarget; _i < currentTarget_1.length; _i++) {
        var target = currentTarget_1[_i];
        this.restoreElement(target);
      }
    };
    __decorate11([
      Property("auto")
    ], Tooltip2.prototype, "width", void 0);
    __decorate11([
      Property("auto")
    ], Tooltip2.prototype, "height", void 0);
    __decorate11([
      Property()
    ], Tooltip2.prototype, "content", void 0);
    __decorate11([
      Property("body")
    ], Tooltip2.prototype, "container", void 0);
    __decorate11([
      Property()
    ], Tooltip2.prototype, "target", void 0);
    __decorate11([
      Property("TopCenter")
    ], Tooltip2.prototype, "position", void 0);
    __decorate11([
      Property(0)
    ], Tooltip2.prototype, "offsetX", void 0);
    __decorate11([
      Property(0)
    ], Tooltip2.prototype, "offsetY", void 0);
    __decorate11([
      Property(true)
    ], Tooltip2.prototype, "showTipPointer", void 0);
    __decorate11([
      Property(true)
    ], Tooltip2.prototype, "enableHtmlParse", void 0);
    __decorate11([
      Property(false)
    ], Tooltip2.prototype, "windowCollision", void 0);
    __decorate11([
      Property("Auto")
    ], Tooltip2.prototype, "tipPointerPosition", void 0);
    __decorate11([
      Property("Auto")
    ], Tooltip2.prototype, "opensOn", void 0);
    __decorate11([
      Property(false)
    ], Tooltip2.prototype, "mouseTrail", void 0);
    __decorate11([
      Property(false)
    ], Tooltip2.prototype, "isSticky", void 0);
    __decorate11([
      Complex({}, Animation2)
    ], Tooltip2.prototype, "animation", void 0);
    __decorate11([
      Property(0)
    ], Tooltip2.prototype, "openDelay", void 0);
    __decorate11([
      Property(0)
    ], Tooltip2.prototype, "closeDelay", void 0);
    __decorate11([
      Property()
    ], Tooltip2.prototype, "cssClass", void 0);
    __decorate11([
      Property(false)
    ], Tooltip2.prototype, "enableHtmlSanitizer", void 0);
    __decorate11([
      Property("")
    ], Tooltip2.prototype, "htmlAttributes", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "beforeRender", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "beforeOpen", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "afterOpen", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "beforeClose", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "afterClose", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "beforeCollision", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "created", void 0);
    __decorate11([
      Event()
    ], Tooltip2.prototype, "destroyed", void 0);
    Tooltip2 = __decorate11([
      NotifyPropertyChanges
    ], Tooltip2);
    return Tooltip2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-popups/node_modules/@syncfusion/ej2-popups/src/spinner/spinner.js
var globalTimeOut = {};
var DEFT_MAT_WIDTH = 30;
var DEFT_MAT3_WIDTH = 30;
var DEFT_FAB_WIDTH = 30;
var DEFT_FLUENT_WIDTH = 30;
var DEFT_BOOT_WIDTH = 30;
var DEFT_BOOT4_WIDTH = 36;
var DEFT_BOOT5_WIDTH = 36;
var CLS_SHOWSPIN = "e-spin-show";
var CLS_HIDESPIN = "e-spin-hide";
var CLS_MATERIALSPIN = "e-spin-material";
var CLS_MATERIAL3SPIN = "e-spin-material3";
var CLS_FABRICSPIN = "e-spin-fabric";
var CLS_FLUENTSPIN = "e-spin-fluent";
var CLS_TAILWINDSPIN = "e-spin-tailwind";
var CLS_BOOTSPIN = "e-spin-bootstrap";
var CLS_BOOT4SPIN = "e-spin-bootstrap4";
var CLS_BOOT5SPIN = "e-spin-bootstrap5";
var CLS_HIGHCONTRASTSPIN = "e-spin-high-contrast";
var CLS_SPINWRAP = "e-spinner-pane";
var CLS_SPININWRAP = "e-spinner-inner";
var CLS_SPINCIRCLE = "e-path-circle";
var CLS_SPINARC = "e-path-arc";
var CLS_SPINLABEL = "e-spin-label";
var CLS_SPINTEMPLATE = "e-spin-template";
var spinTemplate = null;
var spinCSSClass = null;
function Spinner(action, options, target, type) {
  switch (action) {
    case "Create":
      var element2 = document.querySelector(options.target);
      var args = {
        type,
        target: element2,
        cssClass: options.cssClass,
        label: options.label,
        width: options.width
      };
      createSpinner(args);
      break;
    case "Show":
      showSpinner(document.querySelector(target));
      break;
    case "Hide":
      hideSpinner(document.querySelector(target));
      break;
    case "Set":
      var setArgs = { cssClass: options.cssClass, type };
      setSpinner(setArgs);
      break;
  }
}
function createSpinner(args, internalCreateElement) {
  var _a;
  if (!args.target) {
    return;
  }
  var radius;
  var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
  var container = create_spinner_container(args.target, makeElement);
  if (!isNullOrUndefined(args.cssClass)) {
    var classNames2 = args.cssClass.split(" ").filter(function(className) {
      return className.trim() !== "";
    });
    (_a = container.wrap.classList).add.apply(_a, classNames2);
  }
  if (!isNullOrUndefined(args.template) || !isNullOrUndefined(spinTemplate)) {
    var template = !isNullOrUndefined(args.template) ? args.template : spinTemplate;
    container.wrap.classList.add(CLS_SPINTEMPLATE);
    replaceContent(container.wrap, template, spinCSSClass);
  } else {
    var theme = !isNullOrUndefined(args.type) ? args.type : getTheme(container.wrap);
    var width = !isNullOrUndefined(args.width) ? args.width : void 0;
    radius = calculateRadius(width, theme);
    setTheme(theme, container.wrap, radius, makeElement);
    if (!isNullOrUndefined(args.label)) {
      createLabel(container.inner_wrap, args.label, makeElement);
    }
  }
  container.wrap.classList.add(CLS_HIDESPIN);
  container = null;
}
function createLabel(container, label, makeElement) {
  var labelEle = makeElement("div", {});
  labelEle.classList.add(CLS_SPINLABEL);
  labelEle.innerHTML = label;
  container.appendChild(labelEle);
  return labelEle;
}
function createMaterialSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIALSPIN);
  mat_calculate_attributes(radius, container, "Material", CLS_MATERIALSPIN);
}
function createMaterial3Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material3", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIAL3SPIN);
  mat_calculate_attributes(radius, container, "Material3", CLS_MATERIAL3SPIN);
}
function createBootstrap4Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap4", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT4SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap4", CLS_BOOT4SPIN);
}
function createBootstrap5Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap5", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT5SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap5", CLS_BOOT5SPIN);
}
function startMatAnimate(container, uniqueID, radius) {
  var globalObject = {};
  var timeOutVar = 0;
  globalTimeOut["" + uniqueID].timeOut = 0;
  globalObject["" + uniqueID] = globalVariables(uniqueID, radius, 0, 0);
  var spinnerInfo = { uniqueID, container, globalInfo: globalObject, timeOutVar };
  animateMaterial(spinnerInfo);
}
function createFabricSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fabric", radius };
  create_fabric_element(container, uniqueID, CLS_FABRICSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FABRICSPIN);
}
function createFluentSinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fluent", radius };
  create_fabric_element(container, uniqueID, CLS_FLUENTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FLUENTSPIN);
}
function createTailwindSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Tailwind", radius };
  create_fabric_element(container, uniqueID, CLS_TAILWINDSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_TAILWINDSPIN);
}
function createHighContrastSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "HighContrast", radius };
  create_fabric_element(container, uniqueID, CLS_HIGHCONTRASTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_HIGHCONTRASTSPIN);
}
function getTheme(container) {
  var theme = window.getComputedStyle(container, ":after").getPropertyValue("content");
  return theme.replace(/['"]+/g, "");
}
function setTheme(theme, container, radius, makeElement) {
  var innerContainer = container.querySelector("." + CLS_SPININWRAP);
  var svg = innerContainer.querySelector("svg");
  if (!isNullOrUndefined(svg)) {
    innerContainer.removeChild(svg);
  }
  switch (theme) {
    case "Material":
      createMaterialSpinner(innerContainer, radius, makeElement);
      break;
    case "Material3":
      createMaterial3Spinner(innerContainer, radius, makeElement);
      break;
    case "Fabric":
      createFabricSpinner(innerContainer, radius, makeElement);
      break;
    case "Fluent":
      createFluentSinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap":
      createBootstrapSpinner(innerContainer, radius, makeElement);
      break;
    case "HighContrast":
      createHighContrastSpinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap4":
      createBootstrap4Spinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap5":
      createBootstrap5Spinner(innerContainer, radius, makeElement);
      break;
    case "Tailwind":
    case "Tailwind-dark":
      createTailwindSpinner(innerContainer, radius, makeElement);
      break;
  }
}
function createBootstrapSpinner(innerContainer, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap", radius };
  create_bootstrap_element(innerContainer, uniqueID, makeElement);
  boot_calculate_attributes(innerContainer, radius);
}
function create_bootstrap_element(innerContainer, uniqueID, makeElement) {
  var svgBoot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var viewBoxValue = 64;
  var trans = 32;
  var defaultRadius = 2;
  svgBoot.setAttribute("id", uniqueID);
  svgBoot.setAttribute("class", CLS_BOOTSPIN);
  svgBoot.setAttribute("viewBox", "0 0 " + viewBoxValue + " " + viewBoxValue);
  innerContainer.insertBefore(svgBoot, innerContainer.firstChild);
  for (var item = 0; item <= 7; item++) {
    var bootCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bootCircle.setAttribute("class", CLS_SPINCIRCLE + "_" + item);
    bootCircle.setAttribute("r", defaultRadius + "");
    bootCircle.setAttribute("transform", "translate(" + trans + "," + trans + ")");
    svgBoot.appendChild(bootCircle);
  }
}
function boot_calculate_attributes(innerContainer, radius) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var x = 0;
  var y = 0;
  var rad = 24;
  svg.style.width = svg.style.height = radius + "px";
  var startArc = 90;
  for (var item = 0; item <= 7; item++) {
    var start = defineArcPoints(x, y, rad, startArc);
    var circleEle = svg.querySelector("." + CLS_SPINCIRCLE + "_" + item);
    circleEle.setAttribute("cx", start.x + "");
    circleEle.setAttribute("cy", start.y + "");
    startArc = startArc >= 360 ? 0 : startArc;
    startArc = startArc + 45;
  }
}
function generateSeries(begin, stop) {
  var series = [];
  var start = begin;
  var end = stop;
  var increment = false, count = 1;
  formSeries(start);
  function formSeries(i) {
    series.push(i);
    if (i !== end || count === 1) {
      if (i <= start && i > 1 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      } else if (i === 1) {
        i = 7;
        i = parseFloat((i + 0.2).toFixed(2));
        increment = true;
      } else if (i < 8 && increment) {
        i = parseFloat((i + 0.2).toFixed(2));
        if (i === 8) {
          increment = false;
        }
      } else if (i <= 8 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      }
      ++count;
      formSeries(i);
    }
  }
  return series;
}
function animateBootstrap(innerContainer) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var id = svg.getAttribute("id");
  for (var i = 1; i <= 8; i++) {
    var circleEle = innerContainer.getElementsByClassName("e-path-circle_" + (i === 8 ? 0 : i))[0];
    rotation(circleEle, i, i, generateSeries(i, i), id);
  }
  function rotation(circle, start, end, series, id2) {
    var count = 0;
    boot_animate(start);
    function boot_animate(radius) {
      if (globalTimeOut["" + id2].isAnimate) {
        ++count;
        circle.setAttribute("r", radius + "");
        if (count >= series.length) {
          count = 0;
        }
        globalTimeOut[id2].timeOut = setTimeout(boot_animate.bind(null, series[count]), 18);
      }
    }
  }
}
function replaceContent(container, template, cssClass) {
  if (!isNullOrUndefined(cssClass)) {
    container.classList.add(cssClass);
  }
  var inner = container.querySelector(".e-spinner-inner");
  inner.innerHTML = template;
}
function calculateRadius(width, theme) {
  var defaultSize;
  switch (theme) {
    case "Material":
      defaultSize = DEFT_MAT_WIDTH;
      break;
    case "Material3":
      defaultSize = DEFT_MAT3_WIDTH;
      break;
    case "Fabric":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Tailwind":
    case "Tailwind-dark":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Fluent":
      defaultSize = DEFT_FLUENT_WIDTH;
      break;
    case "Bootstrap4":
      defaultSize = DEFT_BOOT4_WIDTH;
      break;
    case "Bootstrap5":
      defaultSize = DEFT_BOOT5_WIDTH;
      break;
    default:
      defaultSize = DEFT_BOOT_WIDTH;
  }
  width = width ? parseFloat(width + "") : defaultSize;
  return theme === "Bootstrap" ? width : width / 2;
}
function globalVariables(id, radius, count, previousId) {
  return {
    radius,
    count,
    previousId
  };
}
function random_generator() {
  var random = "";
  var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    random += combine.charAt(Math.floor(Math.random() * combine.length));
  }
  return random;
}
function create_fabric_element(innerCon, uniqueID, themeClass, makeElement) {
  var svgFabric = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgFabric.setAttribute("id", uniqueID);
  svgFabric.setAttribute("class", themeClass);
  var fabricCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  var fabricCircleArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCircleArc.setAttribute("class", CLS_SPINARC);
  innerCon.insertBefore(svgFabric, innerCon.firstChild);
  svgFabric.appendChild(fabricCirclePath);
  svgFabric.appendChild(fabricCircleArc);
}
function create_material_element(innerContainer, uniqueID, makeElement, cls) {
  var svgMaterial = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var matCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svgMaterial.setAttribute("class", cls);
  svgMaterial.setAttribute("id", uniqueID);
  matCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  innerContainer.insertBefore(svgMaterial, innerContainer.firstChild);
  svgMaterial.appendChild(matCirclePath);
}
function create_spinner_container(target, makeElement) {
  var spinnerContainer = makeElement("div", {});
  var spinnerInnerContainer = makeElement("div", {});
  spinnerContainer.classList.add(CLS_SPINWRAP);
  spinnerInnerContainer.classList.add(CLS_SPININWRAP);
  spinnerInnerContainer.setAttribute("aria-disabled", "true");
  target.appendChild(spinnerContainer);
  spinnerContainer.appendChild(spinnerInnerContainer);
  return { wrap: spinnerContainer, inner_wrap: spinnerInnerContainer };
}
function animateMaterial(spinnerInfo) {
  var start = 1;
  var end = 149;
  var duration = 1333;
  var max = 75;
  createCircle(start, end, easeAnimation, duration, spinnerInfo.globalInfo[spinnerInfo.uniqueID].count, max, spinnerInfo);
  spinnerInfo.globalInfo[spinnerInfo.uniqueID].count = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].count % 4;
}
function createCircle(start, end, easing, duration, count, max, spinnerInfo) {
  var id = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var change = end - start;
  var diameter = getSize(spinnerInfo.globalInfo[spinnerInfo.uniqueID].radius * 2 + "");
  var strokeSize = getStrokeSize(diameter);
  var rotate = -90 * (spinnerInfo.globalInfo[spinnerInfo.uniqueID].count || 0);
  mat_animation(spinnerInfo);
  function mat_animation(spinnerInfo2) {
    var currentTime = Math.max(0, Math.min((/* @__PURE__ */ new Date()).getTime() - startTime, duration));
    updatePath(easing(currentTime, start, change, duration), spinnerInfo2.container);
    if (id === spinnerInfo2.globalInfo[spinnerInfo2.uniqueID].previousId && currentTime < duration) {
      globalTimeOut[spinnerInfo2.uniqueID].timeOut = setTimeout(mat_animation.bind(null, spinnerInfo2), 1);
    } else {
      animateMaterial(spinnerInfo2);
    }
  }
  function updatePath(value, container) {
    if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) || !isNullOrUndefined(container.querySelector("svg.e-spin-material3"))) {
      var svg = void 0;
      if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material");
      } else if (!isNullOrUndefined(container.querySelector("svg.e-spin-material3")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material3").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material3");
      }
      if (!isNullOrUndefined(svg)) {
        var path = svg.querySelector("path.e-path-circle");
        path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, value, max) + "");
        path.setAttribute("transform", "rotate(" + rotate + " " + diameter / 2 + " " + diameter / 2 + ")");
      }
    }
  }
}
function mat_calculate_attributes(radius, container, type, cls) {
  var diameter = radius * 2;
  var svg = container.querySelector("svg." + cls);
  var path = svg.querySelector("path.e-path-circle");
  var strokeSize = getStrokeSize(diameter);
  var transformOrigin = diameter / 2 + "px";
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.width = svg.style.height = diameter + "px";
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  path.setAttribute("d", drawArc(diameter, strokeSize));
  if (type === "Material" || type === "Material3") {
    path.setAttribute("stroke-width", strokeSize + "");
    path.setAttribute("stroke-dasharray", (diameter - strokeSize) * Math.PI * 0.75 + "");
    path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, 1, 75) + "");
  }
}
function getSize(value) {
  var parsed = parseFloat(value);
  return parsed;
}
function drawArc(diameter, strokeSize) {
  var radius = diameter / 2;
  var offset = strokeSize / 2;
  return "M" + radius + "," + offset + "A" + (radius - offset) + "," + (radius - offset) + " 0 1 1 " + offset + "," + radius;
}
function getStrokeSize(diameter) {
  return 10 / 100 * diameter;
}
function getDashOffset(diameter, strokeSize, value, max) {
  return (diameter - strokeSize) * Math.PI * (3 * max / 100 - value / 100);
}
function easeAnimation(current, start, change, duration) {
  var timestamp = (current /= duration) * current;
  var timecount = timestamp * current;
  return start + change * (6 * timecount * timestamp + -15 * timestamp * timestamp + 10 * timecount);
}
function fb_calculate_attributes(radius, innerConainer, trgClass) {
  var centerX = radius;
  var centerY = radius;
  var diameter = radius * 2;
  var startArc = 315, endArc = 45;
  var svg = innerConainer.querySelector("." + trgClass);
  var circle = svg.querySelector(".e-path-circle");
  var path = svg.querySelector(".e-path-arc");
  var transformOrigin = diameter / 2 + "px";
  circle.setAttribute("d", defineCircle(centerX, centerY, radius));
  path.setAttribute("d", defineArc(centerX, centerY, radius, startArc, endArc));
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  svg.style.width = svg.style.height = diameter + "px";
}
function defineArcPoints(centerX, centerY, radius, angle) {
  var radians = (angle - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians)
  };
}
function defineArc(x, y, radius, startArc, endArc) {
  var start = defineArcPoints(x, y, radius, endArc);
  var end = defineArcPoints(x, y, radius, startArc);
  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    0,
    0,
    end.x,
    end.y
  ].join(" ");
  return d;
}
function defineCircle(x, y, radius) {
  var d = [
    "M",
    x,
    y,
    "m",
    -radius,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    radius * 2,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    -radius * 2,
    0
  ].join(" ");
  return d;
}
function showSpinner(container) {
  showHideSpinner(container, false);
  container = null;
}
function showHideSpinner(container, isHide) {
  var spinnerWrap;
  if (container) {
    if (container.classList.contains(CLS_SPINWRAP)) {
      spinnerWrap = container;
    } else {
      var spinWrapCollection = container.querySelectorAll("." + CLS_SPINWRAP);
      if (Browser.isIE) {
        for (var i = 0; i < spinWrapCollection.length; i++) {
          if (spinWrapCollection[i].parentElement && spinWrapCollection[i].parentElement === container) {
            spinnerWrap = spinWrapCollection[i];
            break;
          }
        }
      } else {
        spinnerWrap = Array.from(spinWrapCollection).find(function(wrap) {
          return wrap.parentElement === container;
        }) || null;
      }
    }
  }
  if (container && spinnerWrap) {
    var inner = spinnerWrap.querySelector("." + CLS_SPININWRAP);
    var spinCheck = void 0;
    spinCheck = isHide ? !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_HIDESPIN) : !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_SHOWSPIN);
    if (spinCheck) {
      var svgEle = spinnerWrap.querySelector("svg");
      if (isNullOrUndefined(svgEle)) {
        return;
      }
      var id = svgEle.getAttribute("id");
      globalTimeOut["" + id].isAnimate = !isHide;
      switch (globalTimeOut["" + id].type) {
        case "Material":
        case "Material3":
          isHide ? clearTimeout(globalTimeOut[id].timeOut) : startMatAnimate(inner, id, globalTimeOut[id].radius);
          break;
        case "Bootstrap":
          isHide ? clearTimeout(globalTimeOut[id].timeOut) : animateBootstrap(inner);
          break;
      }
    }
    isHide ? classList(spinnerWrap, [CLS_HIDESPIN], [CLS_SHOWSPIN]) : classList(spinnerWrap, [CLS_SHOWSPIN], [CLS_HIDESPIN]);
    container = null;
  }
}
function hideSpinner(container) {
  showHideSpinner(container, true);
  container = null;
}
function setSpinner(args, internalCreateElement) {
  var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
  if (args.template !== void 0) {
    spinTemplate = args.template;
    if (args.template !== void 0) {
      spinCSSClass = args.cssClass;
    }
  }
  var container = document.querySelectorAll("." + CLS_SPINWRAP);
  for (var index = 0; index < container.length; index++) {
    ensureTemplate(args.template, container[index], args.type, args.cssClass, makeElement);
  }
}
function ensureTemplate(template, container, theme, cssClass, makeEle) {
  if (isNullOrUndefined(template) && !container.classList.contains(CLS_SPINTEMPLATE)) {
    replaceTheme(container, theme, cssClass, makeEle);
    if (container.classList.contains(CLS_SHOWSPIN)) {
      container.classList.remove(CLS_SHOWSPIN);
      showSpinner(container);
    } else {
      container.classList.remove(CLS_HIDESPIN);
      hideSpinner(container);
    }
  } else {
    spinTemplate = template;
    if (!isNullOrUndefined(cssClass)) {
      spinCSSClass = cssClass;
    }
    if (!isNullOrUndefined(spinTemplate)) {
      replaceContent(container, spinTemplate, spinCSSClass);
    }
  }
}
function replaceTheme(container, theme, cssClass, makeEle) {
  if (!isNullOrUndefined(cssClass)) {
    container.classList.add(cssClass);
  }
  var svgElement = container.querySelector("svg");
  if (!isNullOrUndefined(svgElement)) {
    var radius = theme === "Bootstrap" ? parseFloat(svgElement.style.height) : parseFloat(svgElement.style.height) / 2;
    var classNames2 = svgElement.getAttribute("class");
    var svgClassList = classNames2.split(/\s/);
    if (svgClassList.indexOf("e-spin-material") >= 0) {
      var id = svgElement.getAttribute("id");
      clearTimeout(globalTimeOut["" + id].timeOut);
    }
    setTheme(theme, container, radius, makeEle);
  }
}

// node_modules/@syncfusion/ej2-angular-popups/fesm2020/syncfusion-ej2-angular-popups.mjs
var _c0 = ["footerTemplate"];
var _c1 = ["header"];
var _c2 = ["content"];
var _c3 = ["*"];
var input = ["buttonModel", "isFlat", "type"];
var outputs$2 = ["click"];
var DialogButtonDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue2("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$2);
    this.directivePropList = input;
  }
};
DialogButtonDirective.ɵfac = function DialogButtonDirective_Factory(t) {
  return new (t || DialogButtonDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
DialogButtonDirective.ɵdir = ɵɵdefineDirective({
  type: DialogButtonDirective,
  selectors: [["e-dialogbutton"]],
  inputs: {
    buttonModel: "buttonModel",
    isFlat: "isFlat",
    type: "type"
  },
  outputs: {
    click: "click"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogButtonDirective, [{
    type: Directive,
    args: [{
      selector: "e-buttons>e-dialogbutton",
      inputs: input,
      outputs: outputs$2,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var ButtonsDirective = class extends ArrayBase {
  constructor() {
    super("buttons");
  }
};
ButtonsDirective.ɵfac = function ButtonsDirective_Factory(t) {
  return new (t || ButtonsDirective)();
};
ButtonsDirective.ɵdir = ɵɵdefineDirective({
  type: ButtonsDirective,
  selectors: [["e-buttons"]],
  contentQueries: function ButtonsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, DialogButtonDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-dialog>e-buttons",
      queries: {
        children: new ContentChildren(DialogButtonDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$1 = ["allowDragging", "animationSettings", "buttons", "closeOnEscape", "content", "cssClass", "enableHtmlSanitizer", "enablePersistence", "enableResize", "enableRtl", "footerTemplate", "header", "height", "isModal", "locale", "minHeight", "position", "resizeHandles", "showCloseIcon", "target", "visible", "width", "zIndex"];
var outputs$1 = ["beforeClose", "beforeOpen", "beforeSanitizeHtml", "close", "created", "destroyed", "drag", "dragStart", "dragStop", "open", "overlayClick", "resizeStart", "resizeStop", "resizing", "visibleChange"];
var twoWays$1 = ["visible"];
var DialogComponent = class DialogComponent2 extends Dialog {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["buttons"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$1);
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
    this.tagObjects[0].instance = this.childButtons;
    this.containerContext.ngAfterContentChecked(this);
  }
};
DialogComponent.ɵfac = function DialogComponent_Factory(t) {
  return new (t || DialogComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
DialogComponent.ɵcmp = ɵɵdefineComponent({
  type: DialogComponent,
  selectors: [["ejs-dialog"]],
  contentQueries: function DialogComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c0, 5);
      ɵɵcontentQuery(dirIndex, _c1, 5);
      ɵɵcontentQuery(dirIndex, _c2, 5);
      ɵɵcontentQuery(dirIndex, ButtonsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childButtons = _t.first);
    }
  },
  inputs: {
    allowDragging: "allowDragging",
    animationSettings: "animationSettings",
    buttons: "buttons",
    closeOnEscape: "closeOnEscape",
    content: "content",
    cssClass: "cssClass",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableResize: "enableResize",
    enableRtl: "enableRtl",
    footerTemplate: "footerTemplate",
    header: "header",
    height: "height",
    isModal: "isModal",
    locale: "locale",
    minHeight: "minHeight",
    position: "position",
    resizeHandles: "resizeHandles",
    showCloseIcon: "showCloseIcon",
    target: "target",
    visible: "visible",
    width: "width",
    zIndex: "zIndex"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeOpen: "beforeOpen",
    beforeSanitizeHtml: "beforeSanitizeHtml",
    close: "close",
    created: "created",
    destroyed: "destroyed",
    drag: "drag",
    dragStart: "dragStart",
    dragStop: "dragStop",
    open: "open",
    overlayClick: "overlayClick",
    resizeStart: "resizeStart",
    resizeStop: "resizeStop",
    resizing: "resizing",
    visibleChange: "visibleChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c3,
  decls: 1,
  vars: 0,
  template: function DialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], DialogComponent.prototype, "footerTemplate", void 0);
__decorate([Template()], DialogComponent.prototype, "header", void 0);
__decorate([Template()], DialogComponent.prototype, "content", void 0);
DialogComponent = __decorate([ComponentMixins([ComponentBase])], DialogComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogComponent, [{
    type: Component,
    args: [{
      selector: "ejs-dialog",
      inputs: inputs$1,
      outputs: outputs$1,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childButtons: new ContentChild(ButtonsDirective)
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
    footerTemplate: [{
      type: ContentChild,
      args: ["footerTemplate"]
    }],
    header: [{
      type: ContentChild,
      args: ["header"]
    }],
    content: [{
      type: ContentChild,
      args: ["content"]
    }]
  });
})();
var DialogModule = class {
};
DialogModule.ɵfac = function DialogModule_Factory(t) {
  return new (t || DialogModule)();
};
DialogModule.ɵmod = ɵɵdefineNgModule({
  type: DialogModule,
  declarations: [DialogComponent, DialogButtonDirective, ButtonsDirective],
  imports: [CommonModule],
  exports: [DialogComponent, DialogButtonDirective, ButtonsDirective]
});
DialogModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [DialogComponent, DialogButtonDirective, ButtonsDirective],
      exports: [DialogComponent, DialogButtonDirective, ButtonsDirective]
    }]
  }], null, null);
})();
var DialogAllModule = class {
};
DialogAllModule.ɵfac = function DialogAllModule_Factory(t) {
  return new (t || DialogAllModule)();
};
DialogAllModule.ɵmod = ɵɵdefineNgModule({
  type: DialogAllModule,
  imports: [CommonModule, DialogModule],
  exports: [DialogModule]
});
DialogAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, DialogModule], DialogModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, DialogModule],
      exports: [DialogModule],
      providers: []
    }]
  }], null, null);
})();
var inputs = ["animation", "closeDelay", "container", "content", "cssClass", "enableHtmlParse", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "height", "htmlAttributes", "isSticky", "locale", "mouseTrail", "offsetX", "offsetY", "openDelay", "opensOn", "position", "showTipPointer", "target", "tipPointerPosition", "width", "windowCollision"];
var outputs = ["afterClose", "afterOpen", "beforeClose", "beforeCollision", "beforeOpen", "beforeRender", "created", "destroyed"];
var twoWays = [""];
var TooltipComponent = class TooltipComponent2 extends Tooltip {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
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
    this.containerContext.ngAfterContentChecked(this);
  }
};
TooltipComponent.ɵfac = function TooltipComponent_Factory(t) {
  return new (t || TooltipComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
TooltipComponent.ɵcmp = ɵɵdefineComponent({
  type: TooltipComponent,
  selectors: [["ejs-tooltip"]],
  contentQueries: function TooltipComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
    }
  },
  inputs: {
    animation: "animation",
    closeDelay: "closeDelay",
    container: "container",
    content: "content",
    cssClass: "cssClass",
    enableHtmlParse: "enableHtmlParse",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    height: "height",
    htmlAttributes: "htmlAttributes",
    isSticky: "isSticky",
    locale: "locale",
    mouseTrail: "mouseTrail",
    offsetX: "offsetX",
    offsetY: "offsetY",
    openDelay: "openDelay",
    opensOn: "opensOn",
    position: "position",
    showTipPointer: "showTipPointer",
    target: "target",
    tipPointerPosition: "tipPointerPosition",
    width: "width",
    windowCollision: "windowCollision"
  },
  outputs: {
    afterClose: "afterClose",
    afterOpen: "afterOpen",
    beforeClose: "beforeClose",
    beforeCollision: "beforeCollision",
    beforeOpen: "beforeOpen",
    beforeRender: "beforeRender",
    created: "created",
    destroyed: "destroyed"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c3,
  decls: 1,
  vars: 0,
  template: function TooltipComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], TooltipComponent.prototype, "content", void 0);
TooltipComponent = __decorate([ComponentMixins([ComponentBase])], TooltipComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "ejs-tooltip",
      inputs,
      outputs,
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
  }, {
    content: [{
      type: ContentChild,
      args: ["content"]
    }]
  });
})();
var TooltipModule = class {
};
TooltipModule.ɵfac = function TooltipModule_Factory(t) {
  return new (t || TooltipModule)();
};
TooltipModule.ɵmod = ɵɵdefineNgModule({
  type: TooltipModule,
  declarations: [TooltipComponent],
  imports: [CommonModule],
  exports: [TooltipComponent]
});
TooltipModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [TooltipComponent],
      exports: [TooltipComponent]
    }]
  }], null, null);
})();
var TooltipAllModule = class {
};
TooltipAllModule.ɵfac = function TooltipAllModule_Factory(t) {
  return new (t || TooltipAllModule)();
};
TooltipAllModule.ɵmod = ɵɵdefineNgModule({
  type: TooltipAllModule,
  imports: [CommonModule, TooltipModule],
  exports: [TooltipModule]
});
TooltipAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, TooltipModule], TooltipModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TooltipModule],
      exports: [TooltipModule],
      providers: []
    }]
  }], null, null);
})();
export {
  Animation2 as Animation,
  AnimationSettings,
  ButtonProps,
  ButtonsDirective,
  Dialog,
  DialogAllModule,
  DialogButtonDirective,
  DialogComponent,
  DialogModule,
  DialogUtility,
  Popup,
  PositionData,
  Spinner,
  Tooltip,
  TooltipAllModule,
  TooltipComponent,
  TooltipModule,
  calculatePosition,
  calculateRelativeBasedPosition,
  createSpinner,
  fit,
  flip,
  getMaxZindex,
  getScrollableParent,
  getZindexPartial,
  hideSpinner,
  isCollide,
  setSpinner,
  showSpinner
};
//# sourceMappingURL=@syncfusion_ej2-angular-popups.js.map
