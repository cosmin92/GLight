/**
 * Class encapsulating function fro BSpline interpolation
 */
export default class BSpline {

    private readonly _controlPoints: number[][];
    private readonly _degree: number;

    private readonly _baseFunction: (x: number) => any;
    private readonly _baseFunctionRangeInt: number;

    /**
     * BSpline constructor
     *
     * @param {number[][]}controlPoints
     * @param degree
     */
    public constructor(controlPoints: number[][], degree: number) {
        this._controlPoints = controlPoints;
        this._degree = degree;

        if (degree == 2) {
            this._baseFunction = this._basisDeg2;
            this._baseFunctionRangeInt = 2;
        } else if (degree == 3) {
            this._baseFunction = this._basisDeg3;
            this._baseFunctionRangeInt = 2;
        } else if (degree == 4) {
            this._baseFunction = this._basisDeg4;
            this._baseFunctionRangeInt = 3;
        } else{
            this._baseFunction = this._basisDeg5;
            this._baseFunctionRangeInt = 3;
        }
    }

    private _basisDeg2(x: number) {
        if (-0.5 <= x && x < 0.5) {
            return 0.75 - x * x;
        } else if (0.5 <= x && x <= 1.5) {
            return 1.125 + (-1.5 + x / 2.0) * x;
        } else if (-1.5 <= x && x < -0.5) {
            return 1.125 + (1.5 + x / 2.0) * x;
        } else {
            return 0;
        }
    }

    private _basisDeg3(x: number) {
        if (-1 <= x && x < 0) {
            return 2.0 / 3.0 + (-1.0 - x / 2.0) * x * x;
        } else if (1 <= x && x <= 2) {
            return 4.0 / 3.0 + x * (-2.0 + (1.0 - x / 6.0) * x);
        } else if (-2 <= x && x < -1) {
            return 4.0 / 3.0 + x * (2.0 + (1.0 + x / 6.0) * x);
        } else if (0 <= x && x < 1) {
            return 2.0 / 3.0 + (-1.0 + x / 2.0) * x * x;
        } else {
            return 0;
        }
    }

    private _basisDeg4 = function (x: number) {
        if (-1.5 <= x && x < -0.5) {
            return 55.0 / 96.0 + x * (-(5.0 / 24.0) + x * (-(5.0 / 4.0) + (-(5.0 / 6.0) - x / 6.0) * x));
        } else if (0.5 <= x && x < 1.5) {
            return 55.0 / 96.0 + x * (5.0 / 24.0 + x * (-(5.0 / 4.0) + (5.0 / 6.0 - x / 6.0) * x));
        } else if (1.5 <= x && x <= 2.5) {
            return 625.0 / 384.0 + x * (-(125.0 / 48.0) + x * (25.0 / 16.0 + (-(5.0 / 12.0) + x / 24.0) * x));
        } else if (-2.5 <= x && x <= -1.5) {
            return 625.0 / 384.0 + x * (125.0 / 48.0 + x * (25.0 / 16.0 + (5.0 / 12.0 + x / 24.0) * x));
        } else if (-1.5 <= x && x < 1.5) {
            return 115.0 / 192.0 + x * x * (-(5.0 / 8.0) + x * x / 4.0);
        } else {
            return 0;
        }
    };

    private _basisDeg5(x: number) {
        if (-2 <= x && x < -1) {
            return 17.0 / 40.0 + x * (-(5.0 / 8.0) + x * (-(7.0 / 4.0) + x * (-(5.0 / 4.0) + (-(3.0 / 8.0) - x / 24.0) * x)));
        } else if (0 <= x && x < 1) {
            return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 - x / 12.0) * x * x);
        } else if (2 <= x && x <= 3) {
            return 81.0 / 40.0 + x * (-(27.0 / 8.0) + x * (9.0 / 4.0 + x * (-(3.0 / 4.0) + (1.0 / 8.0 - x / 120.0) * x)));
        } else if (-3 <= x && x < -2) {
            return 81.0 / 40.0 + x * (27.0 / 8.0 + x * (9.0 / 4.0 + x * (3.0 / 4.0 + (1.0 / 8.0 + x / 120.0) * x)));
        } else if (1 <= x && x < 2) {
            return 17.0 / 40.0 + x * (5.0 / 8.0 + x * (-(7.0 / 4.0) + x * (5.0 / 4.0 + (-(3.0 / 8.0) + x / 24.0) * x)));
        } else if (-1 <= x && x < 0) {
            return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 + x / 12.0) * x * x);
        } else {
            return 0;
        }
    }

    private _seqAt(dim: number) {
        let points = this._controlPoints;
        let margin = this._degree + 1;

        return function (n:number) {
            if (n < margin) {
                return points[0][dim];
            } else if (points.length + margin <= n) {
                return points[points.length - 1][dim];
            } else {
                return points[n - margin][dim];
            }
        };
    };

    private _getInterpol(seq: (dim: number) => any, t: number) {
        let f = this._baseFunction;
        let rangeInt = this._baseFunctionRangeInt;
        let tInt = Math.floor(t);
        let result = 0;
        for (let i = tInt - rangeInt; i <= tInt + rangeInt; i++) {
            result += seq(i) * f(t - i);
        }
        return result;
    };

    public calcAt(t: number) {
        t = t * ((this._degree + 1) * 2 + this._controlPoints.length);//t must be in [0,1]
        return [this._getInterpol(this._seqAt(0), t), this._getInterpol(this._seqAt(1), t), this._getInterpol(this._seqAt(2), t)];
    }
}