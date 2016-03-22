'use strict';

var CONTEXT = '@context';
var ID = '@id';
var TYPE = '@type';
var storage = angular.module('ldStorage', []);

/* Wrapper around localStorage */

storage.service('ldStorage', ['$localStorage', function($localStorage) {

	var _blankCounter = 0;

	var addFragment = function(fragment) {
		console.log('add', fragment, $localStorage.fragments);
		if (!fragment) fragment = create();

		// Make sure @id is set
		var subject = fragment[ID] || (fragment[ID] = createBlankIRI());

		// Prepare new subjects
		if (!$localStorage.fragments[subject]) {
			$localStorage.fragments[subject] = Object.create(null);
		}

		// Merge into existing graph
		Object.keys(fragment).forEach(function(key) {
			$localStorage.fragments[subject][key] = fragment[key];
		});

		return subject;
	};
	var addFragments = function(fragments) {
		fragments.forEach(function(fragment) {
			addFragment(fragment);
		});
	};
	var toObject = function(ar) {
		var result = Object.create(null);
		ar.forEach(function(val) {
			if (val[ID])
				result[val[ID]] = val;
		});
		return result;
	};
	var patch = function(subject, predicate, object) {
		if (typeof subject === 'object') {
			console.log(subject);
			addFragment(subject);
		}
		console.log('patch wut');
	};
	var createBlankIRI = function() {
		var id;
		while ($localStorage.fragments[id = '_:' + _blankCounter++]);
		return id;
	};
	var create = function() {
		var id = createBlankIRI();
		return $localStorage.fragments[id] = {
			'@context': 'https://schema.org/',
			'@type': 'Thing',
			'@id': id
		};
	};
	var unset = function(iri) {
		var prev, next, breakNext;
		for (var id in $localStorage.fragments) {
			if ($localStorage.fragments.hasOwnProperty(id)) {

				// This one, break at next
				if (id == iri) {
					breakNext = true;
				} else if (breakNext) {
					next = id;
					break;
				} else {
					prev = id;
				}
			}
		}
		console.log(prev, next);
		delete $localStorage.fragments[iri];
		return next || prev;
	};
	var init = function() {
		if (!$localStorage.fragments) {
			console.warn('no data?');
			$localStorage.fragments = {};
			reset();
		}
	};

	var findOrCreate = function(iri) {
		if (typeof iri !== 'string') {
			console.warn('Editor: Expected an IRI and got', iri);
			return {};
		}
		return $localStorage.fragments[iri] || create();
	};
	var activate = function(id) {
		if (id) {
			$localStorage.active = id;
		}
	};
	var reset = function() {
		console.log($localStorage.fragments);
		console.warn('Resetting localStorage.fragments');
		_blankCounter = 0;
		angular.forEach($localStorage.fragments, function(val, key) {
			delete $localStorage.fragments[key];
		});
		angular.forEach(sampleFragments, function(val, key) {
			$localStorage.fragments[val[ID]] = val;
		});
	};

	init();

	// Hack: ldStorage.active is used to sync the active fragment over all scopes
	return {
		addFragment: addFragment,
		findOrCreate: findOrCreate,
		reset: reset,
		patch: patch,
		create: create,
		unset: unset,
		all: $localStorage.fragments,
		set active(id) {
			$localStorage.active = id;
		},
		get active() {
			return $localStorage.active;
		}
	};
}]);

var sampleFragments = [{
	'@context': 'http://schema.org/',
	'@id': '_:n0',
	'@type': 'Person',
	'name': 'I am a sample fragment'
}];
