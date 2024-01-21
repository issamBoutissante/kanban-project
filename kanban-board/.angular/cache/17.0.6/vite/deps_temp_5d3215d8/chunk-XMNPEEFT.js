import {
  Fetch,
  extend,
  getValue,
  isNullOrUndefined,
  merge,
  setValue
} from "./chunk-6LU2UWWE.js";

// node_modules/@syncfusion/ej2-data/src/adaptors.js
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
var consts = { GroupGuid: "{271bbba0-1ee7}" };
var Adaptor = (
  /** @class */
  function() {
    function Adaptor2(ds) {
      this.options = {
        from: "table",
        requestType: "json",
        sortBy: "sorted",
        select: "select",
        skip: "skip",
        group: "group",
        take: "take",
        search: "search",
        count: "requiresCounts",
        where: "where",
        aggregates: "aggregates",
        expand: "expand"
      };
      this.type = Adaptor2;
      this.dataSource = ds;
      this.pvt = {};
    }
    Adaptor2.prototype.processResponse = function(data, ds, query, xhr) {
      return data;
    };
    return Adaptor2;
  }()
);
var JsonAdaptor = (
  /** @class */
  function(_super) {
    __extends(JsonAdaptor2, _super);
    function JsonAdaptor2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonAdaptor2.prototype.processQuery = function(dataManager, query) {
      var result = dataManager.dataSource.json.slice(0);
      var count = result.length;
      var countFlg = true;
      var ret;
      var key;
      var lazyLoad = {};
      var keyCount = 0;
      var group = [];
      var page;
      for (var i = 0; i < query.lazyLoad.length; i++) {
        keyCount++;
        lazyLoad[query.lazyLoad[i].key] = query.lazyLoad[i].value;
      }
      var agg = {};
      for (var i = 0; i < query.queries.length; i++) {
        key = query.queries[i];
        if ((key.fn === "onPage" || key.fn === "onGroup") && query.lazyLoad.length) {
          if (key.fn === "onGroup") {
            group.push(key.e);
          }
          if (key.fn === "onPage") {
            page = key.e;
          }
          continue;
        }
        ret = this[key.fn].call(this, result, key.e, query);
        if (key.fn === "onAggregates") {
          agg[key.e.field + " - " + key.e.type] = ret;
        } else {
          result = ret !== void 0 ? ret : result;
        }
        if (key.fn === "onPage" || key.fn === "onSkip" || key.fn === "onTake" || key.fn === "onRange") {
          countFlg = false;
        }
        if (countFlg) {
          count = result.length;
        }
      }
      if (keyCount) {
        var args = {
          query,
          lazyLoad,
          result,
          group,
          page
        };
        var lazyLoadData = this.lazyLoadGroup(args);
        result = lazyLoadData.result;
        count = lazyLoadData.count;
      }
      if (query.isCountRequired) {
        result = {
          result,
          count,
          aggregates: agg
        };
      }
      return result;
    };
    JsonAdaptor2.prototype.lazyLoadGroup = function(args) {
      var count = 0;
      var agg = this.getAggregate(args.query);
      var result = args.result;
      if (!isNullOrUndefined(args.lazyLoad.onDemandGroupInfo)) {
        var req = args.lazyLoad.onDemandGroupInfo;
        for (var i = req.where.length - 1; i >= 0; i--) {
          result = this.onWhere(result, req.where[i]);
        }
        if (args.group.length !== req.level) {
          var field = args.group[req.level].fieldName;
          result = DataUtil.group(result, field, agg, null, null, args.group[0].comparer, true);
        }
        count = result.length;
        var data = result;
        result = result.slice(req.skip);
        result = result.slice(0, req.take);
        if (args.group.length !== req.level) {
          this.formGroupResult(result, data);
        }
      } else {
        var field = args.group[0].fieldName;
        result = DataUtil.group(result, field, agg, null, null, args.group[0].comparer, true);
        count = result.length;
        var data = result;
        if (args.page) {
          result = this.onPage(result, args.page, args.query);
        }
        this.formGroupResult(result, data);
      }
      return { result, count };
    };
    JsonAdaptor2.prototype.formGroupResult = function(result, data) {
      if (result.length && data.length) {
        var uid = "GroupGuid";
        var childLevel = "childLevels";
        var level = "level";
        var records = "records";
        result[uid] = data[uid];
        result[childLevel] = data[childLevel];
        result[level] = data[level];
        result[records] = data[records];
      }
      return result;
    };
    JsonAdaptor2.prototype.getAggregate = function(query) {
      var aggQuery = Query.filterQueries(query.queries, "onAggregates");
      var agg = [];
      if (aggQuery.length) {
        var tmp = void 0;
        for (var i = 0; i < aggQuery.length; i++) {
          tmp = aggQuery[i].e;
          agg.push({ type: tmp.type, field: DataUtil.getValue(tmp.field, query) });
        }
      }
      return agg;
    };
    JsonAdaptor2.prototype.batchRequest = function(dm, changes, e) {
      var i;
      var deletedRecordsLen = changes.deletedRecords.length;
      for (i = 0; i < changes.addedRecords.length; i++) {
        this.insert(dm, changes.addedRecords[i]);
      }
      for (i = 0; i < changes.changedRecords.length; i++) {
        this.update(dm, e.key, changes.changedRecords[i]);
      }
      for (i = 0; i < deletedRecordsLen; i++) {
        this.remove(dm, e.key, changes.deletedRecords[i]);
      }
      return changes;
    };
    JsonAdaptor2.prototype.onWhere = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      return ds.filter(function(obj) {
        if (e) {
          return e.validate(obj);
        }
      });
    };
    JsonAdaptor2.prototype.onAggregates = function(ds, e) {
      var fn = DataUtil.aggregates[e.type];
      if (!ds || !fn || ds.length === 0) {
        return null;
      }
      return fn(ds, e.field);
    };
    JsonAdaptor2.prototype.onSearch = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      if (e.fieldNames.length === 0) {
        DataUtil.getFieldList(ds[0], e.fieldNames);
      }
      return ds.filter(function(obj) {
        for (var j = 0; j < e.fieldNames.length; j++) {
          if (e.comparer.call(obj, DataUtil.getObject(e.fieldNames[j], obj), e.searchKey, e.ignoreCase, e.ignoreAccent)) {
            return true;
          }
        }
        return false;
      });
    };
    JsonAdaptor2.prototype.onSortBy = function(ds, e, query) {
      if (!ds || !ds.length) {
        return ds;
      }
      var fnCompare;
      var field = DataUtil.getValue(e.fieldName, query);
      if (!field) {
        return ds.sort(e.comparer);
      }
      if (field instanceof Array) {
        field = field.slice(0);
        for (var i = field.length - 1; i >= 0; i--) {
          if (!field[i]) {
            continue;
          }
          fnCompare = e.comparer;
          if (DataUtil.endsWith(field[i], " desc")) {
            fnCompare = DataUtil.fnSort("descending");
            field[i] = field[i].replace(" desc", "");
          }
          ds = DataUtil.sort(ds, field[i], fnCompare);
        }
        return ds;
      }
      return DataUtil.sort(ds, field, e.comparer);
    };
    JsonAdaptor2.prototype.onGroup = function(ds, e, query) {
      if (!ds || !ds.length) {
        return ds;
      }
      var agg = this.getAggregate(query);
      return DataUtil.group(ds, DataUtil.getValue(e.fieldName, query), agg, null, null, e.comparer);
    };
    JsonAdaptor2.prototype.onPage = function(ds, e, query) {
      var size = DataUtil.getValue(e.pageSize, query);
      var start = (DataUtil.getValue(e.pageIndex, query) - 1) * size;
      var end = start + size;
      if (!ds || !ds.length) {
        return ds;
      }
      return ds.slice(start, end);
    };
    JsonAdaptor2.prototype.onRange = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      return ds.slice(DataUtil.getValue(e.start), DataUtil.getValue(e.end));
    };
    JsonAdaptor2.prototype.onTake = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      return ds.slice(0, DataUtil.getValue(e.nos));
    };
    JsonAdaptor2.prototype.onSkip = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      return ds.slice(DataUtil.getValue(e.nos));
    };
    JsonAdaptor2.prototype.onSelect = function(ds, e) {
      if (!ds || !ds.length) {
        return ds;
      }
      return DataUtil.select(ds, DataUtil.getValue(e.fieldNames));
    };
    JsonAdaptor2.prototype.insert = function(dm, data, tableName, query, position) {
      if (isNullOrUndefined(position)) {
        return dm.dataSource.json.push(data);
      } else {
        return dm.dataSource.json.splice(position, 0, data);
      }
    };
    JsonAdaptor2.prototype.remove = function(dm, keyField, value, tableName) {
      var ds = dm.dataSource.json;
      var i;
      if (typeof value === "object" && !(value instanceof Date)) {
        value = DataUtil.getObject(keyField, value);
      }
      for (i = 0; i < ds.length; i++) {
        if (DataUtil.getObject(keyField, ds[i]) === value) {
          break;
        }
      }
      return i !== ds.length ? ds.splice(i, 1) : null;
    };
    JsonAdaptor2.prototype.update = function(dm, keyField, value, tableName) {
      var ds = dm.dataSource.json;
      var i;
      var key;
      if (!isNullOrUndefined(keyField)) {
        key = getValue(keyField, value);
      }
      for (i = 0; i < ds.length; i++) {
        if (!isNullOrUndefined(keyField) && getValue(keyField, ds[i]) === key) {
          break;
        }
      }
      return i < ds.length ? merge(ds[i], value) : null;
    };
    return JsonAdaptor2;
  }(Adaptor)
);
var UrlAdaptor = (
  /** @class */
  function(_super) {
    __extends(UrlAdaptor2, _super);
    function UrlAdaptor2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlAdaptor2.prototype.processQuery = function(dm, query, hierarchyFilters) {
      var queries = this.getQueryRequest(query);
      var singles = Query.filterQueryLists(query.queries, ["onSelect", "onPage", "onSkip", "onTake", "onRange"]);
      var params = query.params;
      var url = dm.dataSource.url;
      var temp;
      var skip;
      var take = null;
      var options = this.options;
      var request = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
      if ("onPage" in singles) {
        temp = singles.onPage;
        skip = DataUtil.getValue(temp.pageIndex, query);
        take = DataUtil.getValue(temp.pageSize, query);
        skip = (skip - 1) * take;
      } else if ("onRange" in singles) {
        temp = singles.onRange;
        skip = temp.start;
        take = temp.end - temp.start;
      }
      for (var i = 0; i < queries.sorts.length; i++) {
        temp = DataUtil.getValue(queries.sorts[i].e.fieldName, query);
        request.sorts.push(DataUtil.callAdaptorFunction(this, "onEachSort", { name: temp, direction: queries.sorts[i].e.direction }, query));
      }
      if (hierarchyFilters) {
        temp = this.getFiltersFrom(hierarchyFilters, query);
        if (temp) {
          request.filters.push(DataUtil.callAdaptorFunction(this, "onEachWhere", temp.toJson(), query));
        }
      }
      for (var i = 0; i < queries.filters.length; i++) {
        var res = DataUtil.callAdaptorFunction(this, "onEachWhere", queries.filters[i].e.toJson(), query);
        if (this.getModuleName && this.getModuleName() === "ODataV4Adaptor" && !isNullOrUndefined(queries.filters[i].e.key) && queries.filters.length > 1) {
          res = "(" + res + ")";
        }
        request.filters.push(res);
        var keys_3 = typeof request.filters[i] === "object" ? Object.keys(request.filters[i]) : [];
        for (var _i = 0, keys_1 = keys_3; _i < keys_1.length; _i++) {
          var prop = keys_1[_i];
          if (DataUtil.isNull(request[prop])) {
            delete request[prop];
          }
        }
      }
      for (var i = 0; i < queries.searches.length; i++) {
        temp = queries.searches[i].e;
        request.searches.push(DataUtil.callAdaptorFunction(this, "onEachSearch", {
          fields: temp.fieldNames,
          operator: temp.operator,
          key: temp.searchKey,
          ignoreCase: temp.ignoreCase
        }, query));
      }
      for (var i = 0; i < queries.groups.length; i++) {
        request.groups.push(DataUtil.getValue(queries.groups[i].e.fieldName, query));
      }
      for (var i = 0; i < queries.aggregates.length; i++) {
        temp = queries.aggregates[i].e;
        request.aggregates.push({ type: temp.type, field: DataUtil.getValue(temp.field, query) });
      }
      var req = {};
      this.getRequestQuery(options, query, singles, request, req);
      DataUtil.callAdaptorFunction(this, "addParams", { dm, query, params, reqParams: req });
      if (query.lazyLoad.length) {
        for (var i = 0; i < query.lazyLoad.length; i++) {
          req[query.lazyLoad[i].key] = query.lazyLoad[i].value;
        }
      }
      var keys = Object.keys(req);
      for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
        var prop = keys_2[_a];
        if (DataUtil.isNull(req[prop]) || req[prop] === "" || req[prop].length === 0) {
          delete req[prop];
        }
      }
      if (!(options.skip in req && options.take in req) && take !== null) {
        req[options.skip] = DataUtil.callAdaptorFunction(this, "onSkip", skip, query);
        req[options.take] = DataUtil.callAdaptorFunction(this, "onTake", take, query);
      }
      var p = this.pvt;
      this.pvt = {};
      if (this.options.requestType === "json") {
        return {
          data: JSON.stringify(req, DataUtil.parse.jsonDateReplacer),
          url,
          pvtData: p,
          type: "POST",
          contentType: "application/json; charset=utf-8"
        };
      }
      temp = this.convertToQueryString(req, query, dm);
      temp = (dm.dataSource.url.indexOf("?") !== -1 ? "&" : "/") + temp;
      return {
        type: "GET",
        url: temp.length ? url.replace(/\/*$/, temp) : url,
        pvtData: p
      };
    };
    UrlAdaptor2.prototype.getRequestQuery = function(options, query, singles, request, request1) {
      var param = "param";
      var req = request1;
      req[options.from] = query.fromTable;
      if (options.apply && query.distincts.length) {
        req[options.apply] = "onDistinct" in this ? DataUtil.callAdaptorFunction(this, "onDistinct", query.distincts) : "";
      }
      if (!query.distincts.length && options.expand) {
        req[options.expand] = "onExpand" in this && "onSelect" in singles ? DataUtil.callAdaptorFunction(this, "onExpand", { selects: DataUtil.getValue(singles.onSelect.fieldNames, query), expands: query.expands }, query) : query.expands;
      }
      req[options.select] = "onSelect" in singles && !query.distincts.length ? DataUtil.callAdaptorFunction(this, "onSelect", DataUtil.getValue(singles.onSelect.fieldNames, query), query) : "";
      req[options.count] = query.isCountRequired ? DataUtil.callAdaptorFunction(this, "onCount", query.isCountRequired, query) : "";
      req[options.search] = request.searches.length ? DataUtil.callAdaptorFunction(this, "onSearch", request.searches, query) : "";
      req[options.skip] = "onSkip" in singles ? DataUtil.callAdaptorFunction(this, "onSkip", DataUtil.getValue(singles.onSkip.nos, query), query) : "";
      req[options.take] = "onTake" in singles ? DataUtil.callAdaptorFunction(this, "onTake", DataUtil.getValue(singles.onTake.nos, query), query) : "";
      req[options.where] = request.filters.length || request.searches.length ? DataUtil.callAdaptorFunction(this, "onWhere", request.filters, query) : "";
      req[options.sortBy] = request.sorts.length ? DataUtil.callAdaptorFunction(this, "onSortBy", request.sorts, query) : "";
      req[options.group] = request.groups.length ? DataUtil.callAdaptorFunction(this, "onGroup", request.groups, query) : "";
      req[options.aggregates] = request.aggregates.length ? DataUtil.callAdaptorFunction(this, "onAggregates", request.aggregates, query) : "";
      req[param] = [];
    };
    UrlAdaptor2.prototype.convertToQueryString = function(request, query, dm) {
      return "";
    };
    UrlAdaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes) {
      if (xhr && xhr.headers.get("Content-Type") && xhr.headers.get("Content-Type").indexOf("application/json") !== -1) {
        var handleTimeZone = DataUtil.timeZoneHandling;
        if (ds && !ds.timeZoneHandling) {
          DataUtil.timeZoneHandling = false;
        }
        data = DataUtil.parse.parseJson(data);
        DataUtil.timeZoneHandling = handleTimeZone;
      }
      var requests = request;
      var pvt = requests.pvtData || {};
      var groupDs = data ? data.groupDs : [];
      if (xhr && xhr.headers.get("Content-Type") && xhr.headers.get("Content-Type").indexOf("xml") !== -1) {
        return query.isCountRequired ? { result: [], count: 0 } : [];
      }
      var d = JSON.parse(requests.data);
      if (d && d.action === "batch" && data && data.addedRecords) {
        changes.addedRecords = data.addedRecords;
        return changes;
      }
      if (data && data.d) {
        data = data.d;
      }
      var args = {};
      if (data && "count" in data) {
        args.count = data.count;
      }
      args.result = data && data.result ? data.result : data;
      var isExpand = false;
      if (Array.isArray(data.result) && data.result.length) {
        var key = "key";
        var val = "value";
        var level = "level";
        if (!isNullOrUndefined(data.result[0][key])) {
          args.result = this.formRemoteGroupedData(args.result, 1, pvt.groups.length - 1);
        }
        if (query && query.lazyLoad.length && pvt.groups.length) {
          for (var i = 0; i < query.lazyLoad.length; i++) {
            if (query.lazyLoad[i][key] === "onDemandGroupInfo") {
              var value = query.lazyLoad[i][val][level];
              if (pvt.groups.length === value) {
                isExpand = true;
              }
            }
          }
        }
      }
      if (!isExpand) {
        this.getAggregateResult(pvt, data, args, groupDs, query);
      }
      return DataUtil.isNull(args.count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    UrlAdaptor2.prototype.formRemoteGroupedData = function(data, level, childLevel) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].items.length && Object.keys(data[i].items[0]).indexOf("key") > -1) {
          this.formRemoteGroupedData(data[i].items, level + 1, childLevel - 1);
        }
      }
      var uid = "GroupGuid";
      var childLvl = "childLevels";
      var lvl = "level";
      var records = "records";
      data[uid] = consts[uid];
      data[lvl] = level;
      data[childLvl] = childLevel;
      data[records] = data[0].items.length ? this.getGroupedRecords(data, !isNullOrUndefined(data[0].items[records])) : [];
      return data;
    };
    UrlAdaptor2.prototype.getGroupedRecords = function(data, hasRecords) {
      var childGroupedRecords = [];
      var records = "records";
      for (var i = 0; i < data.length; i++) {
        if (!hasRecords) {
          for (var j = 0; j < data[i].items.length; j++) {
            childGroupedRecords.push(data[i].items[j]);
          }
        } else {
          childGroupedRecords = childGroupedRecords.concat(data[i].items[records]);
        }
      }
      return childGroupedRecords;
    };
    UrlAdaptor2.prototype.onGroup = function(e) {
      this.pvt.groups = e;
      return e;
    };
    UrlAdaptor2.prototype.onAggregates = function(e) {
      this.pvt.aggregates = e;
    };
    UrlAdaptor2.prototype.batchRequest = function(dm, changes, e, query, original) {
      var url;
      var key;
      return {
        type: "POST",
        url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.removeUrl || dm.dataSource.url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(extend({}, {
          changed: changes.changedRecords,
          added: changes.addedRecords,
          deleted: changes.deletedRecords,
          action: "batch",
          table: e[url],
          key: e[key]
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    UrlAdaptor2.prototype.beforeSend = function(dm, request) {
    };
    UrlAdaptor2.prototype.insert = function(dm, data, tableName, query) {
      return {
        url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          value: data,
          table: tableName,
          action: "insert"
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    UrlAdaptor2.prototype.remove = function(dm, keyField, value, tableName, query) {
      return {
        type: "POST",
        url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          key: value,
          keyColumn: keyField,
          table: tableName,
          action: "remove"
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    UrlAdaptor2.prototype.update = function(dm, keyField, value, tableName, query) {
      return {
        type: "POST",
        url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          value,
          action: "update",
          keyColumn: keyField,
          key: DataUtil.getObject(keyField, value),
          table: tableName
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    UrlAdaptor2.prototype.getFiltersFrom = function(data, query) {
      var key = query.fKey;
      var value;
      var prop = key;
      var pKey = query.key;
      var predicats = [];
      if (typeof data[0] !== "object") {
        prop = null;
      }
      for (var i = 0; i < data.length; i++) {
        if (typeof data[0] === "object") {
          value = DataUtil.getObject(pKey || prop, data[i]);
        } else {
          value = data[i];
        }
        predicats.push(new Predicate(key, "equal", value));
      }
      return Predicate.or(predicats);
    };
    UrlAdaptor2.prototype.getAggregateResult = function(pvt, data, args, groupDs, query) {
      var pData = data;
      if (data && data.result) {
        pData = data.result;
      }
      if (pvt && pvt.aggregates && pvt.aggregates.length) {
        var agg = pvt.aggregates;
        var fn = void 0;
        var aggregateData = pData;
        var res = {};
        if (data.aggregate) {
          aggregateData = data.aggregate;
        }
        for (var i = 0; i < agg.length; i++) {
          fn = DataUtil.aggregates[agg[i].type];
          if (fn) {
            res[agg[i].field + " - " + agg[i].type] = fn(aggregateData, agg[i].field);
          }
        }
        args.aggregates = res;
      }
      var key = "key";
      var isServerGrouping = Array.isArray(data.result) && data.result.length && !isNullOrUndefined(data.result[0][key]);
      if (pvt && pvt.groups && pvt.groups.length && !isServerGrouping) {
        var groups = pvt.groups;
        for (var i = 0; i < groups.length; i++) {
          var level = null;
          if (!isNullOrUndefined(groupDs)) {
            groupDs = DataUtil.group(groupDs, groups[i]);
          }
          var groupQuery = Query.filterQueries(query.queries, "onGroup")[i].e;
          pData = DataUtil.group(pData, groups[i], pvt.aggregates, level, groupDs, groupQuery.comparer);
        }
        args.result = pData;
      }
      return args;
    };
    UrlAdaptor2.prototype.getQueryRequest = function(query) {
      var req = { sorts: [], groups: [], filters: [], searches: [], aggregates: [] };
      req.sorts = Query.filterQueries(query.queries, "onSortBy");
      req.groups = Query.filterQueries(query.queries, "onGroup");
      req.filters = Query.filterQueries(query.queries, "onWhere");
      req.searches = Query.filterQueries(query.queries, "onSearch");
      req.aggregates = Query.filterQueries(query.queries, "onAggregates");
      return req;
    };
    UrlAdaptor2.prototype.addParams = function(options) {
      var req = options.reqParams;
      if (options.params.length) {
        req.params = {};
      }
      for (var _i = 0, _a = options.params; _i < _a.length; _i++) {
        var tmp = _a[_i];
        if (req[tmp.key]) {
          throw new Error("Query() - addParams: Custom Param is conflicting other request arguments");
        }
        req[tmp.key] = tmp.value;
        if (tmp.fn) {
          req[tmp.key] = tmp.fn.call(options.query, tmp.key, options.query, options.dm);
        }
        req.params[tmp.key] = req[tmp.key];
      }
    };
    return UrlAdaptor2;
  }(Adaptor)
);
var ODataAdaptor = (
  /** @class */
  function(_super) {
    __extends(ODataAdaptor2, _super);
    function ODataAdaptor2(props) {
      var _this = _super.call(this) || this;
      _this.options = extend({}, _this.options, {
        requestType: "get",
        accept: "application/json;odata=light;q=1,application/json;odata=verbose;q=0.5",
        multipartAccept: "multipart/mixed",
        sortBy: "$orderby",
        select: "$select",
        skip: "$skip",
        take: "$top",
        count: "$inlinecount",
        where: "$filter",
        expand: "$expand",
        batch: "$batch",
        changeSet: "--changeset_",
        batchPre: "batch_",
        contentId: "Content-Id: ",
        batchContent: "Content-Type: multipart/mixed; boundary=",
        changeSetContent: "Content-Type: application/http\nContent-Transfer-Encoding: binary ",
        batchChangeSetContentType: "Content-Type: application/json; charset=utf-8 ",
        updateType: "PUT"
      });
      extend(_this.options, props || {});
      return _this;
    }
    ODataAdaptor2.prototype.getModuleName = function() {
      return "ODataAdaptor";
    };
    ODataAdaptor2.prototype.onPredicate = function(predicate, query, requiresCast) {
      var returnValue = "";
      var operator;
      var guid;
      var val = predicate.value;
      var type = typeof val;
      var field = predicate.field ? ODataAdaptor2.getField(predicate.field) : null;
      if (val instanceof Date) {
        val = "datetime'" + DataUtil.parse.replacer(val) + "'";
      }
      if (type === "string") {
        val = val.replace(/'/g, "''");
        if (predicate.ignoreCase) {
          val = val.toLowerCase();
        }
        if (predicate.operator !== "like") {
          val = encodeURIComponent(val);
        }
        if (predicate.operator !== "wildcard" && predicate.operator !== "like") {
          val = "'" + val + "'";
        }
        if (requiresCast) {
          field = "cast(" + field + ", 'Edm.String')";
        }
        if (DataUtil.parse.isGuid(val)) {
          guid = "guid";
        }
        if (predicate.ignoreCase) {
          if (!guid) {
            field = "tolower(" + field + ")";
          }
          val = val.toLowerCase();
        }
      }
      if (predicate.operator === "isempty" || predicate.operator === "isnull" || predicate.operator === "isnotempty" || predicate.operator === "isnotnull") {
        operator = predicate.operator.indexOf("isnot") !== -1 ? DataUtil.odBiOperator["notequal"] : DataUtil.odBiOperator["equal"];
        val = predicate.operator === "isnull" || predicate.operator === "isnotnull" ? null : "''";
      } else {
        operator = DataUtil.odBiOperator[predicate.operator];
      }
      if (operator) {
        returnValue += field;
        returnValue += operator;
        if (guid) {
          returnValue += guid;
        }
        return returnValue + val;
      }
      if (!isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor") {
        operator = DataUtil.odv4UniOperator[predicate.operator];
      } else {
        operator = DataUtil.odUniOperator[predicate.operator];
      }
      if (operator === "like") {
        val = val;
        if (val.indexOf("%") !== -1) {
          if (val.charAt(0) === "%" && val.lastIndexOf("%") < 2) {
            val = val.substring(1, val.length);
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["startswith"] : DataUtil.odUniOperator["startswith"];
          } else if (val.charAt(val.length - 1) === "%" && val.indexOf("%") > val.length - 3) {
            val = val.substring(0, val.length - 1);
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["endswith"] : DataUtil.odUniOperator["endswith"];
          } else if (val.lastIndexOf("%") !== val.indexOf("%") && val.lastIndexOf("%") > val.indexOf("%") + 1) {
            val = val.substring(val.indexOf("%") + 1, val.lastIndexOf("%"));
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["contains"] : DataUtil.odUniOperator["contains"];
          } else {
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["contains"] : DataUtil.odUniOperator["contains"];
          }
        }
        val = encodeURIComponent(val);
        val = "'" + val + "'";
      } else if (operator === "wildcard") {
        val = val;
        if (val.indexOf("*") !== -1) {
          var splittedStringValue = val.split("*");
          var splittedValue = void 0;
          var count = 0;
          if (val.indexOf("*") !== 0 && splittedStringValue[0].indexOf("%3f") === -1 && splittedStringValue[0].indexOf("?") === -1) {
            splittedValue = splittedStringValue[0];
            splittedValue = "'" + splittedValue + "'";
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["startswith"] : DataUtil.odUniOperator["startswith"];
            returnValue += operator + "(";
            returnValue += field + ",";
            if (guid) {
              returnValue += guid;
            }
            returnValue += splittedValue + ")";
            count++;
          }
          if (val.lastIndexOf("*") !== val.length - 1 && splittedStringValue[splittedStringValue.length - 1].indexOf("%3f") === -1 && splittedStringValue[splittedStringValue.length - 1].indexOf("?") === -1) {
            splittedValue = splittedStringValue[splittedStringValue.length - 1];
            splittedValue = "'" + splittedValue + "'";
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["endswith"] : DataUtil.odUniOperator["endswith"];
            if (count > 0) {
              returnValue += " and ";
            }
            returnValue += operator + "(";
            returnValue += field + ",";
            if (guid) {
              returnValue += guid;
            }
            returnValue += splittedValue + ")";
            count++;
          }
          if (splittedStringValue.length > 2) {
            for (var i = 1; i < splittedStringValue.length - 1; i++) {
              if (splittedStringValue[i].indexOf("%3f") === -1 && splittedStringValue[i].indexOf("?") === -1) {
                splittedValue = splittedStringValue[i];
                splittedValue = "'" + splittedValue + "'";
                operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["contains"] : DataUtil.odUniOperator["contains"];
                if (count > 0) {
                  returnValue += " and ";
                }
                if (operator === "substringof" || operator === "not substringof") {
                  var temp = splittedValue;
                  splittedValue = field;
                  field = temp;
                }
                returnValue += operator + "(";
                returnValue += field + ",";
                if (guid) {
                  returnValue += guid;
                }
                returnValue += splittedValue + ")";
                count++;
              }
            }
          }
          if (count === 0) {
            operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["contains"] : DataUtil.odUniOperator["contains"];
            if (val.indexOf("?") !== -1 || val.indexOf("%3f") !== -1) {
              val = val.indexOf("?") !== -1 ? val.split("?").join("") : val.split("%3f").join("");
            }
            val = "'" + val + "'";
          } else {
            operator = "wildcard";
          }
        } else {
          operator = !isNullOrUndefined(this.getModuleName) && this.getModuleName() === "ODataV4Adaptor" ? DataUtil.odv4UniOperator["contains"] : DataUtil.odUniOperator["contains"];
          if (val.indexOf("?") !== -1 || val.indexOf("%3f") !== -1) {
            val = val.indexOf("?") !== -1 ? val.split("?").join("") : val.split("%3f").join("");
          }
          val = "'" + val + "'";
        }
      }
      if (operator === "substringof" || operator === "not substringof") {
        var temp = val;
        val = field;
        field = temp;
      }
      if (operator !== "wildcard") {
        returnValue += operator + "(";
        returnValue += field + ",";
        if (guid) {
          returnValue += guid;
        }
        returnValue += val + ")";
      }
      return returnValue;
    };
    ODataAdaptor2.prototype.addParams = function(options) {
      _super.prototype.addParams.call(this, options);
      delete options.reqParams.params;
    };
    ODataAdaptor2.prototype.onComplexPredicate = function(predicate, query, requiresCast) {
      var res = [];
      for (var i = 0; i < predicate.predicates.length; i++) {
        res.push("(" + this.onEachWhere(predicate.predicates[i], query, requiresCast) + ")");
      }
      return res.join(" " + predicate.condition + " ");
    };
    ODataAdaptor2.prototype.onEachWhere = function(filter, query, requiresCast) {
      return filter.isComplex ? this.onComplexPredicate(filter, query, requiresCast) : this.onPredicate(filter, query, requiresCast);
    };
    ODataAdaptor2.prototype.onWhere = function(filters) {
      if (this.pvt.search) {
        filters.push(this.onEachWhere(this.pvt.search, null, true));
      }
      return filters.join(" and ");
    };
    ODataAdaptor2.prototype.onEachSearch = function(e) {
      if (e.fields && e.fields.length === 0) {
        DataUtil.throwError("Query() - Search : oData search requires list of field names to search");
      }
      var filter = this.pvt.search || [];
      for (var i = 0; i < e.fields.length; i++) {
        filter.push(new Predicate(e.fields[i], e.operator, e.key, e.ignoreCase));
      }
      this.pvt.search = filter;
    };
    ODataAdaptor2.prototype.onSearch = function(e) {
      this.pvt.search = Predicate.or(this.pvt.search);
      return "";
    };
    ODataAdaptor2.prototype.onEachSort = function(e) {
      var res = [];
      if (e.name instanceof Array) {
        for (var i = 0; i < e.name.length; i++) {
          res.push(ODataAdaptor2.getField(e.name[i]) + (e.direction === "descending" ? " desc" : ""));
        }
      } else {
        res.push(ODataAdaptor2.getField(e.name) + (e.direction === "descending" ? " desc" : ""));
      }
      return res.join(",");
    };
    ODataAdaptor2.prototype.onSortBy = function(e) {
      return e.reverse().join(",");
    };
    ODataAdaptor2.prototype.onGroup = function(e) {
      this.pvt.groups = e;
      return [];
    };
    ODataAdaptor2.prototype.onSelect = function(e) {
      for (var i = 0; i < e.length; i++) {
        e[i] = ODataAdaptor2.getField(e[i]);
      }
      return e.join(",");
    };
    ODataAdaptor2.prototype.onAggregates = function(e) {
      this.pvt.aggregates = e;
      return "";
    };
    ODataAdaptor2.prototype.onCount = function(e) {
      return e === true ? "allpages" : "";
    };
    ODataAdaptor2.prototype.beforeSend = function(dm, request, settings) {
      if (DataUtil.endsWith(settings.url, this.options.batch) && settings.type.toLowerCase() === "post") {
        request.headers.set("Accept", this.options.multipartAccept);
        request.headers.set("DataServiceVersion", "2.0");
      } else {
        request.headers.set("Accept", this.options.accept);
      }
      request.headers.set("DataServiceVersion", "2.0");
      request.headers.set("MaxDataServiceVersion", "2.0");
    };
    ODataAdaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes) {
      var metaCheck = "odata.metadata";
      if (request && request.type === "GET" && !this.rootUrl && data[metaCheck]) {
        var dataUrls = data[metaCheck].split("/$metadata#");
        this.rootUrl = dataUrls[0];
        this.resourceTableName = dataUrls[1];
      }
      var pvtData = "pvtData";
      if (!isNullOrUndefined(data.d)) {
        var dataCopy = query && query.isCountRequired ? data.d.results : data.d;
        var metaData = "__metadata";
        if (!isNullOrUndefined(dataCopy)) {
          for (var i = 0; i < dataCopy.length; i++) {
            if (!isNullOrUndefined(dataCopy[i][metaData])) {
              delete dataCopy[i][metaData];
            }
          }
        }
      }
      var pvt = request && request[pvtData];
      var emptyAndBatch = this.processBatchResponse(data, query, xhr, request, changes);
      if (emptyAndBatch) {
        return emptyAndBatch;
      }
      var versionCheck = xhr && request.fetchRequest.headers.get("DataServiceVersion");
      var count = null;
      var version = versionCheck && parseInt(versionCheck, 10) || 2;
      if (query && query.isCountRequired) {
        var oDataCount = "__count";
        if (data[oDataCount] || data["odata.count"]) {
          count = data[oDataCount] || data["odata.count"];
        }
        if (data.d) {
          data = data.d;
        }
        if (data[oDataCount] || data["odata.count"]) {
          count = data[oDataCount] || data["odata.count"];
        }
      }
      if (version === 3 && data.value) {
        data = data.value;
      }
      if (data.d) {
        data = data.d;
      }
      if (version < 3 && data.results) {
        data = data.results;
      }
      var args = {};
      args.count = count;
      args.result = data;
      this.getAggregateResult(pvt, data, args, null, query);
      return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    ODataAdaptor2.prototype.convertToQueryString = function(request, query, dm) {
      var res = [];
      var table = "table";
      var tableName = request[table] || "";
      var format = "$format";
      delete request[table];
      if (dm.dataSource.requiresFormat) {
        request[format] = "json";
      }
      var keys = Object.keys(request);
      for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
        var prop = keys_4[_i];
        res.push(prop + "=" + request[prop]);
      }
      res = res.join("&");
      if (dm.dataSource.url && dm.dataSource.url.indexOf("?") !== -1 && !tableName) {
        return res;
      }
      return res.length ? tableName + "?" + res : tableName || "";
    };
    ODataAdaptor2.prototype.localTimeReplacer = function(key, convertObj) {
      for (var _i = 0, _a = !isNullOrUndefined(convertObj) ? Object.keys(convertObj) : []; _i < _a.length; _i++) {
        var prop = _a[_i];
        if (convertObj[prop] instanceof Date) {
          convertObj[prop] = DataUtil.dateParse.toLocalTime(convertObj[prop]);
        }
      }
      return convertObj;
    };
    ODataAdaptor2.prototype.insert = function(dm, data, tableName) {
      return {
        url: (dm.dataSource.insertUrl || dm.dataSource.url).replace(/\/*$/, tableName ? "/" + tableName : ""),
        data: JSON.stringify(data, this.options.localTime ? this.localTimeReplacer : null)
      };
    };
    ODataAdaptor2.prototype.remove = function(dm, keyField, value, tableName) {
      var url;
      if (typeof value === "string" && !DataUtil.parse.isGuid(value)) {
        url = "('" + value + "')";
      } else {
        url = "(" + value + ")";
      }
      return {
        type: "DELETE",
        url: (dm.dataSource.removeUrl || dm.dataSource.url).replace(/\/*$/, tableName ? "/" + tableName : "") + url
      };
    };
    ODataAdaptor2.prototype.update = function(dm, keyField, value, tableName, query, original) {
      if (this.options.updateType === "PATCH" && !isNullOrUndefined(original)) {
        value = this.compareAndRemove(value, original, keyField);
      }
      var url;
      if (typeof value[keyField] === "string" && !DataUtil.parse.isGuid(value[keyField])) {
        url = "('" + value[keyField] + "')";
      } else {
        url = "(" + value[keyField] + ")";
      }
      return {
        type: this.options.updateType,
        url: (dm.dataSource.updateUrl || dm.dataSource.url).replace(/\/*$/, tableName ? "/" + tableName : "") + url,
        data: JSON.stringify(value, this.options.localTime ? this.localTimeReplacer : null),
        accept: this.options.accept
      };
    };
    ODataAdaptor2.prototype.batchRequest = function(dm, changes, e, query, original) {
      var initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
      var url = this.rootUrl ? this.rootUrl + "/" + this.options.batch : dm.dataSource.url.replace(/\/*$/, "/" + this.options.batch);
      e.url = this.resourceTableName ? this.resourceTableName : e.url;
      var args = {
        url: e.url,
        key: e.key,
        cid: 1,
        cSet: DataUtil.getGuid(this.options.changeSet)
      };
      var req = "--" + initialGuid + "\n";
      req += "Content-Type: multipart/mixed; boundary=" + args.cSet.replace("--", "") + "\n";
      this.pvt.changeSet = 0;
      req += this.generateInsertRequest(changes.addedRecords, args, dm);
      req += this.generateUpdateRequest(changes.changedRecords, args, dm, original ? original.changedRecords : []);
      req += this.generateDeleteRequest(changes.deletedRecords, args, dm);
      req += args.cSet + "--\n";
      req += "--" + initialGuid + "--";
      return {
        type: "POST",
        url,
        dataType: "json",
        contentType: "multipart/mixed; charset=UTF-8;boundary=" + initialGuid,
        data: req
      };
    };
    ODataAdaptor2.prototype.generateDeleteRequest = function(arr, e, dm) {
      if (!arr) {
        return "";
      }
      var req = "";
      var stat = {
        "method": "DELETE ",
        "url": function(data, i, key) {
          var url = DataUtil.getObject(key, data[i]);
          if (typeof url === "number" || DataUtil.parse.isGuid(url)) {
            return "(" + url + ")";
          } else if (url instanceof Date) {
            var dateTime = data[i][key];
            return "(" + dateTime.toJSON() + ")";
          } else {
            return "('" + url + "')";
          }
        },
        "data": function(data, i) {
          return "";
        }
      };
      req = this.generateBodyContent(arr, e, stat, dm);
      return req + "\n";
    };
    ODataAdaptor2.prototype.generateInsertRequest = function(arr, e, dm) {
      if (!arr) {
        return "";
      }
      var req = "";
      var stat = {
        "method": "POST ",
        "url": function(data, i, key) {
          return "";
        },
        "data": function(data, i) {
          return JSON.stringify(data[i]) + "\n\n";
        }
      };
      req = this.generateBodyContent(arr, e, stat, dm);
      return req;
    };
    ODataAdaptor2.prototype.generateUpdateRequest = function(arr, e, dm, org) {
      var _this = this;
      if (!arr) {
        return "";
      }
      var req = "";
      arr.forEach(function(change) {
        return change = _this.compareAndRemove(change, org.filter(function(o) {
          return DataUtil.getObject(e.key, o) === DataUtil.getObject(e.key, change);
        })[0], e.key);
      });
      var stat = {
        "method": this.options.updateType + " ",
        "url": function(data, i, key) {
          if (typeof data[i][key] === "number" || DataUtil.parse.isGuid(data[i][key])) {
            return "(" + data[i][key] + ")";
          } else if (data[i][key] instanceof Date) {
            var date = data[i][key];
            return "(" + date.toJSON() + ")";
          } else {
            return "('" + data[i][key] + "')";
          }
        },
        "data": function(data, i) {
          return JSON.stringify(data[i]) + "\n\n";
        }
      };
      req = this.generateBodyContent(arr, e, stat, dm);
      return req;
    };
    ODataAdaptor2.getField = function(prop) {
      return prop.replace(/\./g, "/");
    };
    ODataAdaptor2.prototype.generateBodyContent = function(arr, e, stat, dm) {
      var req = "";
      for (var i = 0; i < arr.length; i++) {
        req += "\n" + e.cSet + "\n";
        req += this.options.changeSetContent + "\n\n";
        req += stat.method;
        if (stat.method === "POST ") {
          req += (dm.dataSource.insertUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + " HTTP/1.1\n";
        } else if (stat.method === "PUT " || stat.method === "PATCH ") {
          req += (dm.dataSource.updateUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + " HTTP/1.1\n";
        } else if (stat.method === "DELETE ") {
          req += (dm.dataSource.removeUrl || dm.dataSource.crudUrl || e.url) + stat.url(arr, i, e.key) + " HTTP/1.1\n";
        }
        req += "Accept: " + this.options.accept + "\n";
        req += "Content-Id: " + this.pvt.changeSet++ + "\n";
        req += this.options.batchChangeSetContentType + "\n";
        if (!isNullOrUndefined(arr[i]["@odata.etag"])) {
          req += "If-Match: " + arr[i]["@odata.etag"] + "\n\n";
          delete arr[i]["@odata.etag"];
        } else {
          req += "\n";
        }
        req += stat.data(arr, i);
      }
      return req;
    };
    ODataAdaptor2.prototype.processBatchResponse = function(data, query, xhr, request, changes) {
      if (xhr && xhr.headers.get("Content-Type") && xhr.headers.get("Content-Type").indexOf("xml") !== -1) {
        return query.isCountRequired ? { result: [], count: 0 } : [];
      }
      if (request && this.options.batch && DataUtil.endsWith(request.url, this.options.batch) && request.type.toLowerCase() === "post") {
        var guid = xhr.headers.get("Content-Type");
        var cIdx = void 0;
        var jsonObj = void 0;
        var d = data + "";
        guid = guid.substring(guid.indexOf("=batchresponse") + 1);
        d = d.split(guid);
        if (d.length < 2) {
          return {};
        }
        d = d[1];
        var exVal = /(?:\bContent-Type.+boundary=)(changesetresponse.+)/i.exec(d);
        if (exVal) {
          d.replace(exVal[0], "");
        }
        var changeGuid = exVal ? exVal[1] : "";
        d = d.split(changeGuid);
        for (var i = d.length; i > -1; i--) {
          if (!/\bContent-ID:/i.test(d[i]) || !/\bHTTP.+201/.test(d[i])) {
            continue;
          }
          cIdx = parseInt(/\bContent-ID: (\d+)/i.exec(d[i])[1], 10);
          if (changes.addedRecords[cIdx]) {
            jsonObj = DataUtil.parse.parseJson(/^\{.+\}/m.exec(d[i])[0]);
            extend({}, changes.addedRecords[cIdx], this.processResponse(jsonObj));
          }
        }
        return changes;
      }
      return null;
    };
    ODataAdaptor2.prototype.compareAndRemove = function(data, original, key) {
      var _this = this;
      if (isNullOrUndefined(original)) {
        return data;
      }
      Object.keys(data).forEach(function(prop) {
        if (prop !== key && prop !== "@odata.etag") {
          if (DataUtil.isPlainObject(data[prop])) {
            _this.compareAndRemove(data[prop], original[prop]);
            var final = Object.keys(data[prop]).filter(function(data2) {
              return data2 !== "@odata.etag";
            });
            if (final.length === 0) {
              delete data[prop];
            }
          } else if (data[prop] === original[prop]) {
            delete data[prop];
          } else if (data[prop] && original[prop] && data[prop].valueOf() === original[prop].valueOf()) {
            delete data[prop];
          }
        }
      });
      return data;
    };
    return ODataAdaptor2;
  }(UrlAdaptor)
);
var ODataV4Adaptor = (
  /** @class */
  function(_super) {
    __extends(ODataV4Adaptor2, _super);
    function ODataV4Adaptor2(props) {
      var _this = _super.call(this, props) || this;
      _this.options = extend({}, _this.options, {
        requestType: "get",
        accept: "application/json, text/javascript, */*; q=0.01",
        multipartAccept: "multipart/mixed",
        sortBy: "$orderby",
        select: "$select",
        skip: "$skip",
        take: "$top",
        count: "$count",
        search: "$search",
        where: "$filter",
        expand: "$expand",
        batch: "$batch",
        changeSet: "--changeset_",
        batchPre: "batch_",
        contentId: "Content-Id: ",
        batchContent: "Content-Type: multipart/mixed; boundary=",
        changeSetContent: "Content-Type: application/http\nContent-Transfer-Encoding: binary ",
        batchChangeSetContentType: "Content-Type: application/json; charset=utf-8 ",
        updateType: "PATCH",
        localTime: false,
        apply: "$apply"
      });
      extend(_this.options, props || {});
      return _this;
    }
    ODataV4Adaptor2.prototype.getModuleName = function() {
      return "ODataV4Adaptor";
    };
    ODataV4Adaptor2.prototype.onCount = function(e) {
      return e === true ? "true" : "";
    };
    ODataV4Adaptor2.prototype.onPredicate = function(predicate, query, requiresCast) {
      var returnValue = "";
      var val = predicate.value;
      var isDate = val instanceof Date;
      if (query instanceof Query) {
        var queries = this.getQueryRequest(query);
        for (var i = 0; i < queries.filters.length; i++) {
          if (queries.filters[i].e.key === predicate.value) {
            requiresCast = true;
          }
        }
      }
      returnValue = _super.prototype.onPredicate.call(this, predicate, query, requiresCast);
      if (isDate) {
        returnValue = returnValue.replace(/datetime'(.*)'$/, "$1");
      }
      if (DataUtil.parse.isGuid(val)) {
        returnValue = returnValue.replace("guid", "").replace(/'/g, "");
      }
      return returnValue;
    };
    ODataV4Adaptor2.prototype.onEachSearch = function(e) {
      var search = this.pvt.searches || [];
      search.push(e.key);
      this.pvt.searches = search;
    };
    ODataV4Adaptor2.prototype.onSearch = function(e) {
      return this.pvt.searches.join(" OR ");
    };
    ODataV4Adaptor2.prototype.onExpand = function(e) {
      var _this = this;
      var selected = {};
      var expanded = {};
      var expands = e.expands.slice();
      var exArr = [];
      var selects = e.selects.filter(function(item) {
        return item.indexOf(".") > -1;
      });
      selects.forEach(function(select) {
        var splits = select.split(".");
        if (!(splits[0] in selected)) {
          selected[splits[0]] = [];
        }
        if (splits.length === 2) {
          if (selected[splits[0]].length && Object.keys(selected).indexOf(splits[0]) !== -1) {
            if (selected[splits[0]][0].indexOf("$expand") !== -1 && selected[splits[0]][0].indexOf(";$select=") === -1) {
              selected[splits[0]][0] = selected[splits[0]][0] + ";$select=" + splits[1];
            } else {
              selected[splits[0]][0] = selected[splits[0]][0] + "," + splits[1];
            }
          } else {
            selected[splits[0]].push("$select=" + splits[1]);
          }
        } else {
          var sel = "$select=" + splits[splits.length - 1];
          var exp = "";
          var close_1 = "";
          for (var i = 1; i < splits.length - 1; i++) {
            exp = exp + "$expand=" + splits[i] + "(";
            close_1 = close_1 + ")";
          }
          var combineVal = exp + sel + close_1;
          if (selected[splits[0]].length && Object.keys(selected).indexOf(splits[0]) !== -1 && _this.expandQueryIndex(selected[splits[0]], true)) {
            var idx = _this.expandQueryIndex(selected[splits[0]]);
            selected[splits[0]][idx] = selected[splits[0]][idx] + combineVal.replace("$expand=", ",");
          } else {
            selected[splits[0]].push(combineVal);
          }
        }
      });
      Object.keys(selected).forEach(function(expand) {
        if (expands.indexOf(expand) === -1) {
          expands.push(expand);
        }
      });
      expands.forEach(function(expand) {
        expanded[expand] = expand in selected ? expand + "(" + selected[expand].join(";") + ")" : expand;
      });
      Object.keys(expanded).forEach(function(ex) {
        return exArr.push(expanded[ex]);
      });
      return exArr.join(",");
    };
    ODataV4Adaptor2.prototype.expandQueryIndex = function(query, isExpand) {
      for (var i = 0; i < query.length; i++) {
        if (query[i].indexOf("$expand") !== -1) {
          return isExpand ? true : i;
        }
      }
      return isExpand ? false : 0;
    };
    ODataV4Adaptor2.prototype.onDistinct = function(distinctFields) {
      var fields = distinctFields.map(function(field) {
        return ODataAdaptor.getField(field);
      }).join(",");
      return "groupby((" + fields + "))";
    };
    ODataV4Adaptor2.prototype.onSelect = function(e) {
      return _super.prototype.onSelect.call(this, e.filter(function(item) {
        return item.indexOf(".") === -1;
      }));
    };
    ODataV4Adaptor2.prototype.beforeSend = function(dm, request, settings) {
      if (settings.type === "POST" || settings.type === "PUT" || settings.type === "PATCH") {
        request.headers.set("Prefer", "return=representation");
      }
      request.headers.set("Accept", this.options.accept);
    };
    ODataV4Adaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes) {
      var metaName = "@odata.context";
      var metaV4Name = "@context";
      if (request && request.type === "GET" && !this.rootUrl && (data[metaName] || data[metaV4Name])) {
        var dataUrl = data[metaName] ? data[metaName].split("/$metadata#") : data[metaV4Name].split("/$metadata#");
        this.rootUrl = dataUrl[0];
        this.resourceTableName = dataUrl[1];
      }
      var pvtData = "pvtData";
      var pvt = request && request[pvtData];
      var emptyAndBatch = _super.prototype.processBatchResponse.call(this, data, query, xhr, request, changes);
      if (emptyAndBatch) {
        return emptyAndBatch;
      }
      var count = null;
      var dataCount = "@odata.count";
      var dataV4Count = "@count";
      if (query && query.isCountRequired) {
        if (dataCount in data) {
          count = data[dataCount];
        } else if (dataV4Count in data) {
          count = data[dataV4Count];
        }
      }
      data = !isNullOrUndefined(data.value) ? data.value : data;
      var args = {};
      args.count = count;
      args.result = data;
      this.getAggregateResult(pvt, data, args, null, query);
      return DataUtil.isNull(count) ? args.result : { result: args.result, count, aggregates: args.aggregates };
    };
    return ODataV4Adaptor2;
  }(ODataAdaptor)
);
var WebApiAdaptor = (
  /** @class */
  function(_super) {
    __extends(WebApiAdaptor2, _super);
    function WebApiAdaptor2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WebApiAdaptor2.prototype.getModuleName = function() {
      return "WebApiAdaptor";
    };
    WebApiAdaptor2.prototype.insert = function(dm, data, tableName) {
      return {
        type: "POST",
        url: dm.dataSource.url,
        data: JSON.stringify(data)
      };
    };
    WebApiAdaptor2.prototype.remove = function(dm, keyField, value, tableName) {
      return {
        type: "DELETE",
        url: dm.dataSource.url + "/" + value,
        data: JSON.stringify(value)
      };
    };
    WebApiAdaptor2.prototype.update = function(dm, keyField, value, tableName) {
      return {
        type: "PUT",
        url: dm.dataSource.url,
        data: JSON.stringify(value)
      };
    };
    WebApiAdaptor2.prototype.batchRequest = function(dm, changes, e) {
      var _this = this;
      var initialGuid = e.guid = DataUtil.getGuid(this.options.batchPre);
      var url = dm.dataSource.url.replace(/\/*$/, "/" + this.options.batch);
      e.url = this.resourceTableName ? this.resourceTableName : e.url;
      var req = [];
      var _loop_1 = function(i2, x2) {
        changes.addedRecords.forEach(function(j, d) {
          var stat = {
            "method": "POST ",
            "url": function(data, i3, key) {
              return "";
            },
            "data": function(data, i3) {
              return JSON.stringify(data[i3]) + "\n\n";
            }
          };
          req.push("--" + initialGuid);
          req.push("Content-Type: application/http; msgtype=request", "");
          req.push("POST /api/" + (dm.dataSource.insertUrl || dm.dataSource.crudUrl || e.url) + stat.url(changes.addedRecords, i2, e.key) + " HTTP/1.1");
          req.push("Content-Type: application/json; charset=utf-8");
          req.push("Host: " + location.host);
          req.push("", j ? JSON.stringify(j) : "");
        });
      };
      for (var i = 0, x = changes.addedRecords.length; i < x; i++) {
        _loop_1(i, x);
      }
      var _loop_2 = function(i2, x2) {
        changes.changedRecords.forEach(function(j, d) {
          var stat = {
            "method": _this.options.updateType + " ",
            "url": function(data, i3, key) {
              return "";
            },
            "data": function(data, i3) {
              return JSON.stringify(data[i3]) + "\n\n";
            }
          };
          req.push("--" + initialGuid);
          req.push("Content-Type: application/http; msgtype=request", "");
          req.push("PUT /api/" + (dm.dataSource.updateUrl || dm.dataSource.crudUrl || e.url) + stat.url(changes.changedRecords, i2, e.key) + " HTTP/1.1");
          req.push("Content-Type: application/json; charset=utf-8");
          req.push("Host: " + location.host);
          req.push("", j ? JSON.stringify(j) : "");
        });
      };
      for (var i = 0, x = changes.changedRecords.length; i < x; i++) {
        _loop_2(i, x);
      }
      var _loop_3 = function(i2, x2) {
        changes.deletedRecords.forEach(function(j, d) {
          var state = {
            "mtd": "DELETE ",
            "url": function(data, i3, key) {
              var url2 = DataUtil.getObject(key, data[i3]);
              if (typeof url2 === "number" || DataUtil.parse.isGuid(url2)) {
                return "/" + url2;
              } else if (url2 instanceof Date) {
                var datTime = data[i3][key];
                return "/" + datTime.toJSON();
              } else {
                return "/'" + url2 + "'";
              }
            },
            "data": function(data, i3) {
              return "";
            }
          };
          req.push("--" + initialGuid);
          req.push("Content-Type: application/http; msgtype=request", "");
          req.push("DELETE /api/" + (dm.dataSource.removeUrl || dm.dataSource.crudUrl || e.url) + state.url(changes.deletedRecords, i2, e.key) + " HTTP/1.1");
          req.push("Content-Type: application/json; charset=utf-8");
          req.push("Host: " + location.host);
          req.push("", j ? JSON.stringify(j) : "");
        });
      };
      for (var i = 0, x = changes.deletedRecords.length; i < x; i++) {
        _loop_3(i, x);
      }
      req.push("--" + initialGuid + "--", "");
      return {
        type: "POST",
        url,
        contentType: "multipart/mixed; boundary=" + initialGuid,
        data: req.join("\r\n")
      };
    };
    WebApiAdaptor2.prototype.beforeSend = function(dm, request, settings) {
      request.headers.set("Accept", "application/json, text/javascript, */*; q=0.01");
    };
    WebApiAdaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes) {
      var pvtData = "pvtData";
      var pvt = request && request[pvtData];
      var count = null;
      var args = {};
      if (request && request.type.toLowerCase() !== "post") {
        var versionCheck = xhr && request.fetchRequest.headers.get("DataServiceVersion");
        var version = versionCheck && parseInt(versionCheck, 10) || 2;
        if (query && query.isCountRequired) {
          if (!DataUtil.isNull(data.Count)) {
            count = data.Count;
          }
        }
        if (version < 3 && data.Items) {
          data = data.Items;
        }
        args.count = count;
        args.result = data;
        this.getAggregateResult(pvt, data, args, null, query);
      }
      args.result = args.result || data;
      return DataUtil.isNull(count) ? args.result : { result: args.result, count: args.count, aggregates: args.aggregates };
    };
    return WebApiAdaptor2;
  }(ODataAdaptor)
);
var WebMethodAdaptor = (
  /** @class */
  function(_super) {
    __extends(WebMethodAdaptor2, _super);
    function WebMethodAdaptor2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WebMethodAdaptor2.prototype.processQuery = function(dm, query, hierarchyFilters) {
      var obj = new UrlAdaptor().processQuery(dm, query, hierarchyFilters);
      var getData = "data";
      var data = DataUtil.parse.parseJson(obj[getData]);
      var result = {};
      var value = "value";
      if (data.param) {
        for (var i = 0; i < data.param.length; i++) {
          var param = data.param[i];
          var key = Object.keys(param)[0];
          result[key] = param[key];
        }
      }
      result[value] = data;
      var pvtData = "pvtData";
      var url = "url";
      return {
        data: JSON.stringify(result),
        url: obj[url],
        pvtData: obj[pvtData],
        type: "POST",
        contentType: "application/json; charset=utf-8"
      };
    };
    return WebMethodAdaptor2;
  }(UrlAdaptor)
);
var RemoteSaveAdaptor = (
  /** @class */
  function(_super) {
    __extends(RemoteSaveAdaptor2, _super);
    function RemoteSaveAdaptor2() {
      var _this = _super.call(this) || this;
      setValue("beforeSend", UrlAdaptor.prototype.beforeSend, _this);
      return _this;
    }
    RemoteSaveAdaptor2.prototype.insert = function(dm, data, tableName, query, position) {
      this.pvt.position = position;
      this.updateType = "add";
      return {
        url: dm.dataSource.insertUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          value: data,
          table: tableName,
          action: "insert"
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    RemoteSaveAdaptor2.prototype.remove = function(dm, keyField, val, tableName, query) {
      _super.prototype.remove.call(this, dm, keyField, val);
      return {
        type: "POST",
        url: dm.dataSource.removeUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          key: val,
          keyColumn: keyField,
          table: tableName,
          action: "remove"
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    RemoteSaveAdaptor2.prototype.update = function(dm, keyField, val, tableName, query) {
      this.updateType = "update";
      this.updateKey = keyField;
      return {
        type: "POST",
        url: dm.dataSource.updateUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        data: JSON.stringify(extend({}, {
          value: val,
          action: "update",
          keyColumn: keyField,
          key: val[keyField],
          table: tableName
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    RemoteSaveAdaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes, e) {
      var i;
      var newData = request ? JSON.parse(request.data) : data;
      data = newData.action === "batch" ? DataUtil.parse.parseJson(data) : data;
      if (this.updateType === "add") {
        _super.prototype.insert.call(this, ds, data, null, null, this.pvt.position);
      }
      if (this.updateType === "update") {
        _super.prototype.update.call(this, ds, this.updateKey, data);
      }
      this.updateType = void 0;
      if (data.added) {
        for (i = 0; i < data.added.length; i++) {
          _super.prototype.insert.call(this, ds, data.added[i]);
        }
      }
      if (data.changed) {
        for (i = 0; i < data.changed.length; i++) {
          _super.prototype.update.call(this, ds, e.key, data.changed[i]);
        }
      }
      if (data.deleted) {
        for (i = 0; i < data.deleted.length; i++) {
          _super.prototype.remove.call(this, ds, e.key, data.deleted[i]);
        }
      }
      return data;
    };
    RemoteSaveAdaptor2.prototype.batchRequest = function(dm, changes, e, query, original) {
      return {
        type: "POST",
        url: dm.dataSource.batchUrl || dm.dataSource.crudUrl || dm.dataSource.url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(extend({}, {
          changed: changes.changedRecords,
          added: changes.addedRecords,
          deleted: changes.deletedRecords,
          action: "batch",
          table: e.url,
          key: e.key
        }, DataUtil.getAddParams(this, dm, query)))
      };
    };
    RemoteSaveAdaptor2.prototype.addParams = function(options) {
      var urlParams = new UrlAdaptor();
      urlParams.addParams(options);
    };
    return RemoteSaveAdaptor2;
  }(JsonAdaptor)
);
var CustomDataAdaptor = (
  /** @class */
  function(_super) {
    __extends(CustomDataAdaptor2, _super);
    function CustomDataAdaptor2(props) {
      var _this = _super.call(this) || this;
      _this.options = extend({}, _this.options, {
        getData: new Function(),
        addRecord: new Function(),
        updateRecord: new Function(),
        deleteRecord: new Function(),
        batchUpdate: new Function()
      });
      extend(_this.options, props || {});
      return _this;
    }
    CustomDataAdaptor2.prototype.getModuleName = function() {
      return "CustomDataAdaptor";
    };
    return CustomDataAdaptor2;
  }(UrlAdaptor)
);
var GraphQLAdaptor = (
  /** @class */
  function(_super) {
    __extends(GraphQLAdaptor2, _super);
    function GraphQLAdaptor2(options) {
      var _this = _super.call(this) || this;
      _this.opt = options;
      _this.schema = _this.opt.response;
      _this.query = _this.opt.query;
      _this.getVariables = _this.opt.getVariables ? _this.opt.getVariables : function() {
      };
      _this.getQuery = function() {
        return _this.query;
      };
      return _this;
    }
    GraphQLAdaptor2.prototype.getModuleName = function() {
      return "GraphQLAdaptor";
    };
    GraphQLAdaptor2.prototype.processQuery = function(datamanager, query) {
      var urlQuery = _super.prototype.processQuery.apply(this, arguments);
      var dm = JSON.parse(urlQuery.data);
      var keys = [
        "skip",
        "take",
        "sorted",
        "table",
        "select",
        "where",
        "search",
        "requiresCounts",
        "aggregates",
        "params"
      ];
      var temp = {};
      var str = "searchwhereparams";
      keys.filter(function(e) {
        temp[e] = str.indexOf(e) > -1 ? JSON.stringify(dm[e]) : dm[e];
      });
      var vars = this.getVariables() || {};
      vars["datamanager"] = temp;
      var data = JSON.stringify({
        query: this.getQuery(),
        variables: vars
      });
      urlQuery.data = data;
      return urlQuery;
    };
    GraphQLAdaptor2.prototype.processResponse = function(resData, ds, query, xhr, request) {
      var res = resData;
      var count;
      var aggregates;
      var result = getValue(this.schema.result, res.data);
      if (this.schema.count) {
        count = getValue(this.schema.count, res.data);
      }
      if (this.schema.aggregates) {
        aggregates = getValue(this.schema.aggregates, res.data);
        aggregates = !isNullOrUndefined(aggregates) ? DataUtil.parse.parseJson(aggregates) : aggregates;
      }
      var pvt = request.pvtData || {};
      var args = { result, aggregates };
      var data = args;
      if (pvt && pvt.groups && pvt.groups.length) {
        this.getAggregateResult(pvt, data, args, null, query);
      }
      return !isNullOrUndefined(count) ? { result: args.result, count, aggregates } : args.result;
    };
    GraphQLAdaptor2.prototype.insert = function() {
      var inserted = _super.prototype.insert.apply(this, arguments);
      return this.generateCrudData(inserted, "insert");
    };
    GraphQLAdaptor2.prototype.update = function() {
      var inserted = _super.prototype.update.apply(this, arguments);
      return this.generateCrudData(inserted, "update");
    };
    GraphQLAdaptor2.prototype.remove = function() {
      var inserted = _super.prototype.remove.apply(this, arguments);
      return this.generateCrudData(inserted, "remove");
    };
    GraphQLAdaptor2.prototype.batchRequest = function(dm, changes, e, query, original) {
      var batch = _super.prototype.batchRequest.apply(this, arguments);
      var bData = JSON.parse(batch.data);
      bData.key = e.key;
      batch.data = JSON.stringify(bData);
      return this.generateCrudData(batch, "batch");
    };
    GraphQLAdaptor2.prototype.generateCrudData = function(crudData, action) {
      var parsed = JSON.parse(crudData.data);
      crudData.data = JSON.stringify({
        query: this.opt.getMutation(action),
        variables: parsed
      });
      return crudData;
    };
    return GraphQLAdaptor2;
  }(UrlAdaptor)
);
var CacheAdaptor = (
  /** @class */
  function(_super) {
    __extends(CacheAdaptor2, _super);
    function CacheAdaptor2(adaptor, timeStamp, pageSize) {
      var _this = _super.call(this) || this;
      _this.isCrudAction = false;
      _this.isInsertAction = false;
      if (!isNullOrUndefined(adaptor)) {
        _this.cacheAdaptor = adaptor;
      }
      _this.pageSize = pageSize;
      _this.guidId = DataUtil.getGuid("cacheAdaptor");
      var obj = { keys: [], results: [] };
      window.localStorage.setItem(_this.guidId, JSON.stringify(obj));
      var guid = _this.guidId;
      if (!isNullOrUndefined(timeStamp)) {
        setInterval(function() {
          var data = DataUtil.parse.parseJson(window.localStorage.getItem(guid));
          var forDel = [];
          for (var i = 0; i < data.results.length; i++) {
            var currentTime = +/* @__PURE__ */ new Date();
            var requestTime = +new Date(data.results[i].timeStamp);
            data.results[i].timeStamp = currentTime - requestTime;
            if (currentTime - requestTime > timeStamp) {
              forDel.push(i);
            }
          }
          for (var i = 0; i < forDel.length; i++) {
            data.results.splice(forDel[i], 1);
            data.keys.splice(forDel[i], 1);
          }
          window.localStorage.removeItem(guid);
          window.localStorage.setItem(guid, JSON.stringify(data));
        }, timeStamp);
      }
      return _this;
    }
    CacheAdaptor2.prototype.generateKey = function(url, query) {
      var queries = this.getQueryRequest(query);
      var singles = Query.filterQueryLists(query.queries, ["onSelect", "onPage", "onSkip", "onTake", "onRange"]);
      var key = url;
      var page = "onPage";
      if (page in singles) {
        key += singles[page].pageIndex;
      }
      queries.sorts.forEach(function(obj) {
        key += obj.e.direction + obj.e.fieldName;
      });
      queries.groups.forEach(function(obj) {
        key += obj.e.fieldName;
      });
      queries.searches.forEach(function(obj) {
        key += obj.e.searchKey;
      });
      for (var filter = 0; filter < queries.filters.length; filter++) {
        var currentFilter = queries.filters[filter];
        if (currentFilter.e.isComplex) {
          var newQuery = query.clone();
          newQuery.queries = [];
          for (var i = 0; i < currentFilter.e.predicates.length; i++) {
            newQuery.queries.push({ fn: "onWhere", e: currentFilter.e.predicates[i], filter: query.queries.filter });
          }
          key += currentFilter.e.condition + this.generateKey(url, newQuery);
        } else {
          key += currentFilter.e.field + currentFilter.e.operator + currentFilter.e.value;
        }
      }
      return key;
    };
    CacheAdaptor2.prototype.processQuery = function(dm, query, hierarchyFilters) {
      var key = this.generateKey(dm.dataSource.url, query);
      var cachedItems = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
      var data = cachedItems ? cachedItems.results[cachedItems.keys.indexOf(key)] : null;
      if (data != null && !this.isCrudAction && !this.isInsertAction) {
        return data;
      }
      this.isCrudAction = null;
      this.isInsertAction = null;
      return this.cacheAdaptor.processQuery.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
    };
    CacheAdaptor2.prototype.processResponse = function(data, ds, query, xhr, request, changes) {
      if (this.isInsertAction || request && this.cacheAdaptor.options.batch && DataUtil.endsWith(request.url, this.cacheAdaptor.options.batch) && request.type.toLowerCase() === "post") {
        return this.cacheAdaptor.processResponse(data, ds, query, xhr, request, changes);
      }
      data = this.cacheAdaptor.processResponse.apply(this.cacheAdaptor, [].slice.call(arguments, 0));
      var key = query ? this.generateKey(ds.dataSource.url, query) : ds.dataSource.url;
      var obj = {};
      obj = DataUtil.parse.parseJson(window.localStorage.getItem(this.guidId));
      var index = obj.keys.indexOf(key);
      if (index !== -1) {
        obj.results.splice(index, 1);
        obj.keys.splice(index, 1);
      }
      obj.results[obj.keys.push(key) - 1] = { keys: key, result: data.result, timeStamp: /* @__PURE__ */ new Date(), count: data.count };
      while (obj.results.length > this.pageSize) {
        obj.results.splice(0, 1);
        obj.keys.splice(0, 1);
      }
      window.localStorage.setItem(this.guidId, JSON.stringify(obj));
      return data;
    };
    CacheAdaptor2.prototype.beforeSend = function(dm, request, settings) {
      if (!isNullOrUndefined(this.cacheAdaptor.options.batch) && DataUtil.endsWith(settings.url, this.cacheAdaptor.options.batch) && settings.type.toLowerCase() === "post") {
        request.headers.set("Accept", this.cacheAdaptor.options.multipartAccept);
      }
      if (!dm.dataSource.crossDomain) {
        request.headers.set("Accept", this.cacheAdaptor.options.accept);
      }
    };
    CacheAdaptor2.prototype.update = function(dm, keyField, value, tableName) {
      this.isCrudAction = true;
      return this.cacheAdaptor.update(dm, keyField, value, tableName);
    };
    CacheAdaptor2.prototype.insert = function(dm, data, tableName) {
      this.isInsertAction = true;
      return this.cacheAdaptor.insert(dm, data, tableName);
    };
    CacheAdaptor2.prototype.remove = function(dm, keyField, value, tableName) {
      this.isCrudAction = true;
      return this.cacheAdaptor.remove(dm, keyField, value, tableName);
    };
    CacheAdaptor2.prototype.batchRequest = function(dm, changes, e) {
      return this.cacheAdaptor.batchRequest(dm, changes, e);
    };
    return CacheAdaptor2;
  }(UrlAdaptor)
);

// node_modules/@syncfusion/ej2-data/src/manager.js
var DataManager = (
  /** @class */
  function() {
    function DataManager2(dataSource, query, adaptor) {
      var _this = this;
      this.dateParse = true;
      this.timeZoneHandling = true;
      this.persistQuery = {};
      this.isInitialLoad = false;
      this.requests = [];
      this.isInitialLoad = true;
      if (!dataSource && !this.dataSource) {
        dataSource = [];
      }
      adaptor = adaptor || dataSource.adaptor;
      if (dataSource && dataSource.timeZoneHandling === false) {
        this.timeZoneHandling = dataSource.timeZoneHandling;
      }
      var data;
      if (dataSource instanceof Array) {
        data = {
          json: dataSource,
          offline: true
        };
      } else if (typeof dataSource === "object") {
        if (!dataSource.json) {
          dataSource.json = [];
        }
        if (!dataSource.enablePersistence) {
          dataSource.enablePersistence = false;
        }
        if (!dataSource.id) {
          dataSource.id = "";
        }
        if (!dataSource.ignoreOnPersist) {
          dataSource.ignoreOnPersist = [];
        }
        data = {
          url: dataSource.url,
          insertUrl: dataSource.insertUrl,
          removeUrl: dataSource.removeUrl,
          updateUrl: dataSource.updateUrl,
          crudUrl: dataSource.crudUrl,
          batchUrl: dataSource.batchUrl,
          json: dataSource.json,
          headers: dataSource.headers,
          accept: dataSource.accept,
          data: dataSource.data,
          timeTillExpiration: dataSource.timeTillExpiration,
          cachingPageSize: dataSource.cachingPageSize,
          enableCaching: dataSource.enableCaching,
          requestType: dataSource.requestType,
          key: dataSource.key,
          crossDomain: dataSource.crossDomain,
          jsonp: dataSource.jsonp,
          dataType: dataSource.dataType,
          offline: dataSource.offline !== void 0 ? dataSource.offline : dataSource.adaptor instanceof RemoteSaveAdaptor || dataSource.adaptor instanceof CustomDataAdaptor ? false : dataSource.url ? false : true,
          requiresFormat: dataSource.requiresFormat,
          enablePersistence: dataSource.enablePersistence,
          id: dataSource.id,
          ignoreOnPersist: dataSource.ignoreOnPersist
        };
      } else {
        DataUtil.throwError("DataManager: Invalid arguments");
      }
      if (data.requiresFormat === void 0 && !DataUtil.isCors()) {
        data.requiresFormat = isNullOrUndefined(data.crossDomain) ? true : data.crossDomain;
      }
      if (data.dataType === void 0) {
        data.dataType = "json";
      }
      this.dataSource = data;
      this.defaultQuery = query;
      if (this.dataSource.enablePersistence && this.dataSource.id) {
        window.addEventListener("unload", this.setPersistData.bind(this));
      }
      if (data.url && data.offline && !data.json.length) {
        this.isDataAvailable = false;
        this.adaptor = adaptor || new ODataAdaptor();
        this.dataSource.offline = false;
        this.ready = this.executeQuery(query || new Query());
        this.ready.then(function(e) {
          _this.dataSource.offline = true;
          _this.isDataAvailable = true;
          data.json = e.result;
          _this.adaptor = new JsonAdaptor();
        });
      } else {
        this.adaptor = data.offline ? new JsonAdaptor() : new ODataAdaptor();
      }
      if (!data.jsonp && this.adaptor instanceof ODataAdaptor) {
        data.jsonp = "callback";
      }
      this.adaptor = adaptor || this.adaptor;
      if (data.enableCaching) {
        this.adaptor = new CacheAdaptor(this.adaptor, data.timeTillExpiration, data.cachingPageSize);
      }
      return this;
    }
    DataManager2.prototype.getPersistedData = function(id) {
      var persistedData = localStorage.getItem(id || this.dataSource.id);
      return JSON.parse(persistedData);
    };
    DataManager2.prototype.setPersistData = function(e, id, persistData) {
      localStorage.setItem(id || this.dataSource.id, JSON.stringify(persistData || this.persistQuery));
    };
    DataManager2.prototype.setPersistQuery = function(query) {
      var _this = this;
      var persistedQuery = this.getPersistedData();
      if (this.isInitialLoad && persistedQuery && Object.keys(persistedQuery).length) {
        this.persistQuery = persistedQuery;
        this.persistQuery.queries = this.persistQuery.queries.filter(function(query2) {
          if (_this.dataSource.ignoreOnPersist && _this.dataSource.ignoreOnPersist.length) {
            if (query2.fn && _this.dataSource.ignoreOnPersist.some(function(keyword) {
              return query2.fn === keyword;
            })) {
              return false;
            }
          }
          if (query2.fn === "onWhere") {
            var e = query2.e;
            if (e && e.isComplex && e.predicates instanceof Array) {
              var allPredicates = e.predicates.map(function(predicateObj) {
                if (predicateObj.predicates && predicateObj.predicates instanceof Array) {
                  var nestedPredicates = predicateObj.predicates.map(function(nestedPredicate) {
                    var field2 = nestedPredicate.field, operator2 = nestedPredicate.operator, value2 = nestedPredicate.value, ignoreCase2 = nestedPredicate.ignoreCase, ignoreAccent2 = nestedPredicate.ignoreAccent, matchCase2 = nestedPredicate.matchCase;
                    return new Predicate(field2, operator2, value2, ignoreCase2, ignoreAccent2, matchCase2);
                  });
                  return predicateObj.condition === "and" ? Predicate.and(nestedPredicates) : Predicate.or(nestedPredicates);
                } else {
                  var field = predicateObj.field, operator = predicateObj.operator, value = predicateObj.value, ignoreCase = predicateObj.ignoreCase, ignoreAccent = predicateObj.ignoreAccent, matchCase = predicateObj.matchCase;
                  return new Predicate(field, operator, value, ignoreCase, ignoreAccent, matchCase);
                }
              });
              query2.e = new Predicate(allPredicates[0], e.condition, allPredicates.slice(1));
            }
          }
          return true;
        });
        var newQuery = extend(new Query(), this.persistQuery);
        this.isInitialLoad = false;
        return newQuery;
      } else {
        this.persistQuery = query;
        this.isInitialLoad = false;
        return query;
      }
    };
    DataManager2.prototype.setDefaultQuery = function(query) {
      this.defaultQuery = query;
      return this;
    };
    DataManager2.prototype.executeLocal = function(query) {
      if (!this.defaultQuery && !(query instanceof Query)) {
        DataUtil.throwError("DataManager - executeLocal() : A query is required to execute");
      }
      if (!this.dataSource.json) {
        DataUtil.throwError("DataManager - executeLocal() : Json data is required to execute");
      }
      if (this.dataSource.enablePersistence && this.dataSource.id) {
        query = this.setPersistQuery(query);
      }
      query = query || this.defaultQuery;
      var result = this.adaptor.processQuery(this, query);
      if (query.subQuery) {
        var from = query.subQuery.fromTable;
        var lookup = query.subQuery.lookups;
        var res = query.isCountRequired ? result.result : result;
        if (lookup && lookup instanceof Array) {
          DataUtil.buildHierarchy(query.subQuery.fKey, from, res, lookup, query.subQuery.key);
        }
        for (var j = 0; j < res.length; j++) {
          if (res[j][from] instanceof Array) {
            res[j] = extend({}, {}, res[j]);
            res[j][from] = this.adaptor.processResponse(query.subQuery.using(new DataManager2(res[j][from].slice(0))).executeLocal(), this, query);
          }
        }
      }
      return this.adaptor.processResponse(result, this, query);
    };
    DataManager2.prototype.executeQuery = function(query, done, fail, always) {
      var _this = this;
      var makeRequest = "makeRequest";
      if (this.dataSource.enablePersistence && this.dataSource.id) {
        query = this.setPersistQuery(query);
      }
      if (typeof query === "function") {
        always = fail;
        fail = done;
        done = query;
        query = null;
      }
      if (!query) {
        query = this.defaultQuery;
      }
      if (!(query instanceof Query)) {
        DataUtil.throwError("DataManager - executeQuery() : A query is required to execute");
      }
      var deffered = new Deferred();
      var args = { query };
      if (!this.dataSource.offline && (this.dataSource.url !== void 0 && this.dataSource.url !== "") || !isNullOrUndefined(this.adaptor[makeRequest]) || this.isCustomDataAdaptor(this.adaptor)) {
        var result = this.adaptor.processQuery(this, query);
        if (!isNullOrUndefined(this.adaptor[makeRequest])) {
          this.adaptor[makeRequest](result, deffered, args, query);
        } else if (!isNullOrUndefined(result.url) || this.isCustomDataAdaptor(this.adaptor)) {
          this.requests = [];
          this.makeRequest(result, deffered, args, query);
        } else {
          args = DataManager2.getDeferedArgs(query, result, args);
          deffered.resolve(args);
        }
      } else {
        DataManager2.nextTick(function() {
          var res = _this.executeLocal(query);
          args = DataManager2.getDeferedArgs(query, res, args);
          deffered.resolve(args);
        });
      }
      if (done || fail) {
        deffered.promise.then(done, fail);
      }
      if (always) {
        deffered.promise.then(always, always);
      }
      return deffered.promise;
    };
    DataManager2.getDeferedArgs = function(query, result, args) {
      if (query.isCountRequired) {
        args.result = result.result;
        args.count = result.count;
        args.aggregates = result.aggregates;
      } else {
        args.result = result;
      }
      return args;
    };
    DataManager2.nextTick = function(fn) {
      (window.setImmediate || window.setTimeout)(fn, 0);
    };
    DataManager2.prototype.extendRequest = function(url, fnSuccess, fnFail) {
      return extend({}, {
        type: "GET",
        dataType: this.dataSource.dataType,
        crossDomain: this.dataSource.crossDomain,
        jsonp: this.dataSource.jsonp,
        cache: true,
        processData: false,
        onSuccess: fnSuccess,
        onFailure: fnFail
      }, url);
    };
    DataManager2.prototype.makeRequest = function(url, deffered, args, query) {
      var _this = this;
      var isSelector = !!query.subQuerySelector;
      var fnFail = function(e) {
        args.error = e;
        deffered.reject(args);
      };
      var process = function(data, count, xhr, request2, actual, aggregates, virtualSelectRecords) {
        args.xhr = xhr;
        args.count = count ? parseInt(count.toString(), 10) : 0;
        args.result = data;
        args.request = request2;
        args.aggregates = aggregates;
        args.actual = actual;
        args.virtualSelectRecords = virtualSelectRecords;
        deffered.resolve(args);
      };
      var fnQueryChild = function(data, selector) {
        var subDeffer = new Deferred();
        var childArgs = { parent: args };
        query.subQuery.isChild = true;
        var subUrl = _this.adaptor.processQuery(_this, query.subQuery, data ? _this.adaptor.processResponse(data) : selector);
        var childReq = _this.makeRequest(subUrl, subDeffer, childArgs, query.subQuery);
        if (!isSelector) {
          subDeffer.then(function(subData) {
            if (data) {
              DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, data, subData, query.subQuery.key);
              process(data, subData.count, subData.xhr);
            }
          }, fnFail);
        }
        return childReq;
      };
      var fnSuccess = function(data, request2) {
        if (_this.isGraphQLAdaptor(_this.adaptor)) {
          if (!isNullOrUndefined(data["errors"])) {
            return fnFail(data["errors"], request2);
          }
        }
        if (_this.isCustomDataAdaptor(_this.adaptor)) {
          request2 = extend({}, _this.fetchReqOption, request2);
        }
        if (request2.contentType.indexOf("xml") === -1 && _this.dateParse) {
          data = DataUtil.parse.parseJson(data);
        }
        var result = _this.adaptor.processResponse(data, _this, query, request2.fetchRequest, request2);
        var count = 0;
        var aggregates = null;
        var virtualSelectRecords = "virtualSelectRecords";
        var virtualRecords = data[virtualSelectRecords];
        if (query.isCountRequired) {
          count = result.count;
          aggregates = result.aggregates;
          result = result.result;
        }
        if (!query.subQuery) {
          process(result, count, request2.fetchRequest, request2.type, data, aggregates, virtualRecords);
          return;
        }
        if (!isSelector) {
          fnQueryChild(result, request2);
        }
      };
      var req = this.extendRequest(url, fnSuccess, fnFail);
      if (!this.isCustomDataAdaptor(this.adaptor)) {
        var fetch_1 = new Fetch(req);
        fetch_1.beforeSend = function() {
          _this.beforeSend(fetch_1.fetchRequest, fetch_1);
        };
        req = fetch_1.send();
        req.catch(function(e) {
          return true;
        });
        this.requests.push(fetch_1);
      } else {
        this.fetchReqOption = req;
        var request = req;
        this.adaptor.options.getData({
          data: request.data,
          onSuccess: request.onSuccess,
          onFailure: request.onFailure
        });
      }
      if (isSelector) {
        var promise = void 0;
        var res = query.subQuerySelector.call(this, { query: query.subQuery, parent: query });
        if (res && res.length) {
          promise = Promise.all([req, fnQueryChild(null, res)]);
          promise.then(function() {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args2[_i] = arguments[_i];
            }
            var result = args2[0];
            var pResult = _this.adaptor.processResponse(result[0], _this, query, _this.requests[0].fetchRequest, _this.requests[0]);
            var count = 0;
            if (query.isCountRequired) {
              count = pResult.count;
              pResult = pResult.result;
            }
            var cResult = _this.adaptor.processResponse(result[1], _this, query.subQuery, _this.requests[1].fetchRequest, _this.requests[1]);
            count = 0;
            if (query.subQuery.isCountRequired) {
              count = cResult.count;
              cResult = cResult.result;
            }
            DataUtil.buildHierarchy(query.subQuery.fKey, query.subQuery.fromTable, pResult, cResult, query.subQuery.key);
            isSelector = false;
            process(pResult, count, _this.requests[0].fetchRequest);
          });
        } else {
          isSelector = false;
        }
      }
      return req;
    };
    DataManager2.prototype.beforeSend = function(request, settings) {
      this.adaptor.beforeSend(this, request, settings);
      var headers = this.dataSource.headers;
      var props;
      for (var i = 0; headers && i < headers.length; i++) {
        props = [];
        var keys = Object.keys(headers[i]);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var prop = keys_1[_i];
          props.push(prop);
          request.headers.set(prop, headers[i][prop]);
        }
      }
    };
    DataManager2.prototype.saveChanges = function(changes, key, tableName, query, original) {
      var _this = this;
      if (tableName instanceof Query) {
        query = tableName;
        tableName = null;
      }
      var args = {
        url: tableName,
        key: key || this.dataSource.key
      };
      var req = this.adaptor.batchRequest(this, changes, args, query || new Query(), original);
      var dofetchRequest = "dofetchRequest";
      if (this.dataSource.offline) {
        return req;
      }
      if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
        return this.adaptor[dofetchRequest](req);
      } else if (!this.isCustomDataAdaptor(this.adaptor)) {
        var deff_1 = new Deferred();
        var fetch_2 = new Fetch(req);
        fetch_2.beforeSend = function() {
          _this.beforeSend(fetch_2.fetchRequest, fetch_2);
        };
        fetch_2.onSuccess = function(data, request) {
          if (_this.isGraphQLAdaptor(_this.adaptor)) {
            if (!isNullOrUndefined(data["errors"])) {
              fetch_2.onFailure(JSON.stringify(data["errors"]));
            }
          }
          deff_1.resolve(_this.adaptor.processResponse(data, _this, null, request.fetchRequest, request, changes, args));
        };
        fetch_2.onFailure = function(e) {
          deff_1.reject([{ error: e }]);
        };
        fetch_2.send().catch(function(e) {
          return true;
        });
        return deff_1.promise;
      } else {
        return this.dofetchRequest(req, this.adaptor.options.batchUpdate);
      }
    };
    DataManager2.prototype.insert = function(data, tableName, query, position) {
      if (tableName instanceof Query) {
        query = tableName;
        tableName = null;
      }
      var req = this.adaptor.insert(this, data, tableName, query, position);
      var dofetchRequest = "dofetchRequest";
      if (this.dataSource.offline) {
        return req;
      }
      if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
        return this.adaptor[dofetchRequest](req);
      } else {
        return this.dofetchRequest(req, this.adaptor.options.addRecord);
      }
    };
    DataManager2.prototype.remove = function(keyField, value, tableName, query) {
      if (typeof value === "object") {
        value = DataUtil.getObject(keyField, value);
      }
      if (tableName instanceof Query) {
        query = tableName;
        tableName = null;
      }
      var res = this.adaptor.remove(this, keyField, value, tableName, query);
      var dofetchRequest = "dofetchRequest";
      if (this.dataSource.offline) {
        return res;
      }
      if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
        return this.adaptor[dofetchRequest](res);
      } else {
        var remove = this.adaptor.options.deleteRecord;
        return this.dofetchRequest(res, remove);
      }
    };
    DataManager2.prototype.update = function(keyField, value, tableName, query, original) {
      if (tableName instanceof Query) {
        query = tableName;
        tableName = null;
      }
      var res = this.adaptor.update(this, keyField, value, tableName, query, original);
      var dofetchRequest = "dofetchRequest";
      if (this.dataSource.offline) {
        return res;
      }
      if (!isNullOrUndefined(this.adaptor[dofetchRequest])) {
        return this.adaptor[dofetchRequest](res);
      } else {
        var update = this.adaptor.options.updateRecord;
        return this.dofetchRequest(res, update);
      }
    };
    DataManager2.prototype.isCustomDataAdaptor = function(dataSource) {
      return this.adaptor.getModuleName && this.adaptor.getModuleName() === "CustomDataAdaptor";
    };
    DataManager2.prototype.isGraphQLAdaptor = function(dataSource) {
      return this.adaptor.getModuleName && this.adaptor.getModuleName() === "GraphQLAdaptor";
    };
    DataManager2.prototype.successFunc = function(record, request) {
      if (this.isGraphQLAdaptor(this.adaptor)) {
        var data = JSON.parse(record);
        if (!isNullOrUndefined(data["errors"])) {
          this.failureFunc(JSON.stringify(data["errors"]));
        }
      }
      if (this.isCustomDataAdaptor(this.adaptor)) {
        request = extend({}, this.fetchReqOption, request);
      }
      try {
        DataUtil.parse.parseJson(record);
      } catch (e) {
        record = [];
      }
      record = this.adaptor.processResponse(DataUtil.parse.parseJson(record), this, null, request.fetchRequest, request);
      this.fetchDeffered.resolve(record);
    };
    DataManager2.prototype.failureFunc = function(e) {
      this.fetchDeffered.reject([{ error: e }]);
    };
    DataManager2.prototype.dofetchRequest = function(res, fetchFunc) {
      var _this = this;
      res = extend({}, {
        type: "POST",
        contentType: "application/json; charset=utf-8",
        processData: false
      }, res);
      this.fetchDeffered = new Deferred();
      if (!this.isCustomDataAdaptor(this.adaptor)) {
        var fetch_3 = new Fetch(res);
        fetch_3.beforeSend = function() {
          _this.beforeSend(fetch_3.fetchRequest, fetch_3);
        };
        fetch_3.onSuccess = this.successFunc.bind(this);
        fetch_3.onFailure = this.failureFunc.bind(this);
        fetch_3.send().catch(function(e) {
          return true;
        });
      } else {
        this.fetchReqOption = res;
        fetchFunc.call(this, {
          data: res.data,
          onSuccess: this.successFunc.bind(this),
          onFailure: this.failureFunc.bind(this)
        });
      }
      return this.fetchDeffered.promise;
    };
    DataManager2.prototype.clearPersistence = function() {
      window.removeEventListener("unload", this.setPersistData.bind(this));
      this.dataSource.enablePersistence = false;
      this.persistQuery = {};
      window.localStorage.setItem(this.dataSource.id, "[]");
    };
    return DataManager2;
  }()
);
var Deferred = (
  /** @class */
  function() {
    function Deferred2() {
      var _this = this;
      this.promise = new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
      this.then = this.promise.then.bind(this.promise);
      this.catch = this.promise.catch.bind(this.promise);
    }
    return Deferred2;
  }()
);

// node_modules/@syncfusion/ej2-data/src/util.js
var consts2 = { GroupGuid: "{271bbba0-1ee7}" };
var DataUtil = (
  /** @class */
  function() {
    function DataUtil2() {
    }
    DataUtil2.getValue = function(value, inst) {
      if (typeof value === "function") {
        return value.call(inst || {});
      }
      return value;
    };
    DataUtil2.endsWith = function(input, substr) {
      return input.slice && input.slice(-substr.length) === substr;
    };
    DataUtil2.notEndsWith = function(input, substr) {
      return input.slice && input.slice(-substr.length) !== substr;
    };
    DataUtil2.startsWith = function(input, start) {
      return input.slice(0, start.length) === start;
    };
    DataUtil2.notStartsWith = function(input, start) {
      return input.slice(0, start.length) !== start;
    };
    DataUtil2.wildCard = function(input, pattern) {
      var asteriskSplit;
      var optionalSplit;
      if (pattern.indexOf("[") !== -1) {
        pattern = pattern.split("[").join("[[]");
      }
      if (pattern.indexOf("(") !== -1) {
        pattern = pattern.split("(").join("[(]");
      }
      if (pattern.indexOf(")") !== -1) {
        pattern = pattern.split(")").join("[)]");
      }
      if (pattern.indexOf("\\") !== -1) {
        pattern = pattern.split("\\").join("[\\\\]");
      }
      if (pattern.indexOf("*") !== -1) {
        if (pattern.charAt(0) !== "*") {
          pattern = "^" + pattern;
        }
        if (pattern.charAt(pattern.length - 1) !== "*") {
          pattern = pattern + "$";
        }
        asteriskSplit = pattern.split("*");
        for (var i = 0; i < asteriskSplit.length; i++) {
          if (asteriskSplit[i].indexOf(".") === -1) {
            asteriskSplit[i] = asteriskSplit[i] + ".*";
          } else {
            asteriskSplit[i] = asteriskSplit[i] + "*";
          }
        }
        pattern = asteriskSplit.join("");
      }
      if (pattern.indexOf("%3f") !== -1 || pattern.indexOf("?") !== -1) {
        optionalSplit = pattern.indexOf("%3f") !== -1 ? pattern.split("%3f") : pattern.split("?");
        pattern = optionalSplit.join(".");
      }
      var regexPattern = new RegExp(pattern, "g");
      return regexPattern.test(input);
    };
    DataUtil2.like = function(input, pattern) {
      if (pattern.indexOf("%") !== -1) {
        if (pattern.charAt(0) === "%" && pattern.lastIndexOf("%") < 2) {
          pattern = pattern.substring(1, pattern.length);
          return DataUtil2.startsWith(DataUtil2.toLowerCase(input), DataUtil2.toLowerCase(pattern));
        } else if (pattern.charAt(pattern.length - 1) === "%" && pattern.indexOf("%") > pattern.length - 3) {
          pattern = pattern.substring(0, pattern.length - 1);
          return DataUtil2.endsWith(DataUtil2.toLowerCase(input), DataUtil2.toLowerCase(pattern));
        } else if (pattern.lastIndexOf("%") !== pattern.indexOf("%") && pattern.lastIndexOf("%") > pattern.indexOf("%") + 1) {
          pattern = pattern.substring(pattern.indexOf("%") + 1, pattern.lastIndexOf("%"));
          return input.indexOf(pattern) !== -1;
        } else {
          return input.indexOf(pattern) !== -1;
        }
      } else {
        return false;
      }
    };
    DataUtil2.fnSort = function(order) {
      order = order ? DataUtil2.toLowerCase(order) : "ascending";
      if (order === "ascending") {
        return this.fnAscending;
      }
      return this.fnDescending;
    };
    DataUtil2.fnAscending = function(x, y) {
      if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
        return -1;
      }
      if (y === null || y === void 0) {
        return -1;
      }
      if (typeof x === "string") {
        return x.localeCompare(y);
      }
      if (x === null || x === void 0) {
        return 1;
      }
      return x - y;
    };
    DataUtil2.fnDescending = function(x, y) {
      if (isNullOrUndefined(x) && isNullOrUndefined(y)) {
        return -1;
      }
      if (y === null || y === void 0) {
        return 1;
      }
      if (typeof x === "string") {
        return x.localeCompare(y) * -1;
      }
      if (x === null || x === void 0) {
        return -1;
      }
      return y - x;
    };
    DataUtil2.extractFields = function(obj, fields) {
      var newObj = {};
      for (var i = 0; i < fields.length; i++) {
        newObj = this.setValue(fields[i], this.getObject(fields[i], obj), newObj);
      }
      return newObj;
    };
    DataUtil2.select = function(jsonArray, fields) {
      var newData = [];
      for (var i = 0; i < jsonArray.length; i++) {
        newData.push(this.extractFields(jsonArray[i], fields));
      }
      return newData;
    };
    DataUtil2.group = function(jsonArray, field, aggregates, level, groupDs, format, isLazyLoad) {
      level = level || 1;
      var jsonData = jsonArray;
      var guid = "GroupGuid";
      if (jsonData.GroupGuid === consts2[guid]) {
        var _loop_1 = function(j2) {
          if (!isNullOrUndefined(groupDs)) {
            var indx = -1;
            var temp = groupDs.filter(function(e) {
              return e.key === jsonData[j2].key;
            });
            indx = groupDs.indexOf(temp[0]);
            jsonData[j2].items = this_1.group(jsonData[j2].items, field, aggregates, jsonData.level + 1, groupDs[indx].items, format, isLazyLoad);
            jsonData[j2].count = groupDs[indx].count;
          } else {
            jsonData[j2].items = this_1.group(jsonData[j2].items, field, aggregates, jsonData.level + 1, null, format, isLazyLoad);
            jsonData[j2].count = jsonData[j2].items.length;
          }
        };
        var this_1 = this;
        for (var j = 0; j < jsonData.length; j++) {
          _loop_1(j);
        }
        jsonData.childLevels += 1;
        return jsonData;
      }
      var grouped = {};
      var groupedArray = [];
      groupedArray.GroupGuid = consts2[guid];
      groupedArray.level = level;
      groupedArray.childLevels = 0;
      groupedArray.records = jsonData;
      var _loop_2 = function(i2) {
        var val = this_2.getVal(jsonData, i2, field);
        if (!isNullOrUndefined(format)) {
          val = format(val, field);
        }
        if (!grouped[val]) {
          grouped[val] = {
            key: val,
            count: 0,
            items: [],
            aggregates: {},
            field
          };
          groupedArray.push(grouped[val]);
          if (!isNullOrUndefined(groupDs)) {
            var tempObj = groupDs.filter(function(e) {
              return e.key === grouped[val].key;
            });
            grouped[val].count = tempObj[0].count;
          }
        }
        grouped[val].count = !isNullOrUndefined(groupDs) ? grouped[val].count : grouped[val].count += 1;
        if (!isLazyLoad || isLazyLoad && aggregates.length) {
          grouped[val].items.push(jsonData[i2]);
        }
      };
      var this_2 = this;
      for (var i = 0; i < jsonData.length; i++) {
        _loop_2(i);
      }
      if (aggregates && aggregates.length) {
        var _loop_3 = function(i2) {
          var res = {};
          var fn = void 0;
          var aggs = aggregates;
          for (var j2 = 0; j2 < aggregates.length; j2++) {
            fn = DataUtil2.aggregates[aggregates[j2].type];
            if (!isNullOrUndefined(groupDs)) {
              var temp = groupDs.filter(function(e) {
                return e.key === groupedArray[i2].key;
              });
              if (fn) {
                res[aggs[j2].field + " - " + aggs[j2].type] = fn(temp[0].items, aggs[j2].field);
              }
            } else {
              if (fn) {
                res[aggs[j2].field + " - " + aggs[j2].type] = fn(groupedArray[i2].items, aggs[j2].field);
              }
            }
          }
          groupedArray[i2].aggregates = res;
        };
        for (var i = 0; i < groupedArray.length; i++) {
          _loop_3(i);
        }
      }
      if (isLazyLoad && groupedArray.length && aggregates.length) {
        for (var i = 0; i < groupedArray.length; i++) {
          groupedArray[i].items = [];
        }
      }
      return jsonData.length && groupedArray || jsonData;
    };
    DataUtil2.buildHierarchy = function(fKey, from, source, lookup, pKey) {
      var i;
      var grp = {};
      var temp;
      if (lookup.result) {
        lookup = lookup.result;
      }
      if (lookup.GroupGuid) {
        this.throwError("DataManager: Do not have support Grouping in hierarchy");
      }
      for (i = 0; i < lookup.length; i++) {
        var fKeyData = this.getObject(fKey, lookup[i]);
        temp = grp[fKeyData] || (grp[fKeyData] = []);
        temp.push(lookup[i]);
      }
      for (i = 0; i < source.length; i++) {
        var fKeyData = this.getObject(pKey || fKey, source[i]);
        source[i][from] = grp[fKeyData];
      }
    };
    DataUtil2.getFieldList = function(obj, fields, prefix) {
      if (prefix === void 0) {
        prefix = "";
      }
      if (fields === void 0 || fields === null) {
        return this.getFieldList(obj, [], prefix);
      }
      var copyObj = obj;
      var keys = Object.keys(obj);
      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var prop = keys_1[_i];
        if (typeof copyObj[prop] === "object" && !(copyObj[prop] instanceof Array)) {
          this.getFieldList(copyObj[prop], fields, prefix + prop + ".");
        } else {
          fields.push(prefix + prop);
        }
      }
      return fields;
    };
    DataUtil2.getObject = function(nameSpace, from) {
      if (!nameSpace) {
        return from;
      }
      if (!from) {
        return void 0;
      }
      if (nameSpace.indexOf(".") === -1) {
        var lowerCaseNameSpace = nameSpace.charAt(0).toLowerCase() + nameSpace.slice(1);
        var upperCaseNameSpace = nameSpace.charAt(0).toUpperCase() + nameSpace.slice(1);
        if (!isNullOrUndefined(from[nameSpace])) {
          return from[nameSpace];
        } else {
          if (!isNullOrUndefined(from[lowerCaseNameSpace])) {
            return from[lowerCaseNameSpace];
          } else if (!isNullOrUndefined(from[upperCaseNameSpace])) {
            return from[upperCaseNameSpace];
          } else {
            return null;
          }
        }
      }
      var value = from;
      var splits = nameSpace.split(".");
      for (var i = 0; i < splits.length; i++) {
        if (value == null) {
          break;
        }
        value = value[splits[i]];
        if (value === void 0) {
          var casing = splits[i].charAt(0).toUpperCase() + splits[i].slice(1);
          value = from[casing] || from[casing.charAt(0).toLowerCase() + casing.slice(1)] || null;
        }
        from = value;
      }
      return value;
    };
    DataUtil2.setValue = function(nameSpace, value, obj) {
      var keys = nameSpace.toString().split(".");
      var start = obj || {};
      var fromObj = start;
      var i;
      var length = keys.length;
      var key;
      for (i = 0; i < length; i++) {
        key = keys[i];
        if (i + 1 === length) {
          fromObj[key] = value === void 0 ? void 0 : value;
        } else if (isNullOrUndefined(fromObj[key])) {
          fromObj[key] = {};
        }
        fromObj = fromObj[key];
      }
      return start;
    };
    DataUtil2.sort = function(ds, field, comparer) {
      if (ds.length <= 1) {
        return ds;
      }
      var middle = parseInt((ds.length / 2).toString(), 10);
      var left = ds.slice(0, middle);
      var right = ds.slice(middle);
      left = this.sort(left, field, comparer);
      right = this.sort(right, field, comparer);
      return this.merge(left, right, field, comparer);
    };
    DataUtil2.ignoreDiacritics = function(value) {
      if (typeof value !== "string") {
        return value;
      }
      var result = value.split("");
      var newValue = result.map(function(temp) {
        return temp in DataUtil2.diacritics ? DataUtil2.diacritics[temp] : temp;
      });
      return newValue.join("");
    };
    DataUtil2.merge = function(left, right, fieldName, comparer) {
      var result = [];
      var current;
      while (left.length > 0 || right.length > 0) {
        if (left.length > 0 && right.length > 0) {
          if (comparer) {
            current = comparer(this.getVal(left, 0, fieldName), this.getVal(right, 0, fieldName), left[0], right[0]) <= 0 ? left : right;
          } else {
            current = left[0][fieldName] < left[0][fieldName] ? left : right;
          }
        } else {
          current = left.length > 0 ? left : right;
        }
        result.push(current.shift());
      }
      return result;
    };
    DataUtil2.getVal = function(array, index, field) {
      return field ? this.getObject(field, array[index]) : array[index];
    };
    DataUtil2.toLowerCase = function(val) {
      return val ? typeof val === "string" ? val.toLowerCase() : val.toString() : val === 0 || val === false ? val.toString() : "";
    };
    DataUtil2.callAdaptorFunction = function(adaptor, fnName, param1, param2) {
      if (fnName in adaptor) {
        var res = adaptor[fnName](param1, param2);
        if (!isNullOrUndefined(res)) {
          param1 = res;
        }
      }
      return param1;
    };
    DataUtil2.getAddParams = function(adp, dm, query) {
      var req = {};
      DataUtil2.callAdaptorFunction(adp, "addParams", {
        dm,
        query,
        params: query.params,
        reqParams: req
      });
      return req;
    };
    DataUtil2.isPlainObject = function(obj) {
      return !!obj && obj.constructor === Object;
    };
    DataUtil2.isCors = function() {
      var xhr = null;
      var request = "XMLHttpRequest";
      try {
        xhr = new window[request]();
      } catch (e) {
      }
      return !!xhr && "withCredentials" in xhr;
    };
    DataUtil2.getGuid = function(prefix) {
      var hexs = "0123456789abcdef";
      var rand;
      return (prefix || "") + "00000000-0000-4000-0000-000000000000".replace(/0/g, function(val, i) {
        if ("crypto" in window && "getRandomValues" in crypto) {
          var arr = new Uint8Array(1);
          window.crypto.getRandomValues(arr);
          rand = arr[0] % 16 | 0;
        } else {
          rand = Math.random() * 16 | 0;
        }
        return hexs[i === 19 ? rand & 3 | 8 : rand];
      });
    };
    DataUtil2.isNull = function(val) {
      return val === void 0 || val === null;
    };
    DataUtil2.getItemFromComparer = function(array, field, comparer) {
      var keyVal;
      var current;
      var key;
      var i = 0;
      var castRequired = typeof DataUtil2.getVal(array, 0, field) === "string";
      if (array.length) {
        while (isNullOrUndefined(keyVal) && i < array.length) {
          keyVal = DataUtil2.getVal(array, i, field);
          key = array[i++];
        }
      }
      for (; i < array.length; i++) {
        current = DataUtil2.getVal(array, i, field);
        if (isNullOrUndefined(current)) {
          continue;
        }
        if (castRequired) {
          keyVal = +keyVal;
          current = +current;
        }
        if (comparer(keyVal, current) > 0) {
          keyVal = current;
          key = array[i];
        }
      }
      return key;
    };
    DataUtil2.distinct = function(json, fieldName, requiresCompleteRecord) {
      requiresCompleteRecord = isNullOrUndefined(requiresCompleteRecord) ? false : requiresCompleteRecord;
      var result = [];
      var val;
      var tmp = {};
      json.forEach(function(data, index) {
        val = typeof json[index] === "object" ? DataUtil2.getVal(json, index, fieldName) : json[index];
        if (!(val in tmp)) {
          result.push(!requiresCompleteRecord ? val : json[index]);
          tmp[val] = 1;
        }
      });
      return result;
    };
    DataUtil2.processData = function(dm, records) {
      var query = this.prepareQuery(dm);
      var sampledata = new DataManager(records);
      if (dm.requiresCounts) {
        query.requiresCount();
      }
      var result = sampledata.executeLocal(query);
      var returnValue = {
        result: dm.requiresCounts ? result.result : result,
        count: result.count,
        aggregates: JSON.stringify(result.aggregates)
      };
      return dm.requiresCounts ? returnValue : result;
    };
    DataUtil2.prepareQuery = function(dm) {
      var _this = this;
      var query = new Query();
      if (dm.select) {
        query.select(dm.select);
      }
      if (dm.where) {
        var where = DataUtil2.parse.parseJson(dm.where);
        where.filter(function(pred) {
          if (isNullOrUndefined(pred.condition)) {
            query.where(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent);
          } else {
            var predicateList = [];
            if (pred.field) {
              predicateList.push(new Predicate(pred.field, pred.operator, pred.value, pred.ignoreCase, pred.ignoreAccent));
            } else {
              predicateList = predicateList.concat(_this.getPredicate(pred.predicates));
            }
            if (pred.condition === "or") {
              query.where(Predicate.or(predicateList));
            } else if (pred.condition === "and") {
              query.where(Predicate.and(predicateList));
            }
          }
        });
      }
      if (dm.search) {
        var search = DataUtil2.parse.parseJson(dm.search);
        search.filter(function(e) {
          return query.search(
            e.key,
            e.fields,
            e["operator"],
            // tslint:disable-next-line:no-string-literal
            e["ignoreCase"],
            e["ignoreAccent"]
          );
        });
      }
      if (dm.aggregates) {
        dm.aggregates.filter(function(e) {
          return query.aggregate(e.type, e.field);
        });
      }
      if (dm.sorted) {
        dm.sorted.filter(function(e) {
          return query.sortBy(e.name, e.direction);
        });
      }
      if (dm.skip) {
        query.skip(dm.skip);
      }
      if (dm.take) {
        query.take(dm.take);
      }
      if (dm.group) {
        dm.group.filter(function(grp) {
          return query.group(grp);
        });
      }
      return query;
    };
    DataUtil2.getPredicate = function(pred) {
      var mainPred = [];
      for (var i = 0; i < pred.length; i++) {
        var e = pred[i];
        if (e.field) {
          mainPred.push(new Predicate(e.field, e.operator, e.value, e.ignoreCase, e.ignoreAccent));
        } else {
          var childPred = [];
          var cpre = this.getPredicate(e.predicates);
          for (var _i = 0, _a = Object.keys(cpre); _i < _a.length; _i++) {
            var prop = _a[_i];
            childPred.push(cpre[prop]);
          }
          mainPred.push(e.condition === "or" ? Predicate.or(childPred) : Predicate.and(childPred));
        }
      }
      return mainPred;
    };
    DataUtil2.serverTimezoneOffset = null;
    DataUtil2.timeZoneHandling = true;
    DataUtil2.throwError = function(error) {
      try {
        throw new Error(error);
      } catch (e) {
        throw e.message + "\n" + e.stack;
      }
    };
    DataUtil2.aggregates = {
      /**
       * Calculate sum of the given field in the data.
       *
       * @param  {Object[]} ds
       * @param  {string} field
       */
      sum: function(ds, field) {
        var result = 0;
        var val;
        var castRequired = typeof DataUtil2.getVal(ds, 0, field) !== "number";
        for (var i = 0; i < ds.length; i++) {
          val = DataUtil2.getVal(ds, i, field);
          if (!isNaN(val) && val !== null) {
            if (castRequired) {
              val = +val;
            }
            result += val;
          }
        }
        return result;
      },
      /**
       * Calculate average value of the given field in the data.
       *
       * @param  {Object[]} ds
       * @param  {string} field
       */
      average: function(ds, field) {
        return DataUtil2.aggregates.sum(ds, field) / ds.length;
      },
      /**
       * Returns the min value of the data based on the field.
       *
       * @param  {Object[]} ds
       * @param  {string|Function} field
       */
      min: function(ds, field) {
        var comparer;
        if (typeof field === "function") {
          comparer = field;
          field = null;
        }
        return DataUtil2.getObject(field, DataUtil2.getItemFromComparer(ds, field, comparer || DataUtil2.fnAscending));
      },
      /**
       * Returns the max value of the data based on the field.
       *
       * @param  {Object[]} ds
       * @param  {string} field
       * @returns number
       */
      max: function(ds, field) {
        var comparer;
        if (typeof field === "function") {
          comparer = field;
          field = null;
        }
        return DataUtil2.getObject(field, DataUtil2.getItemFromComparer(ds, field, comparer || DataUtil2.fnDescending));
      },
      /**
       * Returns the total number of true value present in the data based on the given boolean field name.
       *
       * @param  {Object[]} ds
       * @param  {string} field
       */
      truecount: function(ds, field) {
        return new DataManager(ds).executeLocal(new Query().where(field, "equal", true, true)).length;
      },
      /**
       * Returns the total number of false value present in the data based on the given boolean field name.
       *
       * @param  {Object[]} ds
       * @param  {string} field
       */
      falsecount: function(ds, field) {
        return new DataManager(ds).executeLocal(new Query().where(field, "equal", false, true)).length;
      },
      /**
       * Returns the length of the given data.
       *
       * @param {Object[]} ds
       * @param {string} field?
       * @param field
       * @returns number
       */
      count: function(ds, field) {
        return ds.length;
      }
    };
    DataUtil2.operatorSymbols = {
      "<": "lessthan",
      ">": "greaterthan",
      "<=": "lessthanorequal",
      ">=": "greaterthanorequal",
      "==": "equal",
      "!=": "notequal",
      "*=": "contains",
      "$=": "endswith",
      "^=": "startswith"
    };
    DataUtil2.odBiOperator = {
      "<": " lt ",
      ">": " gt ",
      "<=": " le ",
      ">=": " ge ",
      "==": " eq ",
      "!=": " ne ",
      "lessthan": " lt ",
      "lessthanorequal": " le ",
      "greaterthan": " gt ",
      "greaterthanorequal": " ge ",
      "equal": " eq ",
      "notequal": " ne "
    };
    DataUtil2.odUniOperator = {
      "$=": "endswith",
      "^=": "startswith",
      "*=": "substringof",
      "endswith": "endswith",
      "startswith": "startswith",
      "contains": "substringof",
      "doesnotendwith": "not endswith",
      "doesnotstartwith": "not startswith",
      "doesnotcontain": "not substringof",
      "wildcard": "wildcard",
      "like": "like"
    };
    DataUtil2.odv4UniOperator = {
      "$=": "endswith",
      "^=": "startswith",
      "*=": "contains",
      "endswith": "endswith",
      "startswith": "startswith",
      "contains": "contains",
      "doesnotendwith": "not endswith",
      "doesnotstartwith": "not startswith",
      "doesnotcontain": "not contains",
      "wildcard": "wildcard",
      "like": "like"
    };
    DataUtil2.diacritics = {
      "Ⓐ": "A",
      "Ａ": "A",
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ầ": "A",
      "Ấ": "A",
      "Ẫ": "A",
      "Ẩ": "A",
      "Ã": "A",
      "Ā": "A",
      "Ă": "A",
      "Ằ": "A",
      "Ắ": "A",
      "Ẵ": "A",
      "Ẳ": "A",
      "Ȧ": "A",
      "Ǡ": "A",
      "Ä": "A",
      "Ǟ": "A",
      "Ả": "A",
      "Å": "A",
      "Ǻ": "A",
      "Ǎ": "A",
      "Ȁ": "A",
      "Ȃ": "A",
      "Ạ": "A",
      "Ậ": "A",
      "Ặ": "A",
      "Ḁ": "A",
      "Ą": "A",
      "Ⱥ": "A",
      "Ɐ": "A",
      "Ꜳ": "AA",
      "Æ": "AE",
      "Ǽ": "AE",
      "Ǣ": "AE",
      "Ꜵ": "AO",
      "Ꜷ": "AU",
      "Ꜹ": "AV",
      "Ꜻ": "AV",
      "Ꜽ": "AY",
      "Ⓑ": "B",
      "Ｂ": "B",
      "Ḃ": "B",
      "Ḅ": "B",
      "Ḇ": "B",
      "Ƀ": "B",
      "Ƃ": "B",
      "Ɓ": "B",
      "Ⓒ": "C",
      "Ｃ": "C",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "Ç": "C",
      "Ḉ": "C",
      "Ƈ": "C",
      "Ȼ": "C",
      "Ꜿ": "C",
      "Ⓓ": "D",
      "Ｄ": "D",
      "Ḋ": "D",
      "Ď": "D",
      "Ḍ": "D",
      "Ḑ": "D",
      "Ḓ": "D",
      "Ḏ": "D",
      "Đ": "D",
      "Ƌ": "D",
      "Ɗ": "D",
      "Ɖ": "D",
      "Ꝺ": "D",
      "Ǳ": "DZ",
      "Ǆ": "DZ",
      "ǲ": "Dz",
      "ǅ": "Dz",
      "Ⓔ": "E",
      "Ｅ": "E",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ề": "E",
      "Ế": "E",
      "Ễ": "E",
      "Ể": "E",
      "Ẽ": "E",
      "Ē": "E",
      "Ḕ": "E",
      "Ḗ": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ë": "E",
      "Ẻ": "E",
      "Ě": "E",
      "Ȅ": "E",
      "Ȇ": "E",
      "Ẹ": "E",
      "Ệ": "E",
      "Ȩ": "E",
      "Ḝ": "E",
      "Ę": "E",
      "Ḙ": "E",
      "Ḛ": "E",
      "Ɛ": "E",
      "Ǝ": "E",
      "Ⓕ": "F",
      "Ｆ": "F",
      "Ḟ": "F",
      "Ƒ": "F",
      "Ꝼ": "F",
      "Ⓖ": "G",
      "Ｇ": "G",
      "Ǵ": "G",
      "Ĝ": "G",
      "Ḡ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ǧ": "G",
      "Ģ": "G",
      "Ǥ": "G",
      "Ɠ": "G",
      "Ꞡ": "G",
      "Ᵹ": "G",
      "Ꝿ": "G",
      "Ⓗ": "H",
      "Ｈ": "H",
      "Ĥ": "H",
      "Ḣ": "H",
      "Ḧ": "H",
      "Ȟ": "H",
      "Ḥ": "H",
      "Ḩ": "H",
      "Ḫ": "H",
      "Ħ": "H",
      "Ⱨ": "H",
      "Ⱶ": "H",
      "Ɥ": "H",
      "Ⓘ": "I",
      "Ｉ": "I",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "İ": "I",
      "Ï": "I",
      "Ḯ": "I",
      "Ỉ": "I",
      "Ǐ": "I",
      "Ȉ": "I",
      "Ȋ": "I",
      "Ị": "I",
      "Į": "I",
      "Ḭ": "I",
      "Ɨ": "I",
      "Ⓙ": "J",
      "Ｊ": "J",
      "Ĵ": "J",
      "Ɉ": "J",
      "Ⓚ": "K",
      "Ｋ": "K",
      "Ḱ": "K",
      "Ǩ": "K",
      "Ḳ": "K",
      "Ķ": "K",
      "Ḵ": "K",
      "Ƙ": "K",
      "Ⱪ": "K",
      "Ꝁ": "K",
      "Ꝃ": "K",
      "Ꝅ": "K",
      "Ꞣ": "K",
      "Ⓛ": "L",
      "Ｌ": "L",
      "Ŀ": "L",
      "Ĺ": "L",
      "Ľ": "L",
      "Ḷ": "L",
      "Ḹ": "L",
      "Ļ": "L",
      "Ḽ": "L",
      "Ḻ": "L",
      "Ł": "L",
      "Ƚ": "L",
      "Ɫ": "L",
      "Ⱡ": "L",
      "Ꝉ": "L",
      "Ꝇ": "L",
      "Ꞁ": "L",
      "Ǉ": "LJ",
      "ǈ": "Lj",
      "Ⓜ": "M",
      "Ｍ": "M",
      "Ḿ": "M",
      "Ṁ": "M",
      "Ṃ": "M",
      "Ɱ": "M",
      "Ɯ": "M",
      "Ⓝ": "N",
      "Ｎ": "N",
      "Ǹ": "N",
      "Ń": "N",
      "Ñ": "N",
      "Ṅ": "N",
      "Ň": "N",
      "Ṇ": "N",
      "Ņ": "N",
      "Ṋ": "N",
      "Ṉ": "N",
      "Ƞ": "N",
      "Ɲ": "N",
      "Ꞑ": "N",
      "Ꞥ": "N",
      "Ǌ": "NJ",
      "ǋ": "Nj",
      "Ⓞ": "O",
      "Ｏ": "O",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Ồ": "O",
      "Ố": "O",
      "Ỗ": "O",
      "Ổ": "O",
      "Õ": "O",
      "Ṍ": "O",
      "Ȭ": "O",
      "Ṏ": "O",
      "Ō": "O",
      "Ṑ": "O",
      "Ṓ": "O",
      "Ŏ": "O",
      "Ȯ": "O",
      "Ȱ": "O",
      "Ö": "O",
      "Ȫ": "O",
      "Ỏ": "O",
      "Ő": "O",
      "Ǒ": "O",
      "Ȍ": "O",
      "Ȏ": "O",
      "Ơ": "O",
      "Ờ": "O",
      "Ớ": "O",
      "Ỡ": "O",
      "Ở": "O",
      "Ợ": "O",
      "Ọ": "O",
      "Ộ": "O",
      "Ǫ": "O",
      "Ǭ": "O",
      "Ø": "O",
      "Ǿ": "O",
      "Ɔ": "O",
      "Ɵ": "O",
      "Ꝋ": "O",
      "Ꝍ": "O",
      "Ƣ": "OI",
      "Ꝏ": "OO",
      "Ȣ": "OU",
      "Ⓟ": "P",
      "Ｐ": "P",
      "Ṕ": "P",
      "Ṗ": "P",
      "Ƥ": "P",
      "Ᵽ": "P",
      "Ꝑ": "P",
      "Ꝓ": "P",
      "Ꝕ": "P",
      "Ⓠ": "Q",
      "Ｑ": "Q",
      "Ꝗ": "Q",
      "Ꝙ": "Q",
      "Ɋ": "Q",
      "Ⓡ": "R",
      "Ｒ": "R",
      "Ŕ": "R",
      "Ṙ": "R",
      "Ř": "R",
      "Ȑ": "R",
      "Ȓ": "R",
      "Ṛ": "R",
      "Ṝ": "R",
      "Ŗ": "R",
      "Ṟ": "R",
      "Ɍ": "R",
      "Ɽ": "R",
      "Ꝛ": "R",
      "Ꞧ": "R",
      "Ꞃ": "R",
      "Ⓢ": "S",
      "Ｓ": "S",
      "ẞ": "S",
      "Ś": "S",
      "Ṥ": "S",
      "Ŝ": "S",
      "Ṡ": "S",
      "Š": "S",
      "Ṧ": "S",
      "Ṣ": "S",
      "Ṩ": "S",
      "Ș": "S",
      "Ş": "S",
      "Ȿ": "S",
      "Ꞩ": "S",
      "Ꞅ": "S",
      "Ⓣ": "T",
      "Ｔ": "T",
      "Ṫ": "T",
      "Ť": "T",
      "Ṭ": "T",
      "Ț": "T",
      "Ţ": "T",
      "Ṱ": "T",
      "Ṯ": "T",
      "Ŧ": "T",
      "Ƭ": "T",
      "Ʈ": "T",
      "Ⱦ": "T",
      "Ꞇ": "T",
      "Ꜩ": "TZ",
      "Ⓤ": "U",
      "Ｕ": "U",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ũ": "U",
      "Ṹ": "U",
      "Ū": "U",
      "Ṻ": "U",
      "Ŭ": "U",
      "Ü": "U",
      "Ǜ": "U",
      "Ǘ": "U",
      "Ǖ": "U",
      "Ǚ": "U",
      "Ủ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ǔ": "U",
      "Ȕ": "U",
      "Ȗ": "U",
      "Ư": "U",
      "Ừ": "U",
      "Ứ": "U",
      "Ữ": "U",
      "Ử": "U",
      "Ự": "U",
      "Ụ": "U",
      "Ṳ": "U",
      "Ų": "U",
      "Ṷ": "U",
      "Ṵ": "U",
      "Ʉ": "U",
      "Ⓥ": "V",
      "Ｖ": "V",
      "Ṽ": "V",
      "Ṿ": "V",
      "Ʋ": "V",
      "Ꝟ": "V",
      "Ʌ": "V",
      "Ꝡ": "VY",
      "Ⓦ": "W",
      "Ｗ": "W",
      "Ẁ": "W",
      "Ẃ": "W",
      "Ŵ": "W",
      "Ẇ": "W",
      "Ẅ": "W",
      "Ẉ": "W",
      "Ⱳ": "W",
      "Ⓧ": "X",
      "Ｘ": "X",
      "Ẋ": "X",
      "Ẍ": "X",
      "Ⓨ": "Y",
      "Ｙ": "Y",
      "Ỳ": "Y",
      "Ý": "Y",
      "Ŷ": "Y",
      "Ỹ": "Y",
      "Ȳ": "Y",
      "Ẏ": "Y",
      "Ÿ": "Y",
      "Ỷ": "Y",
      "Ỵ": "Y",
      "Ƴ": "Y",
      "Ɏ": "Y",
      "Ỿ": "Y",
      "Ⓩ": "Z",
      "Ｚ": "Z",
      "Ź": "Z",
      "Ẑ": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "Ẓ": "Z",
      "Ẕ": "Z",
      "Ƶ": "Z",
      "Ȥ": "Z",
      "Ɀ": "Z",
      "Ⱬ": "Z",
      "Ꝣ": "Z",
      "ⓐ": "a",
      "ａ": "a",
      "ẚ": "a",
      "à": "a",
      "á": "a",
      "â": "a",
      "ầ": "a",
      "ấ": "a",
      "ẫ": "a",
      "ẩ": "a",
      "ã": "a",
      "ā": "a",
      "ă": "a",
      "ằ": "a",
      "ắ": "a",
      "ẵ": "a",
      "ẳ": "a",
      "ȧ": "a",
      "ǡ": "a",
      "ä": "a",
      "ǟ": "a",
      "ả": "a",
      "å": "a",
      "ǻ": "a",
      "ǎ": "a",
      "ȁ": "a",
      "ȃ": "a",
      "ạ": "a",
      "ậ": "a",
      "ặ": "a",
      "ḁ": "a",
      "ą": "a",
      "ⱥ": "a",
      "ɐ": "a",
      "ꜳ": "aa",
      "æ": "ae",
      "ǽ": "ae",
      "ǣ": "ae",
      "ꜵ": "ao",
      "ꜷ": "au",
      "ꜹ": "av",
      "ꜻ": "av",
      "ꜽ": "ay",
      "ⓑ": "b",
      "ｂ": "b",
      "ḃ": "b",
      "ḅ": "b",
      "ḇ": "b",
      "ƀ": "b",
      "ƃ": "b",
      "ɓ": "b",
      "ⓒ": "c",
      "ｃ": "c",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "ç": "c",
      "ḉ": "c",
      "ƈ": "c",
      "ȼ": "c",
      "ꜿ": "c",
      "ↄ": "c",
      "ⓓ": "d",
      "ｄ": "d",
      "ḋ": "d",
      "ď": "d",
      "ḍ": "d",
      "ḑ": "d",
      "ḓ": "d",
      "ḏ": "d",
      "đ": "d",
      "ƌ": "d",
      "ɖ": "d",
      "ɗ": "d",
      "ꝺ": "d",
      "ǳ": "dz",
      "ǆ": "dz",
      "ⓔ": "e",
      "ｅ": "e",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ề": "e",
      "ế": "e",
      "ễ": "e",
      "ể": "e",
      "ẽ": "e",
      "ē": "e",
      "ḕ": "e",
      "ḗ": "e",
      "ĕ": "e",
      "ė": "e",
      "ë": "e",
      "ẻ": "e",
      "ě": "e",
      "ȅ": "e",
      "ȇ": "e",
      "ẹ": "e",
      "ệ": "e",
      "ȩ": "e",
      "ḝ": "e",
      "ę": "e",
      "ḙ": "e",
      "ḛ": "e",
      "ɇ": "e",
      "ɛ": "e",
      "ǝ": "e",
      "ⓕ": "f",
      "ｆ": "f",
      "ḟ": "f",
      "ƒ": "f",
      "ꝼ": "f",
      "ⓖ": "g",
      "ｇ": "g",
      "ǵ": "g",
      "ĝ": "g",
      "ḡ": "g",
      "ğ": "g",
      "ġ": "g",
      "ǧ": "g",
      "ģ": "g",
      "ǥ": "g",
      "ɠ": "g",
      "ꞡ": "g",
      "ᵹ": "g",
      "ꝿ": "g",
      "ⓗ": "h",
      "ｈ": "h",
      "ĥ": "h",
      "ḣ": "h",
      "ḧ": "h",
      "ȟ": "h",
      "ḥ": "h",
      "ḩ": "h",
      "ḫ": "h",
      "ẖ": "h",
      "ħ": "h",
      "ⱨ": "h",
      "ⱶ": "h",
      "ɥ": "h",
      "ƕ": "hv",
      "ⓘ": "i",
      "ｉ": "i",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "ï": "i",
      "ḯ": "i",
      "ỉ": "i",
      "ǐ": "i",
      "ȉ": "i",
      "ȋ": "i",
      "ị": "i",
      "į": "i",
      "ḭ": "i",
      "ɨ": "i",
      "ı": "i",
      "ⓙ": "j",
      "ｊ": "j",
      "ĵ": "j",
      "ǰ": "j",
      "ɉ": "j",
      "ⓚ": "k",
      "ｋ": "k",
      "ḱ": "k",
      "ǩ": "k",
      "ḳ": "k",
      "ķ": "k",
      "ḵ": "k",
      "ƙ": "k",
      "ⱪ": "k",
      "ꝁ": "k",
      "ꝃ": "k",
      "ꝅ": "k",
      "ꞣ": "k",
      "ⓛ": "l",
      "ｌ": "l",
      "ŀ": "l",
      "ĺ": "l",
      "ľ": "l",
      "ḷ": "l",
      "ḹ": "l",
      "ļ": "l",
      "ḽ": "l",
      "ḻ": "l",
      "ſ": "l",
      "ł": "l",
      "ƚ": "l",
      "ɫ": "l",
      "ⱡ": "l",
      "ꝉ": "l",
      "ꞁ": "l",
      "ꝇ": "l",
      "ǉ": "lj",
      "ⓜ": "m",
      "ｍ": "m",
      "ḿ": "m",
      "ṁ": "m",
      "ṃ": "m",
      "ɱ": "m",
      "ɯ": "m",
      "ⓝ": "n",
      "ｎ": "n",
      "ǹ": "n",
      "ń": "n",
      "ñ": "n",
      "ṅ": "n",
      "ň": "n",
      "ṇ": "n",
      "ņ": "n",
      "ṋ": "n",
      "ṉ": "n",
      "ƞ": "n",
      "ɲ": "n",
      "ŉ": "n",
      "ꞑ": "n",
      "ꞥ": "n",
      "ǌ": "nj",
      "ⓞ": "o",
      "ｏ": "o",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "ồ": "o",
      "ố": "o",
      "ỗ": "o",
      "ổ": "o",
      "õ": "o",
      "ṍ": "o",
      "ȭ": "o",
      "ṏ": "o",
      "ō": "o",
      "ṑ": "o",
      "ṓ": "o",
      "ŏ": "o",
      "ȯ": "o",
      "ȱ": "o",
      "ö": "o",
      "ȫ": "o",
      "ỏ": "o",
      "ő": "o",
      "ǒ": "o",
      "ȍ": "o",
      "ȏ": "o",
      "ơ": "o",
      "ờ": "o",
      "ớ": "o",
      "ỡ": "o",
      "ở": "o",
      "ợ": "o",
      "ọ": "o",
      "ộ": "o",
      "ǫ": "o",
      "ǭ": "o",
      "ø": "o",
      "ǿ": "o",
      "ɔ": "o",
      "ꝋ": "o",
      "ꝍ": "o",
      "ɵ": "o",
      "ƣ": "oi",
      "ȣ": "ou",
      "ꝏ": "oo",
      "ⓟ": "p",
      "ｐ": "p",
      "ṕ": "p",
      "ṗ": "p",
      "ƥ": "p",
      "ᵽ": "p",
      "ꝑ": "p",
      "ꝓ": "p",
      "ꝕ": "p",
      "ⓠ": "q",
      "ｑ": "q",
      "ɋ": "q",
      "ꝗ": "q",
      "ꝙ": "q",
      "ⓡ": "r",
      "ｒ": "r",
      "ŕ": "r",
      "ṙ": "r",
      "ř": "r",
      "ȑ": "r",
      "ȓ": "r",
      "ṛ": "r",
      "ṝ": "r",
      "ŗ": "r",
      "ṟ": "r",
      "ɍ": "r",
      "ɽ": "r",
      "ꝛ": "r",
      "ꞧ": "r",
      "ꞃ": "r",
      "ⓢ": "s",
      "ｓ": "s",
      "ß": "s",
      "ś": "s",
      "ṥ": "s",
      "ŝ": "s",
      "ṡ": "s",
      "š": "s",
      "ṧ": "s",
      "ṣ": "s",
      "ṩ": "s",
      "ș": "s",
      "ş": "s",
      "ȿ": "s",
      "ꞩ": "s",
      "ꞅ": "s",
      "ẛ": "s",
      "ⓣ": "t",
      "ｔ": "t",
      "ṫ": "t",
      "ẗ": "t",
      "ť": "t",
      "ṭ": "t",
      "ț": "t",
      "ţ": "t",
      "ṱ": "t",
      "ṯ": "t",
      "ŧ": "t",
      "ƭ": "t",
      "ʈ": "t",
      "ⱦ": "t",
      "ꞇ": "t",
      "ꜩ": "tz",
      "ⓤ": "u",
      "ｕ": "u",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ũ": "u",
      "ṹ": "u",
      "ū": "u",
      "ṻ": "u",
      "ŭ": "u",
      "ü": "u",
      "ǜ": "u",
      "ǘ": "u",
      "ǖ": "u",
      "ǚ": "u",
      "ủ": "u",
      "ů": "u",
      "ű": "u",
      "ǔ": "u",
      "ȕ": "u",
      "ȗ": "u",
      "ư": "u",
      "ừ": "u",
      "ứ": "u",
      "ữ": "u",
      "ử": "u",
      "ự": "u",
      "ụ": "u",
      "ṳ": "u",
      "ų": "u",
      "ṷ": "u",
      "ṵ": "u",
      "ʉ": "u",
      "ⓥ": "v",
      "ｖ": "v",
      "ṽ": "v",
      "ṿ": "v",
      "ʋ": "v",
      "ꝟ": "v",
      "ʌ": "v",
      "ꝡ": "vy",
      "ⓦ": "w",
      "ｗ": "w",
      "ẁ": "w",
      "ẃ": "w",
      "ŵ": "w",
      "ẇ": "w",
      "ẅ": "w",
      "ẘ": "w",
      "ẉ": "w",
      "ⱳ": "w",
      "ⓧ": "x",
      "ｘ": "x",
      "ẋ": "x",
      "ẍ": "x",
      "ⓨ": "y",
      "ｙ": "y",
      "ỳ": "y",
      "ý": "y",
      "ŷ": "y",
      "ỹ": "y",
      "ȳ": "y",
      "ẏ": "y",
      "ÿ": "y",
      "ỷ": "y",
      "ẙ": "y",
      "ỵ": "y",
      "ƴ": "y",
      "ɏ": "y",
      "ỿ": "y",
      "ⓩ": "z",
      "ｚ": "z",
      "ź": "z",
      "ẑ": "z",
      "ż": "z",
      "ž": "z",
      "ẓ": "z",
      "ẕ": "z",
      "ƶ": "z",
      "ȥ": "z",
      "ɀ": "z",
      "ⱬ": "z",
      "ꝣ": "z",
      "Ά": "Α",
      "Έ": "Ε",
      "Ή": "Η",
      "Ί": "Ι",
      "Ϊ": "Ι",
      "Ό": "Ο",
      "Ύ": "Υ",
      "Ϋ": "Υ",
      "Ώ": "Ω",
      "ά": "α",
      "έ": "ε",
      "ή": "η",
      "ί": "ι",
      "ϊ": "ι",
      "ΐ": "ι",
      "ό": "ο",
      "ύ": "υ",
      "ϋ": "υ",
      "ΰ": "υ",
      "ω": "ω",
      "ς": "σ"
    };
    DataUtil2.fnOperators = {
      /**
       * Returns true when the actual input is equal to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param {boolean} ignoreAccent?
       * @param ignoreCase
       * @param ignoreAccent
       */
      equal: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return DataUtil2.toLowerCase(actual) === DataUtil2.toLowerCase(expected);
        }
        return actual === expected;
      },
      /**
       * Returns true when the actual input is not equal to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       * @param ignoreAccent
       */
      notequal: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        return !DataUtil2.fnOperators.equal(actual, expected, ignoreCase);
      },
      /**
       * Returns true when the actual input is less than to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       */
      lessthan: function(actual, expected, ignoreCase) {
        if (ignoreCase) {
          return DataUtil2.toLowerCase(actual) < DataUtil2.toLowerCase(expected);
        }
        if (isNullOrUndefined(actual)) {
          actual = void 0;
        }
        return actual < expected;
      },
      /**
       * Returns true when the actual input is greater than to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       */
      greaterthan: function(actual, expected, ignoreCase) {
        if (ignoreCase) {
          return DataUtil2.toLowerCase(actual) > DataUtil2.toLowerCase(expected);
        }
        return actual > expected;
      },
      /**
       * Returns true when the actual input is less than or equal to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       */
      lessthanorequal: function(actual, expected, ignoreCase) {
        if (ignoreCase) {
          return DataUtil2.toLowerCase(actual) <= DataUtil2.toLowerCase(expected);
        }
        if (isNullOrUndefined(actual)) {
          actual = void 0;
        }
        return actual <= expected;
      },
      /**
       * Returns true when the actual input is greater than or equal to the given input.
       *
       * @param {string|number|boolean} actual
       * @param {string|number|boolean} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       */
      greaterthanorequal: function(actual, expected, ignoreCase) {
        if (ignoreCase) {
          return DataUtil2.toLowerCase(actual) >= DataUtil2.toLowerCase(expected);
        }
        return actual >= expected;
      },
      /**
       * Returns true when the actual input contains the given string.
       *
       * @param {string|number} actual
       * @param {string|number} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       * @param ignoreAccent
       */
      contains: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) && DataUtil2.toLowerCase(actual).indexOf(DataUtil2.toLowerCase(expected)) !== -1;
        }
        return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) && actual.toString().indexOf(expected) !== -1;
      },
      /**
       * Returns true when the actual input not contains the given string.
       *
       * @param  {string|number} actual
       * @param  {string|number} expected
       * @param  {boolean} ignoreCase?
       */
      doesnotcontain: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) && DataUtil2.toLowerCase(actual).indexOf(DataUtil2.toLowerCase(expected)) === -1;
        }
        return !isNullOrUndefined(actual) && !isNullOrUndefined(expected) && actual.toString().indexOf(expected) === -1;
      },
      /**
       * Returns true when the given input value is not null.
       *
       * @param  {string|number} actual
       * @returns boolean
       */
      isnotnull: function(actual) {
        return actual !== null && actual !== void 0;
      },
      /**
       * Returns true when the given input value is null.
       *
       * @param  {string|number} actual
       * @returns boolean
       */
      isnull: function(actual) {
        return actual === null || actual === void 0;
      },
      /**
       * Returns true when the actual input starts with the given string
       *
       * @param {string} actual
       * @param {string} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       * @param ignoreAccent
       */
      startswith: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return actual && expected && DataUtil2.startsWith(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return actual && expected && DataUtil2.startsWith(actual, expected);
      },
      /**
       * Returns true when the actual input not starts with the given string
       *
       * @param  {string} actual
       * @param  {string} expected
       * @param  {boolean} ignoreCase?
       */
      doesnotstartwith: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return actual && expected && DataUtil2.notStartsWith(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return actual && expected && DataUtil2.notStartsWith(actual, expected);
      },
      /**
       * Returns true when the actual input like with the given string.
       *
       * @param  {string} actual
       * @param  {string} expected
       * @param  {boolean} ignoreCase?
       */
      like: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return actual && expected && DataUtil2.like(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return actual && expected && DataUtil2.like(actual, expected);
      },
      /**
       * Returns true when the given input value is empty.
       *
       * @param  {string|number} actual
       * @returns boolean
       */
      isempty: function(actual) {
        return actual === void 0 || actual === "";
      },
      /**
       * Returns true when the given input value is not empty.
       *
       * @param  {string|number} actual
       * @returns boolean
       */
      isnotempty: function(actual) {
        return actual !== void 0 && actual !== "";
      },
      /**
       * Returns true when the actual input pattern(wildcard) matches with the given string.
       *
       * @param  {string|Date} actual
       * @param  {string} expected
       * @param  {boolean} ignoreCase?
       */
      wildcard: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return (actual || typeof actual === "boolean") && expected && typeof actual !== "object" && DataUtil2.wildCard(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return (actual || typeof actual === "boolean") && expected && DataUtil2.wildCard(actual, expected);
      },
      /**
       * Returns true when the actual input ends with the given string.
       *
       * @param {string} actual
       * @param {string} expected
       * @param {boolean} ignoreCase?
       * @param ignoreCase
       * @param ignoreAccent
       */
      endswith: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return actual && expected && DataUtil2.endsWith(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return actual && expected && DataUtil2.endsWith(actual, expected);
      },
      /**
       * Returns true when the actual input not ends with the given string.
       *
       * @param  {string} actual
       * @param  {string} expected
       * @param  {boolean} ignoreCase?
       */
      doesnotendwith: function(actual, expected, ignoreCase, ignoreAccent) {
        if (ignoreAccent) {
          actual = DataUtil2.ignoreDiacritics(actual);
          expected = DataUtil2.ignoreDiacritics(expected);
        }
        if (ignoreCase) {
          return actual && expected && DataUtil2.notEndsWith(DataUtil2.toLowerCase(actual), DataUtil2.toLowerCase(expected));
        }
        return actual && expected && DataUtil2.notEndsWith(actual, expected);
      },
      /**
       * It will return the filter operator based on the filter symbol.
       *
       * @param  {string} operator
       * @hidden
       */
      processSymbols: function(operator) {
        var fnName = DataUtil2.operatorSymbols[operator];
        if (fnName) {
          var fn = DataUtil2.fnOperators[fnName];
          return fn;
        }
        return DataUtil2.throwError("Query - Process Operator : Invalid operator");
      },
      /**
       * It will return the valid filter operator based on the specified operators.
       *
       * @param  {string} operator
       * @hidden
       */
      processOperator: function(operator) {
        var fn = DataUtil2.fnOperators[operator];
        if (fn) {
          return fn;
        }
        return DataUtil2.fnOperators.processSymbols(operator);
      }
    };
    DataUtil2.parse = {
      /**
       * Parse the given string to the plain JavaScript object.
       *
       * @param  {string|Object|Object[]} jsonText
       */
      parseJson: function(jsonText) {
        if (typeof jsonText === "string" && (/^[\s]*\[|^[\s]*\{(.)+:/g.test(jsonText) || jsonText.indexOf('"') === -1)) {
          jsonText = JSON.parse(jsonText, DataUtil2.parse.jsonReviver);
        } else if (jsonText instanceof Array) {
          DataUtil2.parse.iterateAndReviveArray(jsonText);
        } else if (typeof jsonText === "object" && jsonText !== null) {
          DataUtil2.parse.iterateAndReviveJson(jsonText);
        }
        return jsonText;
      },
      /**
       * It will perform on array of values.
       *
       * @param  {string[]|Object[]} array
       * @hidden
       */
      iterateAndReviveArray: function(array) {
        for (var i = 0; i < array.length; i++) {
          if (typeof array[i] === "object" && array[i] !== null) {
            DataUtil2.parse.iterateAndReviveJson(array[i]);
          } else if (typeof array[i] === "string" && (!/^[\s]*\[|^[\s]*\{(.)+:|\"/g.test(array[i]) || array[i].toString().indexOf('"') === -1)) {
            array[i] = DataUtil2.parse.jsonReviver("", array[i]);
          } else {
            array[i] = DataUtil2.parse.parseJson(array[i]);
          }
        }
      },
      /**
       * It will perform on JSON values
       *
       * @param  {JSON} json
       * @hidden
       */
      iterateAndReviveJson: function(json) {
        var value;
        var keys = Object.keys(json);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
          var prop = keys_2[_i];
          if (DataUtil2.startsWith(prop, "__")) {
            continue;
          }
          value = json[prop];
          if (typeof value === "object") {
            if (value instanceof Array) {
              DataUtil2.parse.iterateAndReviveArray(value);
            } else if (value) {
              DataUtil2.parse.iterateAndReviveJson(value);
            }
          } else {
            json[prop] = DataUtil2.parse.jsonReviver(json[prop], value);
          }
        }
      },
      /**
       * It will perform on JSON values
       *
       * @param  {string} field
       * @param  {string|Date} value
       * @hidden
       */
      jsonReviver: function(field, value) {
        if (typeof value === "string") {
          var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
          var offSet = DataUtil2.timeZoneHandling ? DataUtil2.serverTimezoneOffset : null;
          if (ms) {
            return DataUtil2.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), offSet, true);
          } else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
            var isUTC = value.indexOf("Z") > -1 || value.indexOf("z") > -1;
            var arr = value.split(/[^0-9.]/);
            if (isUTC) {
              if (arr[5].indexOf(".") > -1) {
                var secondsMs = arr[5].split(".");
                arr[5] = secondsMs[0];
                arr[6] = new Date(value).getUTCMilliseconds().toString();
              } else {
                arr[6] = "00";
              }
              value = DataUtil2.dateParse.toTimeZone(new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5] ? arr[5] : "00", 10), parseInt(arr[6], 10)), DataUtil2.serverTimezoneOffset, false);
            } else {
              var utcFormat = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5] ? arr[5] : "00", 10));
              var hrs = parseInt(arr[6], 10);
              var mins = parseInt(arr[7], 10);
              if (isNaN(hrs) && isNaN(mins)) {
                return utcFormat;
              }
              if (value.indexOf("+") > -1) {
                utcFormat.setHours(utcFormat.getHours() - hrs, utcFormat.getMinutes() - mins);
              } else {
                utcFormat.setHours(utcFormat.getHours() + hrs, utcFormat.getMinutes() + mins);
              }
              value = DataUtil2.dateParse.toTimeZone(utcFormat, DataUtil2.serverTimezoneOffset, false);
            }
            if (DataUtil2.serverTimezoneOffset == null) {
              value = DataUtil2.dateParse.addSelfOffset(value);
            }
          } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            var arr = value.split(/[^0-9.]/);
            return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
          }
        }
        return value;
      },
      /**
       * Check wheather the given value is JSON or not.
       *
       * @param  {Object[]} jsonData
       */
      isJson: function(jsonData) {
        if (typeof jsonData[0] === "string") {
          return jsonData;
        }
        return DataUtil2.parse.parseJson(jsonData);
      },
      /**
       * Checks wheather the given value is GUID or not.
       *
       * @param  {string} value
       */
      isGuid: function(value) {
        var regex = /[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/i;
        var match = regex.exec(value);
        return match != null;
      },
      /**
       * The method used to replace the value based on the type.
       *
       * @param  {Object} value
       * @param  {boolean} stringify
       * @hidden
       */
      replacer: function(value, stringify) {
        if (DataUtil2.isPlainObject(value)) {
          return DataUtil2.parse.jsonReplacer(value, stringify);
        }
        if (value instanceof Array) {
          return DataUtil2.parse.arrayReplacer(value);
        }
        if (value instanceof Date) {
          return DataUtil2.parse.jsonReplacer({ val: value }, stringify).val;
        }
        return value;
      },
      /**
       * It will replace the JSON value.
       *
       * @param {string} key
       * @param {Object} val
       * @param stringify
       * @hidden
       */
      jsonReplacer: function(val, stringify) {
        var value;
        var keys = Object.keys(val);
        for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
          var prop = keys_3[_i];
          value = val[prop];
          if (!(value instanceof Date)) {
            continue;
          }
          var d = value;
          if (DataUtil2.serverTimezoneOffset == null) {
            val[prop] = DataUtil2.dateParse.toTimeZone(d, null).toJSON();
          } else {
            d = new Date(+d + DataUtil2.serverTimezoneOffset * 36e5);
            val[prop] = DataUtil2.dateParse.toTimeZone(DataUtil2.dateParse.addSelfOffset(d), null).toJSON();
          }
        }
        return val;
      },
      /**
       * It will replace the Array of value.
       *
       * @param  {string} key
       * @param  {Object[]} val
       * @hidden
       */
      arrayReplacer: function(val) {
        for (var i = 0; i < val.length; i++) {
          if (DataUtil2.isPlainObject(val[i])) {
            val[i] = DataUtil2.parse.jsonReplacer(val[i]);
          } else if (val[i] instanceof Date) {
            val[i] = DataUtil2.parse.jsonReplacer({ date: val[i] }).date;
          }
        }
        return val;
      },
      /**
       * It will replace the Date object with respective to UTC format value.
       *
       * @param  {string} key
       * @param  {any} value
       * @hidden
       */
      /* eslint-disable @typescript-eslint/no-explicit-any */
      /* tslint:disable-next-line:no-any */
      jsonDateReplacer: function(key, value) {
        if (key === "value" && value) {
          if (typeof value === "string") {
            var ms = /^\/Date\(([+-]?[0-9]+)([+-][0-9]{4})?\)\/$/.exec(value);
            if (ms) {
              value = DataUtil2.dateParse.toTimeZone(new Date(parseInt(ms[1], 10)), null, true);
            } else if (/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
              var arr = value.split(/[^0-9]/);
              value = DataUtil2.dateParse.toTimeZone(new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), parseInt(arr[4], 10), parseInt(arr[5], 10)), null, true);
            }
          }
          if (value instanceof Date) {
            value = DataUtil2.dateParse.addSelfOffset(value);
            if (DataUtil2.serverTimezoneOffset === null) {
              return DataUtil2.dateParse.toTimeZone(DataUtil2.dateParse.addSelfOffset(value), null).toJSON();
            } else {
              value = DataUtil2.dateParse.toTimeZone(value, value.getTimezoneOffset() / 60 - DataUtil2.serverTimezoneOffset, false);
              return value.toJSON();
            }
          }
        }
        return value;
      }
    };
    DataUtil2.dateParse = {
      addSelfOffset: function(input) {
        return new Date(+input - input.getTimezoneOffset() * 6e4);
      },
      toUTC: function(input) {
        return new Date(+input + input.getTimezoneOffset() * 6e4);
      },
      toTimeZone: function(input, offset, utc) {
        if (offset === null) {
          return input;
        }
        var unix = utc ? DataUtil2.dateParse.toUTC(input) : input;
        return new Date(+unix - offset * 36e5);
      },
      toLocalTime: function(input) {
        var datefn = input;
        var timeZone = -datefn.getTimezoneOffset();
        var differenceString = timeZone >= 0 ? "+" : "-";
        var localtimefn = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? "0" : "") + norm;
        };
        var val = datefn.getFullYear() + "-" + localtimefn(datefn.getMonth() + 1) + "-" + localtimefn(datefn.getDate()) + "T" + localtimefn(datefn.getHours()) + ":" + localtimefn(datefn.getMinutes()) + ":" + localtimefn(datefn.getSeconds()) + differenceString + localtimefn(timeZone / 60) + ":" + localtimefn(timeZone % 60);
        return val;
      }
    };
    return DataUtil2;
  }()
);

// node_modules/@syncfusion/ej2-data/src/query.js
var Query = (
  /** @class */
  function() {
    function Query2(from) {
      this.subQuery = null;
      this.isChild = false;
      this.distincts = [];
      this.queries = [];
      this.key = "";
      this.fKey = "";
      if (typeof from === "string") {
        this.fromTable = from;
      } else if (from && from instanceof Array) {
        this.lookups = from;
      }
      this.expands = [];
      this.sortedColumns = [];
      this.groupedColumns = [];
      this.subQuery = null;
      this.isChild = false;
      this.params = [];
      this.lazyLoad = [];
      return this;
    }
    Query2.prototype.setKey = function(field) {
      this.key = field;
      return this;
    };
    Query2.prototype.using = function(dataManager) {
      this.dataManager = dataManager;
      return this;
    };
    Query2.prototype.execute = function(dataManager, done, fail, always) {
      dataManager = dataManager || this.dataManager;
      if (dataManager) {
        return dataManager.executeQuery(this, done, fail, always);
      }
      return DataUtil.throwError('Query - execute() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    Query2.prototype.executeLocal = function(dataManager) {
      dataManager = dataManager || this.dataManager;
      if (dataManager) {
        return dataManager.executeLocal(this);
      }
      return DataUtil.throwError('Query - executeLocal() : dataManager needs to be is set using "using" function or should be passed as argument');
    };
    Query2.prototype.clone = function() {
      var cloned = new Query2();
      cloned.queries = this.queries.slice(0);
      cloned.key = this.key;
      cloned.isChild = this.isChild;
      cloned.dataManager = this.dataManager;
      cloned.fromTable = this.fromTable;
      cloned.params = this.params.slice(0);
      cloned.expands = this.expands.slice(0);
      cloned.sortedColumns = this.sortedColumns.slice(0);
      cloned.groupedColumns = this.groupedColumns.slice(0);
      cloned.subQuerySelector = this.subQuerySelector;
      cloned.subQuery = this.subQuery;
      cloned.fKey = this.fKey;
      cloned.isCountRequired = this.isCountRequired;
      cloned.distincts = this.distincts.slice(0);
      cloned.lazyLoad = this.lazyLoad.slice(0);
      return cloned;
    };
    Query2.prototype.from = function(tableName) {
      this.fromTable = tableName;
      return this;
    };
    Query2.prototype.addParams = function(key, value) {
      if (typeof value === "function") {
        this.params.push({ key, fn: value });
      } else {
        this.params.push({ key, value });
      }
      return this;
    };
    Query2.prototype.distinct = function(fields) {
      if (typeof fields === "string") {
        this.distincts = [].slice.call([fields], 0);
      } else {
        this.distincts = fields.slice(0);
      }
      return this;
    };
    Query2.prototype.expand = function(tables) {
      if (typeof tables === "string") {
        this.expands = [].slice.call([tables], 0);
      } else {
        this.expands = tables.slice(0);
      }
      return this;
    };
    Query2.prototype.where = function(fieldName, operator, value, ignoreCase, ignoreAccent, matchCase) {
      operator = operator ? operator.toLowerCase() : null;
      var predicate = null;
      if (typeof fieldName === "string") {
        predicate = new Predicate(fieldName, operator, value, ignoreCase, ignoreAccent, matchCase);
      } else if (fieldName instanceof Predicate) {
        predicate = fieldName;
      }
      this.queries.push({
        fn: "onWhere",
        e: predicate
      });
      return this;
    };
    Query2.prototype.search = function(searchKey, fieldNames, operator, ignoreCase, ignoreAccent) {
      if (typeof fieldNames === "string") {
        fieldNames = [fieldNames];
      }
      if (!operator || operator === "none") {
        operator = "contains";
      }
      var comparer = DataUtil.fnOperators[operator];
      this.queries.push({
        fn: "onSearch",
        e: {
          fieldNames,
          operator,
          searchKey,
          ignoreCase,
          ignoreAccent,
          comparer
        }
      });
      return this;
    };
    Query2.prototype.sortBy = function(fieldName, comparer, isFromGroup) {
      return this.sortByForeignKey(fieldName, comparer, isFromGroup);
    };
    Query2.prototype.sortByForeignKey = function(fieldName, comparer, isFromGroup, direction) {
      var order = !isNullOrUndefined(direction) ? direction : "ascending";
      var sorts;
      var temp;
      if (typeof fieldName === "string" && DataUtil.endsWith(fieldName.toLowerCase(), " desc")) {
        fieldName = fieldName.replace(/ desc$/i, "");
        comparer = "descending";
      }
      if (!comparer || typeof comparer === "string") {
        order = comparer ? comparer.toLowerCase() : "ascending";
        comparer = DataUtil.fnSort(comparer);
      }
      if (isFromGroup) {
        sorts = Query2.filterQueries(this.queries, "onSortBy");
        for (var i = 0; i < sorts.length; i++) {
          temp = sorts[i].e.fieldName;
          if (typeof temp === "string") {
            if (temp === fieldName) {
              return this;
            }
          } else if (temp instanceof Array) {
            for (var j = 0; j < temp.length; j++) {
              if (temp[j] === fieldName || fieldName.toLowerCase() === temp[j] + " desc") {
                return this;
              }
            }
          }
        }
      }
      this.queries.push({
        fn: "onSortBy",
        e: {
          fieldName,
          comparer,
          direction: order
        }
      });
      return this;
    };
    Query2.prototype.sortByDesc = function(fieldName) {
      return this.sortBy(fieldName, "descending");
    };
    Query2.prototype.group = function(fieldName, fn, format) {
      this.sortBy(fieldName, null, true);
      this.queries.push({
        fn: "onGroup",
        e: {
          fieldName,
          comparer: fn ? fn : null,
          format: format ? format : null
        }
      });
      return this;
    };
    Query2.prototype.page = function(pageIndex, pageSize) {
      this.queries.push({
        fn: "onPage",
        e: {
          pageIndex,
          pageSize
        }
      });
      return this;
    };
    Query2.prototype.range = function(start, end) {
      this.queries.push({
        fn: "onRange",
        e: {
          start,
          end
        }
      });
      return this;
    };
    Query2.prototype.take = function(nos) {
      this.queries.push({
        fn: "onTake",
        e: {
          nos
        }
      });
      return this;
    };
    Query2.prototype.skip = function(nos) {
      this.queries.push({
        fn: "onSkip",
        e: { nos }
      });
      return this;
    };
    Query2.prototype.select = function(fieldNames) {
      if (typeof fieldNames === "string") {
        fieldNames = [].slice.call([fieldNames], 0);
      }
      this.queries.push({
        fn: "onSelect",
        e: { fieldNames }
      });
      return this;
    };
    Query2.prototype.hierarchy = function(query, selectorFn) {
      this.subQuerySelector = selectorFn;
      this.subQuery = query;
      return this;
    };
    Query2.prototype.foreignKey = function(key) {
      this.fKey = key;
      return this;
    };
    Query2.prototype.requiresCount = function() {
      this.isCountRequired = true;
      return this;
    };
    Query2.prototype.aggregate = function(type, field) {
      this.queries.push({
        fn: "onAggregates",
        e: { field, type }
      });
      return this;
    };
    Query2.filterQueries = function(queries, name) {
      return queries.filter(function(q) {
        return q.fn === name;
      });
    };
    Query2.filterQueryLists = function(queries, singles) {
      var filtered = queries.filter(function(q) {
        return singles.indexOf(q.fn) !== -1;
      });
      var res = {};
      for (var i = 0; i < filtered.length; i++) {
        if (!res[filtered[i].fn]) {
          res[filtered[i].fn] = filtered[i].e;
        }
      }
      return res;
    };
    return Query2;
  }()
);
var Predicate = (
  /** @class */
  function() {
    function Predicate2(field, operator, value, ignoreCase, ignoreAccent, matchCase) {
      if (ignoreCase === void 0) {
        ignoreCase = false;
      }
      this.ignoreAccent = false;
      this.isComplex = false;
      if (typeof field === "string") {
        this.field = field;
        this.operator = operator.toLowerCase();
        this.value = value;
        this.matchCase = matchCase;
        this.ignoreCase = ignoreCase;
        this.ignoreAccent = ignoreAccent;
        this.isComplex = false;
        this.comparer = DataUtil.fnOperators.processOperator(this.operator);
      } else if (field instanceof Predicate2 && value instanceof Predicate2 || value instanceof Array) {
        this.isComplex = true;
        this.condition = operator.toLowerCase();
        this.predicates = [field];
        this.matchCase = field.matchCase;
        this.ignoreCase = field.ignoreCase;
        this.ignoreAccent = field.ignoreAccent;
        if (value instanceof Array) {
          [].push.apply(this.predicates, value);
        } else {
          this.predicates.push(value);
        }
      }
      return this;
    }
    Predicate2.and = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return Predicate2.combinePredicates([].slice.call(args, 0), "and");
    };
    Predicate2.prototype.and = function(field, operator, value, ignoreCase, ignoreAccent) {
      return Predicate2.combine(this, field, operator, value, "and", ignoreCase, ignoreAccent);
    };
    Predicate2.or = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return Predicate2.combinePredicates([].slice.call(args, 0), "or");
    };
    Predicate2.prototype.or = function(field, operator, value, ignoreCase, ignoreAccent) {
      return Predicate2.combine(this, field, operator, value, "or", ignoreCase, ignoreAccent);
    };
    Predicate2.ornot = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return Predicate2.combinePredicates([].slice.call(args, 0), "or not");
    };
    Predicate2.prototype.ornot = function(field, operator, value, ignoreCase, ignoreAccent) {
      return Predicate2.combine(this, field, operator, value, "ornot", ignoreCase, ignoreAccent);
    };
    Predicate2.andnot = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return Predicate2.combinePredicates([].slice.call(args, 0), "and not");
    };
    Predicate2.prototype.andnot = function(field, operator, value, ignoreCase, ignoreAccent) {
      return Predicate2.combine(this, field, operator, value, "andnot", ignoreCase, ignoreAccent);
    };
    Predicate2.fromJson = function(json) {
      if (json instanceof Array) {
        var res = [];
        for (var i = 0, len = json.length; i < len; i++) {
          res.push(this.fromJSONData(json[i]));
        }
        return res;
      }
      var pred = json;
      return this.fromJSONData(pred);
    };
    Predicate2.prototype.validate = function(record) {
      var predicate = this.predicates ? this.predicates : [];
      var ret;
      var isAnd;
      if (!this.isComplex && this.comparer) {
        if (this.condition && this.condition.indexOf("not") !== -1) {
          this.condition = this.condition.split("not")[0] === "" ? void 0 : this.condition.split("not")[0];
          return !this.comparer.call(this, DataUtil.getObject(this.field, record), this.value, this.ignoreCase, this.ignoreAccent);
        } else {
          return this.comparer.call(this, DataUtil.getObject(this.field, record), this.value, this.ignoreCase, this.ignoreAccent);
        }
      }
      if (this.condition && this.condition.indexOf("not") !== -1) {
        isAnd = this.condition.indexOf("and") !== -1;
      } else {
        isAnd = this.condition === "and";
      }
      for (var i = 0; i < predicate.length; i++) {
        if (i > 0 && this.condition && this.condition.indexOf("not") !== -1) {
          predicate[i].condition = predicate[i].condition ? predicate[i].condition + "not" : "not";
        }
        ret = predicate[i].validate(record);
        if (isAnd) {
          if (!ret) {
            return false;
          }
        } else {
          if (ret) {
            return true;
          }
        }
      }
      return isAnd;
    };
    Predicate2.prototype.toJson = function() {
      var predicates;
      var p;
      if (this.isComplex) {
        predicates = [];
        p = this.predicates;
        for (var i = 0; i < p.length; i++) {
          predicates.push(p[i].toJson());
        }
      }
      return {
        isComplex: this.isComplex,
        field: this.field,
        operator: this.operator,
        value: this.value,
        ignoreCase: this.ignoreCase,
        ignoreAccent: this.ignoreAccent,
        condition: this.condition,
        predicates,
        matchCase: this.matchCase
      };
    };
    Predicate2.combinePredicates = function(predicates, operator) {
      if (predicates.length === 1) {
        if (!(predicates[0] instanceof Array)) {
          return predicates[0];
        }
        predicates = predicates[0];
      }
      return new Predicate2(predicates[0], operator, predicates.slice(1));
    };
    Predicate2.combine = function(pred, field, operator, value, condition, ignoreCase, ignoreAccent) {
      if (field instanceof Predicate2) {
        return Predicate2[condition](pred, field);
      }
      if (typeof field === "string") {
        return Predicate2[condition](pred, new Predicate2(field, operator, value, ignoreCase, ignoreAccent));
      }
      return DataUtil.throwError("Predicate - " + condition + " : invalid arguments");
    };
    Predicate2.fromJSONData = function(json) {
      var preds = json.predicates || [];
      var len = preds.length;
      var predicates = [];
      var result;
      for (var i = 0; i < len; i++) {
        predicates.push(this.fromJSONData(preds[i]));
      }
      if (!json.isComplex) {
        result = new Predicate2(json.field, json.operator, json.value, json.ignoreCase, json.ignoreAccent);
      } else {
        result = new Predicate2(predicates[0], json.condition, predicates.slice(1));
      }
      return result;
    };
    return Predicate2;
  }()
);

export {
  Query,
  Predicate,
  DataUtil,
  JsonAdaptor,
  DataManager
};
//# sourceMappingURL=chunk-XMNPEEFT.js.map
