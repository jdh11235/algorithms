/* Copyright (c) 2015 Jonathan Herman. MIT License. */
/* https://github.com/jdh11235/algorithms */

function randomlyPartition (n, p) {
	//n: number to be partitioned
	//p: number of partitions
	//n and p must be positive integers
	//n must be greater than or equal to p

	function randomFromRange (min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function isInteger (n) {
		return (n % 2 === 0 || n % 2 === 1);
	}

	function shuffle (set) {
		return set.sort(function () {
			return 0.5 - Math.random();
		});
	}

	function fork (n) {
		var split = randomFromRange(1, n - 1);
		return [split, n - split];
	}

	//test: n and p are numbers
	if ( !(typeof n === 'number' && typeof p === 'number') ) {
		return false;
	}

	//test: n and p are integers
	if ( !(isInteger(n) && isInteger(p) && n > 0 && p > 0) ) {
		return false;
	}

	//test: n is greater than or equal to p
	if ( !(n >= p) ) {
		return false;
	}

	var set = [n];
	var subset;
	var index;
	var pos;
	var forked;

	//partition set recursively until set has p partitions
	for (var i = 0, i2 = 0; i < p - 1; i++) {
		subset = [];
		index = [];

		//filter into subset: numbers greater than 1 (because 1 can't be split into two positive integers)
		for (i2 = 0; i2 < set.length; i2++) {
			if (set[i2] > 1) {
				subset.push(set[i2]);
				index.push(i2);
			}
		}

		//randomly select number from subset
		pos = randomFromRange(0, subset.length - 1);

		//randomly partition number into two parts
		forked = fork(subset[pos]);

		//replace number in set with the two resulting partitions of that number
		set.splice(index[pos], 1, forked[0], forked[1]);
	}

	return shuffle(set);
}
