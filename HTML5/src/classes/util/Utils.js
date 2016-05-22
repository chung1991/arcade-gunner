function isRectBodyContainPoint(rectBody, point) {
    var x1 = rectBody._position.x - rectBody._width / 2;
    var x2 = rectBody._position.x + rectBody._width / 2;
    var y1 = rectBody._position.y - rectBody._height / 2;
    var y2 = rectBody._position.y + rectBody._height / 2;

    return ((x1 <= point.x) && (point.x <= x2) && (y1 <= point.y) && (point.y <= y2));
}

function isArcBodyContainPoint(arcBody, point) {
    var dis  = cc.pLength(cc.p(arcBody._position.x - point.x, arcBody._position.y - point.y));
    return dis <= arcBody._radius;
}

function isRectBodyCollideRectBody(rectBody1, rectBody2) {
    var rect1 = {
        x : rectBody1._position.x - (rectBody1._width / 2),
        y : rectBody1._position.y - (rectBody1._height / 2),
        width : rectBody1._width,
        height : rectBody1._height
    };
    var rect2 = {
        x : rectBody2._position.x - (rectBody2._width / 2),
        y : rectBody2._position.y - (rectBody2._height / 2),
        width : rectBody2._width,
        height : rectBody2._height
    };
    return cc.rectIntersectsRect(rect1, rect2);
}

function isRectBodyCollideArcBody(rectBody, arcBody) {
    var rleft = rectBody._position.x - rectBody._width / 2;
    var rright = rectBody._position.x + rectBody._width / 2;
    var rtop = rectBody._position.y + rectBody._height / 2;
    var rbottom = rectBody._position.y - rectBody._height / 2;

    var cleft = arcBody._position.x - arcBody._radius;
    var cright = arcBody._position.x + arcBody._radius;
    var ctop = arcBody._position.y + arcBody._radius;
    var cbottom = arcBody._position.y - arcBody._radius;

    if (rright < cleft || rleft > cright || rbottom > ctop || rtop < cbottom) {
        return false;
    }
    for (var i = rleft; i <= rright; i++) {
        for (var y = rbottom; y <= rtop; y++) {
            if (Math.hypot(i + arcBody._position.x, y - arcBody._position.y) <= arcBody._radius) {
                return true;
            }
        }
    }
    if ((rleft <= arcBody._position.x && arcBody._position.x <= rright)
        && (rbottom <= arcBody._position.y && arcBody._position.y <= rtop)) {
        return true;
    }
    return false;
}

function isArcBodyColiddeArcBody(arcBody1, arcBody2) {
    var x1 = arcBody1._position.x;
    var y1 = arcBody1._position.y;
    var x2 = arcBody2._position.x;
    var y2 = arcBody2._position.y;
    var dis = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

    return (dis <= (arcBody1._radius + arcBody2._radius));
}

/*
 * dot product of 2 vectors
 * @a: (cc.Point) vector 1
 * @b: (cc.Point) vector 2
 */
function productDot(a, b) {
    return a.x * b.x + a.y * b.y;
}

/*
 * As the function name
 * @startPoint: (cc.Point) start point of line
 * @endPoint: (cc.Point) end point of line
 * @arcPos: (cc.Point) position of circle
 * @radius: (cc.Point) radius of circle
 */
function findIntersectionLineAndCircle(startPoint, endPoint, arcPos, radius) {
    var d = cc.pSub(endPoint, startPoint);
    var f = cc.pSub(startPoint, arcPos);
    var r = radius;
    var a = productDot(d, d);
    var b = 2 * productDot(f, d);
    var c = productDot(f, f) - r * r;

    var discriminant = b * b - 4 * a * c;
    if(discriminant < 0)  {
        // no intersection
        return null;
    } else {
        // ray didn't totally miss sphere,
        // so there is a solution to
        // the equation.

        discriminant = Math.sqrt(discriminant);

        // either solution may be on or off the ray so need to test both
        // t1 is always the smaller value, because BOTH discriminant and
        // a are nonnegative.
        var t1 = (-b - discriminant) / (2 * a);
        var t2 = (-b + discriminant) / (2 * a);

        // 3x HIT cases:
        //          -o->             --|-->  |            |  --|->
        // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit),

        // 3x MISS cases:
        //       ->  o                     o ->              | -> |
        // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

        if(t1 >= 0 && t1 <= 1) {
            // t1 is the intersection, and it's closer than t2
            // (since t1 uses -b - discriminant)
            // Impale, Poke
            var p = cc.p(startPoint.x + t1 * d.x, startPoint.y + t1 * d.y);
            return p;
        }

        // here t1 didn't intersect so we are either started
        // inside the sphere or completely past it
        if(t2 >= 0 && t2 <= 1)  {
            // ExitWound
            var p = cc.p(startPoint.x + t2 * d.x, startPoint.y + t2 * d.y);
            return p;
        }

        // no intn: FallShort, Past, CompletelyInside
        return null;
    }
}

/*
 * As the function name
 * @startPoint: (cc.Point) start point of line
 * @endPoint: (cc.Point) end point of line
 * @rect: (cc.Point) rectangle to check whether the point go through
 */
function findIntersectionLineAndRectangle(startPoint, endPoint, rect) {
    var minLength = 9999;
    var lineLength = cc.pLength(cc.pSub(startPoint, endPoint));
    var currentIntersectPoint = null;
    var intersectPoint = null;
    var length = null;

    // Bottom line
    intersectPoint = findIntersectionLineAndLine(startPoint, endPoint, cc.p(rect.x, rect.y),
        cc.p(rect.x + rect.width, rect.y));
    if (intersectPoint != null) {
        if (length <= lineLength && isPointInRectangle(intersectPoint, rect) && length < minLength) {
            minLength = length;
            currentIntersectPoint = intersectPoint;
        }
    }

    // Top line
    intersectPoint = findIntersectionLineAndLine(startPoint, endPoint, cc.p(rect.x, rect.y + rect.height),
        cc.p(rect.x + rect.width, rect.y + rect.height));
    if (intersectPoint != null) {
        length = cc.pLength(cc.pSub(intersectPoint, startPoint));
        if (length <= lineLength && isPointInRectangle(intersectPoint, rect) && length < minLength) {
            minLength = length;
            currentIntersectPoint = intersectPoint;
        }
    }

    // Left side...
    intersectPoint = findIntersectionLineAndLine(startPoint, endPoint, cc.p(rect.x, rect.y),
        cc.p(rect.x, rect.y + rect.height));
    if (intersectPoint != null) {
        length = cc.pLength(cc.pSub(intersectPoint, startPoint));
        if (length <= lineLength && isPointInRectangle(intersectPoint, rect) && length < minLength) {
            minLength = length;
            currentIntersectPoint = intersectPoint;
        }
    }

    // Right side
    intersectPoint = findIntersectionLineAndLine(startPoint, endPoint, cc.p(rect.x + rect.width, rect.y),
        cc.p(rect.x + rect.width, rect.y + rect.height));
    if (intersectPoint != null) {
        length = cc.pLength(cc.pSub(intersectPoint, startPoint));
        if (length <= lineLength && isPointInRectangle(intersectPoint, rect) && length < minLength) {
            minLength = length;
            currentIntersectPoint = intersectPoint;
        }
    }
    return currentIntersectPoint;
}

/*
 * Check the point in in edge of rect
 * @point: (cc.Point) the point will be checked
 * @rect: (cc.Rect) the rectangle to check whether the point lay on
 */
function isPointInRectangle(point, rect) {
    var minX = rect.x;
    var maxX = rect.x + rect.width;
    var minY = rect.y;
    var maxY = rect.y + rect.height;

    // 0.1 to fix the case: 7.999999999 and 8 but it's really on the line
    if (point.x >= (minX - 0.1) && point.x <= (maxX + 0.1) && point.y >= (minY - 0.1) && point.y <= (maxY + 0.1)) {
        return true;
    }
    return false;
}

/*
 * As the function name
 * @startPoint: (cc.Point) start point of line 1
 * @endPoint: (cc.Point) end point of line 1
 * @startPoint2: (cc.Point) start point of line 2
 * @endPoint2: (cc.Point) end point of line 2
 */
function findIntersectionLineAndLine(startPoint, endPoint, startPoint2, endPoint2) {
    var x1 = startPoint.x;
    var y1 = startPoint.y;
    var x2 = endPoint.x;
    var y2 = endPoint.y;

    var x3 = startPoint2.x;
    var y3 = startPoint2.y;
    var x4 = endPoint2.x;
    var y4 = endPoint2.y;

    var p = null;

    var d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (d != 0) {
        var xi = ((x3 - x4) * (x1 * y2 - y1 * x2) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
        var yi = ((y3 - y4) * (x1 * y2 - y1 * x2) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;

        p = cc.p(xi, yi);
    }
    return p;
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getAreaByLevel(level, base0, levelPerChapter) {
    var additional = 0;
    if (!base0) {
        additional = 1;
    }
    var area = Math.floor((level - 1) / levelPerChapter) + additional;
    return area;
}

function getChapterLevelByLevel(level, base0, levelPerChapter) {
    var additional = 0;
    if (!base0) {
        additional = 1;
    }
    return Math.floor((level - 1) % levelPerChapter + additional);
}