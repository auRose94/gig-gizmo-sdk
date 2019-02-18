"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
function ModelNameToModel(name) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = name;
                    switch (_a) {
                        case "Band": return [3 /*break*/, 1];
                        case "Conversation": return [3 /*break*/, 3];
                        case "ErrorReport": return [3 /*break*/, 5];
                        case "FacebookAccount": return [3 /*break*/, 7];
                        case "Gig": return [3 /*break*/, 9];
                        case "GooglePlace": return [3 /*break*/, 11];
                        case "Location": return [3 /*break*/, 13];
                        case "Notification": return [3 /*break*/, 15];
                        case "Page": return [3 /*break*/, 17];
                        case "Post": return [3 /*break*/, 19];
                        case "Request": return [3 /*break*/, 21];
                        case "TwitterAccount": return [3 /*break*/, 23];
                        case "Upload": return [3 /*break*/, 25];
                        case "User": return [3 /*break*/, 27];
                        case "Venue": return [3 /*break*/, 29];
                    }
                    return [3 /*break*/, 31];
                case 1: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Band")); })];
                case 2: return [2 /*return*/, (_b.sent()).default];
                case 3: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Conversation")); })];
                case 4: return [2 /*return*/, (_b.sent()).default];
                case 5: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./ErrorReport")); })];
                case 6: return [2 /*return*/, (_b.sent()).default];
                case 7: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./FacebookAccount")); })];
                case 8: return [2 /*return*/, (_b.sent()).default];
                case 9: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Gig")); })];
                case 10: return [2 /*return*/, (_b.sent()).default];
                case 11: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./GooglePlace")); })];
                case 12: return [2 /*return*/, (_b.sent()).default];
                case 13: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Location")); })];
                case 14: return [2 /*return*/, (_b.sent()).default];
                case 15: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Notification")); })];
                case 16: return [2 /*return*/, (_b.sent()).default];
                case 17: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Page")); })];
                case 18: return [2 /*return*/, (_b.sent()).default];
                case 19: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Post")); })];
                case 20: return [2 /*return*/, (_b.sent()).default];
                case 21: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Request")); })];
                case 22: return [2 /*return*/, (_b.sent()).default];
                case 23: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./TwitterAccount")); })];
                case 24: return [2 /*return*/, (_b.sent()).default];
                case 25: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Upload")); })];
                case 26: return [2 /*return*/, (_b.sent()).default];
                case 27: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./User")); })];
                case 28: return [2 /*return*/, (_b.sent()).default];
                case 29: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./Venue")); })];
                case 30: return [2 /*return*/, (_b.sent()).default];
                case 31: return [2 /*return*/, Promise.resolve(null)];
            }
        });
    });
}
exports.default = ModelNameToModel;
//# sourceMappingURL=ModelNameToModel.js.map