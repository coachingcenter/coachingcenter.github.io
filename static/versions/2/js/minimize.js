/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	try {
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
	} catch (e) { }

	context = context || document;
	results = results || [];
	try {
		nodeType = context.nodeType;
	} catch (e) { }

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	try {
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	} catch (e) { }

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {

	// Set document vars if needed
	try {	
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	} catch (e) { }

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	try {
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	} catch (e) { }

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);/**
* bootbox.js [v4.4.0]
*
* http://bootboxjs.com/license.txt
*/
(function (root, factory) {
"use strict";
if (typeof define === "function" && define.amd) {
define(["jquery"], factory);
} else if (typeof exports === "object") {
module.exports = factory(require("jquery"));
} else {
root.bootbox = factory(root.jQuery);
}
}(this, function init($, undefined) {
"use strict";
var templates = {
dialog:
"<div class='bootbox modal' tabindex='-1' role='dialog'>" +
"<div class='modal-dialog'>" +
"<div class='modal-content'>" +
"<div class='modal-body'><div class='bootbox-body'></div></div>" +
"</div>" +
"</div>" +
"</div>",
header:
"<div class='modal-header'>" +
"<h4 class='modal-title'></h4>" +
"</div>",
footer:
"<div class='modal-footer'></div>",
closeButton:
"<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
form:
"<form class='bootbox-form'></form>",
inputs: {
text:
"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
textarea:
"<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
email:
"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
select:
"<select class='bootbox-input bootbox-input-select form-control'></select>",
checkbox:
"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
date:
"<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
time:
"<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
number:
"<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
password:
"<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
}
};
var defaults = {
locale: "en",
backdrop: "static",
animate: true,
className: null,
closeButton: true,
show: true,
container: "body"
};
var exports = {};
/**
* @private
*/
function _t(key) {
var locale = locales[defaults.locale];
return locale ? locale[key] : locales.en[key];
}
function processCallback(e, dialog, callback) {
e.stopPropagation();
e.preventDefault();
var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;
if (!preserveDialog) {
dialog.modal("hide");
}
}
function getKeyLength(obj) {
var k, t = 0;
for (k in obj) {
t ++;
}
return t;
}
function each(collection, iterator) {
var index = 0;
$.each(collection, function(key, value) {
iterator(key, value, index++);
});
}
function sanitize(options) {
var buttons;
var total;
if (typeof options !== "object") {
throw new Error("Please supply an object of options");
}
if (!options.message) {
throw new Error("Please specify a message");
}
options = $.extend({}, defaults, options);
if (!options.buttons) {
options.buttons = {};
}
buttons = options.buttons;
total = getKeyLength(buttons);
each(buttons, function(key, button, index) {
if ($.isFunction(button)) {
button = buttons[key] = {
callback: button
};
}
if ($.type(button) !== "object") {
throw new Error("button with key " + key + " must be an object");
}
if (!button.label) {
button.label = key;
}
if (!button.className) {
if (total <= 2 && index === total-1) {
button.className = "btn-primary";
} else {
button.className = "btn-default";
}
}
});
return options;
}
/**
* map a flexible set of arguments into a single returned object
* if args.length is already one just return it, otherwise
* use the properties argument to map the unnamed args to
* object properties
* so in the latter case:
* mapArguments(["foo", $.noop], ["message", "callback"])
* -> { message: "foo", callback: $.noop }
*/
function mapArguments(args, properties) {
var argn = args.length;
var options = {};
if (argn < 1 || argn > 2) {
throw new Error("Invalid argument length");
}
if (argn === 2 || typeof args[0] === "string") {
options[properties[0]] = args[0];
options[properties[1]] = args[1];
} else {
options = args[0];
}
return options;
}
/**
* merge a set of default dialog options with user supplied arguments
*/
function mergeArguments(defaults, args, properties) {
return $.extend(
true,
{},
defaults,
mapArguments(
args,
properties
)
);
}
/**
* this entry-level method makes heavy use of composition to take a simple
* range of inputs and return valid options suitable for passing to bootbox.dialog
*/
function mergeDialogOptions(className, labels, properties, args) {
var baseOptions = {
className: "bootbox-" + className,
buttons: createLabels.apply(null, labels)
};
return validateButtons(
mergeArguments(
baseOptions,
args,
properties
),
labels
);
}
/**
* from a given list of arguments return a suitable object of button labels
* all this does is normalise the given labels and translate them where possible
* e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
*/
function createLabels() {
var buttons = {};
for (var i = 0, j = arguments.length; i < j; i++) {
var argument = arguments[i];
var key = argument.toLowerCase();
var value = argument.toUpperCase();
buttons[key] = {
label: _t(value)
};
}
return buttons;
}
function validateButtons(options, buttons) {
var allowedButtons = {};
each(buttons, function(key, value) {
allowedButtons[value] = true;
});
each(options.buttons, function(key) {
if (allowedButtons[key] === undefined) {
throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
}
});
return options;
}
exports.alert = function() {
var options;
options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);
if (options.callback && !$.isFunction(options.callback)) {
throw new Error("alert requires callback property to be a function when provided");
}
/**
* overrides
*/
options.buttons.ok.callback = options.onEscape = function() {
if ($.isFunction(options.callback)) {
return options.callback.call(this);
}
return true;
};
return exports.dialog(options);
};
exports.confirm = function() {
var options;
options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);
/**
* overrides; undo anything the user tried to set they shouldn't have
*/
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback.call(this, false);
};
options.buttons.confirm.callback = function() {
return options.callback.call(this, true);
};
if (!$.isFunction(options.callback)) {
throw new Error("confirm requires a callback");
}
return exports.dialog(options);
};
exports.prompt = function() {
var options;
var defaults;
var dialog;
var form;
var input;
var shouldShow;
var inputOptions;
form = $(templates.form);
defaults = {
className: "bootbox-prompt",
buttons: createLabels("cancel", "confirm"),
value: "",
inputType: "text"
};
options = validateButtons(
mergeArguments(defaults, arguments, ["title", "callback"]),
["cancel", "confirm"]
);
shouldShow = (options.show === undefined) ? true : options.show;
/**
* overrides; undo anything the user tried to set they shouldn't have
*/
options.message = form;
options.buttons.cancel.callback = options.onEscape = function() {
return options.callback.call(this, null);
};
options.buttons.confirm.callback = function() {
var value;
switch (options.inputType) {
case "text":
case "textarea":
case "email":
case "select":
case "date":
case "time":
case "number":
case "password":
value = input.val();
break;
case "checkbox":
var checkedItems = input.find("input:checked");
value = [];
each(checkedItems, function(_, item) {
value.push($(item).val());
});
break;
}
return options.callback.call(this, value);
};
options.show = false;
if (!options.title) {
throw new Error("prompt requires a title");
}
if (!$.isFunction(options.callback)) {
throw new Error("prompt requires a callback");
}
if (!templates.inputs[options.inputType]) {
throw new Error("invalid prompt type");
}
input = $(templates.inputs[options.inputType]);
switch (options.inputType) {
case "text":
case "textarea":
case "email":
case "date":
case "time":
case "number":
case "password":
input.val(options.value);
break;
case "select":
var groups = {};
inputOptions = options.inputOptions || [];
if (!$.isArray(inputOptions)) {
throw new Error("Please pass an array of input options");
}
if (!inputOptions.length) {
throw new Error("prompt with select requires options");
}
each(inputOptions, function(_, option) {
var elem = input;
if (option.value === undefined || option.text === undefined) {
throw new Error("given options in wrong format");
}
if (option.group) {
if (!groups[option.group]) {
groups[option.group] = $("<optgroup/>").attr("label", option.group);
}
elem = groups[option.group];
}
elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
});
each(groups, function(_, group) {
input.append(group);
});
input.val(options.value);
break;
case "checkbox":
var values   = $.isArray(options.value) ? options.value : [options.value];
inputOptions = options.inputOptions || [];
if (!inputOptions.length) {
throw new Error("prompt with checkbox requires options");
}
if (!inputOptions[0].value || !inputOptions[0].text) {
throw new Error("given options in wrong format");
}
input = $("<div/>");
each(inputOptions, function(_, option) {
var checkbox = $(templates.inputs[options.inputType]);
checkbox.find("input").attr("value", option.value);
checkbox.find("label").append(option.text);
each(values, function(_, value) {
if (value === option.value) {
checkbox.find("input").prop("checked", true);
}
});
input.append(checkbox);
});
break;
}
if (options.placeholder) {
input.attr("placeholder", options.placeholder);
}
if (options.pattern) {
input.attr("pattern", options.pattern);
}
if (options.maxlength) {
input.attr("maxlength", options.maxlength);
}
form.append(input);
form.on("submit", function(e) {
e.preventDefault();
e.stopPropagation();
dialog.find(".btn-primary").click();
});
dialog = exports.dialog(options);
dialog.off("shown.bs.modal");
dialog.on("shown.bs.modal", function() {
input.focus();
});
if (shouldShow === true) {
dialog.modal("show");
}
return dialog;
};
exports.dialog = function(options) {
options = sanitize(options);
var dialog = $(templates.dialog);
var innerDialog = dialog.find(".modal-dialog");
var body = dialog.find(".modal-body");
var buttons = options.buttons;
var buttonStr = "";
var callbacks = {
onEscape: options.onEscape
};
if ($.fn.modal === undefined) {
throw new Error(
"$.fn.modal is not defined; please double check you have included " +
"the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
"for more details."
);
}
each(buttons, function(key, button) {
buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
callbacks[key] = button.callback;
});
body.find(".bootbox-body").html(options.message);
if (options.animate === true) {
dialog.addClass("fade");
}
if (options.className) {
dialog.addClass(options.className);
}
if (options.size === "large") {
innerDialog.addClass("modal-lg");
} else if (options.size === "small") {
innerDialog.addClass("modal-sm");
}
if (options.title) {
body.before(templates.header);
}
if (options.closeButton) {
var closeButton = $(templates.closeButton);
if (options.title) {
dialog.find(".modal-header").prepend(closeButton);
} else {
closeButton.css("margin-top", "-10px").prependTo(body);
}
}
if (options.title) {
dialog.find(".modal-title").html(options.title);
}
if (buttonStr.length) {
body.after(templates.footer);
dialog.find(".modal-footer").html(buttonStr);
}
/**
* Bootstrap event listeners; used handle extra
* setup & teardown required after the underlying
* modal has performed certain actions
*/
dialog.on("hidden.bs.modal", function(e) {
if (e.target === this) {
dialog.remove();
}
});
/*
dialog.on("show.bs.modal", function() {
if (options.backdrop) {
dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
}
});
*/
dialog.on("shown.bs.modal", function() {
dialog.find(".btn-primary:first").focus();
});
/**
* Bootbox event listeners; experimental and may not last
* just an attempt to decouple some behaviours from their
* respective triggers
*/
if (options.backdrop !== "static") {
dialog.on("click.dismiss.bs.modal", function(e) {
if (dialog.children(".modal-backdrop").length) {
e.currentTarget = dialog.children(".modal-backdrop").get(0);
}
if (e.target !== e.currentTarget) {
return;
}
dialog.trigger("escape.close.bb");
});
}
dialog.on("escape.close.bb", function(e) {
if (callbacks.onEscape) {
processCallback(e, dialog, callbacks.onEscape);
}
});
/**
* Standard jQuery event listeners; used to handle user
* interaction with our dialog
*/
dialog.on("click", ".modal-footer button", function(e) {
var callbackKey = $(this).data("bb-handler");
processCallback(e, dialog, callbacks[callbackKey]);
});
dialog.on("click", ".bootbox-close-button", function(e) {
processCallback(e, dialog, callbacks.onEscape);
});
dialog.on("keyup", function(e) {
if (e.which === 27) {
dialog.trigger("escape.close.bb");
}
});
$(options.container).append(dialog);
dialog.modal({
backdrop: options.backdrop ? "static": false,
keyboard: false,
show: false
});
if (options.show) {
dialog.modal("show");
}
/*
function BBDialog(elem) {
this.elem = elem;
}
BBDialog.prototype = {
hide: function() {
return this.elem.modal("hide");
},
show: function() {
return this.elem.modal("show");
}
};
*/
return dialog;
};
exports.setDefaults = function() {
var values = {};
if (arguments.length === 2) {
values[arguments[0]] = arguments[1];
} else {
values = arguments[0];
}
$.extend(defaults, values);
};
exports.hideAll = function() {
$(".bootbox").modal("hide");
return exports;
};
/**
* standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
* unlikely to be required. If this gets too large it can be split out into separate JS files.
*/
var locales = {
bg_BG : {
OK      : "Ок",
CANCEL  : "Отказ",
CONFIRM : "Потвърждавам"
},
br : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Sim"
},
cs : {
OK      : "OK",
CANCEL  : "Zrušit",
CONFIRM : "Potvrdit"
},
da : {
OK      : "OK",
CANCEL  : "Annuller",
CONFIRM : "Accepter"
},
de : {
OK      : "OK",
CANCEL  : "Abbrechen",
CONFIRM : "Akzeptieren"
},
el : {
OK      : "Εντάξει",
CANCEL  : "Ακύρωση",
CONFIRM : "Επιβεβαίωση"
},
en : {
OK      : "OK",
CANCEL  : "Cancel",
CONFIRM : "OK"
},
es : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Aceptar"
},
et : {
OK      : "OK",
CANCEL  : "Katkesta",
CONFIRM : "OK"
},
fa : {
OK      : "قبول",
CANCEL  : "لغو",
CONFIRM : "تایید"
},
fi : {
OK      : "OK",
CANCEL  : "Peruuta",
CONFIRM : "OK"
},
fr : {
OK      : "OK",
CANCEL  : "Annuler",
CONFIRM : "D'accord"
},
he : {
OK      : "אישור",
CANCEL  : "ביטול",
CONFIRM : "אישור"
},
hu : {
OK      : "OK",
CANCEL  : "Mégsem",
CONFIRM : "Megerősít"
},
hr : {
OK      : "OK",
CANCEL  : "Odustani",
CONFIRM : "Potvrdi"
},
id : {
OK      : "OK",
CANCEL  : "Batal",
CONFIRM : "OK"
},
it : {
OK      : "OK",
CANCEL  : "Annulla",
CONFIRM : "Conferma"
},
ja : {
OK      : "OK",
CANCEL  : "キャンセル",
CONFIRM : "確認"
},
lt : {
OK      : "Gerai",
CANCEL  : "Atšaukti",
CONFIRM : "Patvirtinti"
},
lv : {
OK      : "Labi",
CANCEL  : "Atcelt",
CONFIRM : "Apstiprināt"
},
nl : {
OK      : "OK",
CANCEL  : "Annuleren",
CONFIRM : "Accepteren"
},
no : {
OK      : "OK",
CANCEL  : "Avbryt",
CONFIRM : "OK"
},
pl : {
OK      : "OK",
CANCEL  : "Anuluj",
CONFIRM : "Potwierdź"
},
pt : {
OK      : "OK",
CANCEL  : "Cancelar",
CONFIRM : "Confirmar"
},
ru : {
OK      : "OK",
CANCEL  : "Отмена",
CONFIRM : "Применить"
},
sq : {
OK : "OK",
CANCEL : "Anulo",
CONFIRM : "Prano"
},
sv : {
OK      : "OK",
CANCEL  : "Avbryt",
CONFIRM : "OK"
},
th : {
OK      : "ตกลง",
CANCEL  : "ยกเลิก",
CONFIRM : "ยืนยัน"
},
tr : {
OK      : "Tamam",
CANCEL  : "İptal",
CONFIRM : "Onayla"
},
zh_CN : {
OK      : "OK",
CANCEL  : "取消",
CONFIRM : "确认"
},
zh_TW : {
OK      : "OK",
CANCEL  : "取消",
CONFIRM : "確認"
}
};
exports.addLocale = function(name, values) {
$.each(["OK", "CANCEL", "CONFIRM"], function(_, v) {
if (!values[v]) {
throw new Error("Please supply a translation for '" + v + "'");
}
});
locales[name] = {
OK: values.OK,
CANCEL: values.CANCEL,
CONFIRM: values.CONFIRM
};
return exports;
};
exports.removeLocale = function(name) {
delete locales[name];
return exports;
};
exports.setLocale = function(name) {
return exports.setDefaults("locale", name);
};
exports.init = function(_$) {
return init(_$ || $);
};
return exports;
}));/*!
* Modernizr v2.7.1
* www.modernizr.com
*
* Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
* Available under the BSD and MIT licenses: www.modernizr.com/license/
*/
/*
* Modernizr tests which native CSS3 and HTML5 features are available in
* the current UA and makes the results available to you in two ways:
* as properties on a global Modernizr object, and as classes on the
* <html> element. This information allows you to progressively enhance
* your pages with a granular level of control over the experience.
*
* Modernizr has an optional (not included) conditional resource loader
* called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
* To get a build that includes Modernizr.load(), as well as choosing
* which tests to include, go to www.modernizr.com/download/
*
* Authors        Faruk Ates, Paul Irish, Alex Sexton
* Contributors   Ryan Seddon, Ben Alman
*/
window.Modernizr = (function( window, document, undefined ) {
var version = '2.7.1',
Modernizr = {},
/*>>cssclasses*/
enableClasses = true,
/*>>cssclasses*/
docElement = document.documentElement,
/**
* Create our "modernizr" element that we do most feature tests on.
*/
mod = 'modernizr',
modElem = document.createElement(mod),
mStyle = modElem.style,
/**
* Create the input element for various Web Forms feature tests.
*/
inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,
/*>>smile*/
smile = ':)',
/*>>smile*/
toString = {}.toString,
/*>>prefixes*/
prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
/*>>prefixes*/
/*>>domprefixes*/
omPrefixes = 'Webkit Moz O ms',
cssomPrefixes = omPrefixes.split(' '),
domPrefixes = omPrefixes.toLowerCase().split(' '),
/*>>domprefixes*/
/*>>ns*/
ns = {'svg': 'http://www.w3.org/2000/svg'},
/*>>ns*/
tests = {},
inputs = {},
attrs = {},
classes = [],
slice = classes.slice,
featureName, // used in testing loop
/*>>teststyles*/
injectElementWithStyles = function( rule, callback, nodes, testnames ) {
var style, ret, node, docOverflow,
div = document.createElement('div'),
body = document.body,
fakeBody = body || document.createElement('body');
if ( parseInt(nodes, 10) ) {
while ( nodes-- ) {
node = document.createElement('div');
node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
div.appendChild(node);
}
}
style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
div.id = mod;
(body ? div : fakeBody).innerHTML += style;
fakeBody.appendChild(div);
if ( !body ) {
fakeBody.style.background = '';
fakeBody.style.overflow = 'hidden';
docOverflow = docElement.style.overflow;
docElement.style.overflow = 'hidden';
docElement.appendChild(fakeBody);
}
ret = callback(div, rule);
if ( !body ) {
fakeBody.parentNode.removeChild(fakeBody);
docElement.style.overflow = docOverflow;
} else {
div.parentNode.removeChild(div);
}
return !!ret;
},
/*>>teststyles*/
/*>>mq*/
testMediaQuery = function( mq ) {
var matchMedia = window.matchMedia || window.msMatchMedia;
if ( matchMedia ) {
return matchMedia(mq).matches;
}
var bool;
injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
bool = (window.getComputedStyle ?
getComputedStyle(node, null) :
node.currentStyle)['position'] == 'absolute';
});
return bool;
},
/*>>mq*/
/*>>hasevent*/
isEventSupported = (function() {
var TAGNAMES = {
'select': 'input', 'change': 'input',
'submit': 'form', 'reset': 'form',
'error': 'img', 'load': 'img', 'abort': 'img'
};
function isEventSupported( eventName, element ) {
element = element || document.createElement(TAGNAMES[eventName] || 'div');
eventName = 'on' + eventName;
var isSupported = eventName in element;
if ( !isSupported ) {
if ( !element.setAttribute ) {
element = document.createElement('div');
}
if ( element.setAttribute && element.removeAttribute ) {
element.setAttribute(eventName, '');
isSupported = is(element[eventName], 'function');
if ( !is(element[eventName], 'undefined') ) {
element[eventName] = undefined;
}
element.removeAttribute(eventName);
}
}
element = null;
return isSupported;
}
return isEventSupported;
})(),
/*>>hasevent*/
_hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;
if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
hasOwnProp = function (object, property) {
return _hasOwnProperty.call(object, property);
};
}
else {
hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
};
}
if (!Function.prototype.bind) {
Function.prototype.bind = function bind(that) {
var target = this;
if (typeof target != "function") {
throw new TypeError();
}
var args = slice.call(arguments, 1),
bound = function () {
if (this instanceof bound) {
var F = function(){};
F.prototype = target.prototype;
var self = new F();
var result = target.apply(
self,
args.concat(slice.call(arguments))
);
if (Object(result) === result) {
return result;
}
return self;
} else {
return target.apply(
that,
args.concat(slice.call(arguments))
);
}
};
return bound;
};
}
/**
* setCss applies given styles to the Modernizr DOM node.
*/
function setCss( str ) {
mStyle.cssText = str;
}
/**
* setCssAll extrapolates all vendor-specific css strings.
*/
function setCssAll( str1, str2 ) {
return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
}
/**
* is returns a boolean for if typeof obj is exactly type.
*/
function is( obj, type ) {
return typeof obj === type;
}
/**
* contains returns a boolean for if substr is found within str.
*/
function contains( str, substr ) {
return !!~('' + str).indexOf(substr);
}
/*>>testprop*/
function testProps( props, prefixed ) {
for ( var i in props ) {
var prop = props[i];
if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
return prefixed == 'pfx' ? prop : true;
}
}
return false;
}
/*>>testprop*/
/**
* testDOMProps is a generic DOM property test; if a browser supports
*   a certain property, it won't return undefined for it.
*/
function testDOMProps( props, obj, elem ) {
for ( var i in props ) {
var item = obj[props[i]];
if ( item !== undefined) {
if (elem === false) return props[i];
if (is(item, 'function')){
return item.bind(elem || obj);
}
return item;
}
}
return false;
}
/*>>testallprops*/
/**
* testPropsAll tests a list of DOM properties we want to check against.
*   We specify literally ALL possible (known and/or likely) properties on
*   the element including the non-vendor prefixed one, for forward-
*   compatibility.
*/
function testPropsAll( prop, prefixed, elem ) {
var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
if(is(prefixed, "string") || is(prefixed, "undefined")) {
return testProps(props, prefixed);
} else {
props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
return testDOMProps(props, prefixed, elem);
}
}
/*>>testallprops*/
/**
* Tests
* -----
*/
tests['flexbox'] = function() {
return testPropsAll('flexWrap');
};
tests['flexboxlegacy'] = function() {
return testPropsAll('boxDirection');
};
tests['canvas'] = function() {
var elem = document.createElement('canvas');
return !!(elem.getContext && elem.getContext('2d'));
};
tests['canvastext'] = function() {
return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
};
tests['webgl'] = function() {
return !!window.WebGLRenderingContext;
};
/*
* The Modernizr.touch test only indicates if the browser supports
*    touch events, which does not necessarily reflect a touchscreen
*    device, as evidenced by tablets running Windows 7 or, alas,
*    the Palm Pre / WebOS (touch) phones.
*
* Additionally, Chrome (desktop) used to lie about its support on this,
*    but that has since been rectified: crbug.com/36415
*
* We also test for Firefox 4 Multitouch Support.
*
* For more info, see: modernizr.github.com/Modernizr/touch.html
*/
tests['touch'] = function() {
var bool;
if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
bool = true;
} else {
injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
bool = node.offsetTop === 9;
});
}
return bool;
};
tests['geolocation'] = function() {
return 'geolocation' in navigator;
};
tests['postmessage'] = function() {
return !!window.postMessage;
};
tests['websqldatabase'] = function() {
return !!window.openDatabase;
};
tests['indexedDB'] = function() {
return !!testPropsAll("indexedDB", window);
};
tests['hashchange'] = function() {
return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
};
tests['history'] = function() {
return !!(window.history && history.pushState);
};
tests['draganddrop'] = function() {
var div = document.createElement('div');
return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
};
tests['websockets'] = function() {
return 'WebSocket' in window || 'MozWebSocket' in window;
};
tests['rgba'] = function() {
setCss('background-color:rgba(150,255,150,.5)');
return contains(mStyle.backgroundColor, 'rgba');
};
tests['hsla'] = function() {
setCss('background-color:hsla(120,40%,100%,.5)');
return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
};
tests['multiplebgs'] = function() {
setCss('background:url(https://),url(https://),red url(https://)');
return (/(url\s*\(.*?){3}/).test(mStyle.background);
};
tests['backgroundsize'] = function() {
return testPropsAll('backgroundSize');
};
tests['borderimage'] = function() {
return testPropsAll('borderImage');
};
tests['borderradius'] = function() {
return testPropsAll('borderRadius');
};
tests['boxshadow'] = function() {
return testPropsAll('boxShadow');
};
tests['textshadow'] = function() {
return document.createElement('div').style.textShadow === '';
};
tests['opacity'] = function() {
setCssAll('opacity:.55');
return (/^0.55$/).test(mStyle.opacity);
};
tests['cssanimations'] = function() {
return testPropsAll('animationName');
};
tests['csscolumns'] = function() {
return testPropsAll('columnCount');
};
tests['cssgradients'] = function() {
/**
* For CSS Gradients syntax, please see:
* webkit.org/blog/175/introducing-css-gradients/
* developer.mozilla.org/en/CSS/-moz-linear-gradient
* developer.mozilla.org/en/CSS/-moz-radial-gradient
* dev.w3.org/csswg/css3-images/#gradients-
*/
var str1 = 'background-image:',
str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
str3 = 'linear-gradient(left top,#9f9, white);';
setCss(
(str1 + '-webkit- '.split(' ').join(str2 + str1) +
prefixes.join(str3 + str1)).slice(0, -str1.length)
);
return contains(mStyle.backgroundImage, 'gradient');
};
tests['cssreflections'] = function() {
return testPropsAll('boxReflect');
};
tests['csstransforms'] = function() {
return !!testPropsAll('transform');
};
tests['csstransforms3d'] = function() {
var ret = !!testPropsAll('perspective');
if ( ret && 'webkitPerspective' in docElement.style ) {
injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
ret = node.offsetLeft === 9 && node.offsetHeight === 3;
});
}
return ret;
};
tests['csstransitions'] = function() {
return testPropsAll('transition');
};
/*>>fontface*/
tests['fontface'] = function() {
var bool;
injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
var style = document.getElementById('smodernizr'),
sheet = style.sheet || style.styleSheet,
cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
});
return bool;
};
/*>>fontface*/
tests['generatedcontent'] = function() {
var bool;
injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
bool = node.offsetHeight >= 3;
});
return bool;
};
tests['video'] = function() {
var elem = document.createElement('video'),
bool = false;
try {
if ( bool = !!elem.canPlayType ) {
bool      = new Boolean(bool);
bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');
bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');
bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
}
} catch(e) { }
return bool;
};
tests['audio'] = function() {
var elem = document.createElement('audio'),
bool = false;
try {
if ( bool = !!elem.canPlayType ) {
bool      = new Boolean(bool);
bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');
bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
}
} catch(e) { }
return bool;
};
tests['localstorage'] = function() {
try {
localStorage.setItem(mod, mod);
localStorage.removeItem(mod);
return true;
} catch(e) {
return false;
}
};
tests['sessionstorage'] = function() {
try {
sessionStorage.setItem(mod, mod);
sessionStorage.removeItem(mod);
return true;
} catch(e) {
return false;
}
};
tests['webworkers'] = function() {
return !!window.Worker;
};
tests['applicationcache'] = function() {
return !!window.applicationCache;
};
tests['svg'] = function() {
return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
};
tests['inlinesvg'] = function() {
var div = document.createElement('div');
div.innerHTML = '<svg/>';
return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
};
tests['smil'] = function() {
return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
};
tests['svgclippaths'] = function() {
return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
};
/*>>webforms*/
function webforms() {
/*>>input*/
Modernizr['input'] = (function( props ) {
for ( var i = 0, len = props.length; i < len; i++ ) {
attrs[ props[i] ] = !!(props[i] in inputElem);
}
if (attrs.list){
attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
}
return attrs;
})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
/*>>input*/
/*>>inputtypes*/
Modernizr['inputtypes'] = (function(props) {
for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {
inputElem.setAttribute('type', inputElemType = props[i]);
bool = inputElem.type !== 'text';
if ( bool ) {
inputElem.value         = smile;
inputElem.style.cssText = 'position:absolute;visibility:hidden;';
if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {
docElement.appendChild(inputElem);
defaultView = document.defaultView;
bool =  defaultView.getComputedStyle &&
defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
(inputElem.offsetHeight !== 0);
docElement.removeChild(inputElem);
} else if ( /^(search|tel)$/.test(inputElemType) ){
} else if ( /^(url|email)$/.test(inputElemType) ) {
bool = inputElem.checkValidity && inputElem.checkValidity() === false;
} else {
bool = inputElem.value != smile;
}
}
inputs[ props[i] ] = !!bool;
}
return inputs;
})('search tel url email datetime date month week time datetime-local number range color'.split(' '));
/*>>inputtypes*/
}
/*>>webforms*/
for ( var feature in tests ) {
if ( hasOwnProp(tests, feature) ) {
featureName  = feature.toLowerCase();
Modernizr[featureName] = tests[feature]();
classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
}
}
/*>>webforms*/
Modernizr.input || webforms();
/*>>webforms*/
/**
* addTest allows the user to define their own feature tests
* the result will be added onto the Modernizr object,
* as well as an appropriate className set on the html element
*
* @param feature - String naming the feature
* @param test - Function returning true if feature is supported, false if not
*/
Modernizr.addTest = function ( feature, test ) {
if ( typeof feature == 'object' ) {
for ( var key in feature ) {
if ( hasOwnProp( feature, key ) ) {
Modernizr.addTest( key, feature[ key ] );
}
}
} else {
feature = feature.toLowerCase();
if ( Modernizr[feature] !== undefined ) {
return Modernizr;
}
test = typeof test == 'function' ? test() : test;
if (typeof enableClasses !== "undefined" && enableClasses) {
docElement.className += ' ' + (test ? '' : 'no-') + feature;
}
Modernizr[feature] = test;
}
return Modernizr; // allow chaining.
};
setCss('');
modElem = inputElem = null;
/*>>shiv*/
/**
* @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
/** version */
var version = '3.7.0';
/** Preset options */
var options = window.html5 || {};
/** Used to skip problem elements */
var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
/** Not all elements can be cloned in IE **/
var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
/** Detect whether the browser supports default html5 styles */
var supportsHtml5Styles;
/** Name of the expando, to work with multiple documents or to re-shiv one document */
var expando = '_html5shiv';
/** The id for the the documents expando */
var expanID = 0;
/** Cached data for each document */
var expandoData = {};
/** Detect whether the browser supports unknown elements */
var supportsUnknownElements;
(function() {
try {
var a = document.createElement('a');
a.innerHTML = '<xyz></xyz>';
supportsHtml5Styles = ('hidden' in a);
supportsUnknownElements = a.childNodes.length == 1 || (function() {
(document.createElement)('a');
var frag = document.createDocumentFragment();
return (
typeof frag.cloneNode == 'undefined' ||
typeof frag.createDocumentFragment == 'undefined' ||
typeof frag.createElement == 'undefined'
);
}());
} catch(e) {
supportsHtml5Styles = true;
supportsUnknownElements = true;
}
}());
/*--------------------------------------------------------------------------*/
/**
* Creates a style sheet with the given CSS text and adds it to the document.
* @private
* @param {Document} ownerDocument The document.
* @param {String} cssText The CSS text.
* @returns {StyleSheet} The style element.
*/
function addStyleSheet(ownerDocument, cssText) {
var p = ownerDocument.createElement('p'),
parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
p.innerHTML = 'x<style>' + cssText + '</style>';
return parent.insertBefore(p.lastChild, parent.firstChild);
}
/**
* Returns the value of `html5.elements` as an array.
* @private
* @returns {Array} An array of shived element node names.
*/
function getElements() {
var elements = html5.elements;
return typeof elements == 'string' ? elements.split(' ') : elements;
}
/**
* Returns the data associated to the given document
* @private
* @param {Document} ownerDocument The document.
* @returns {Object} An object of data.
*/
function getExpandoData(ownerDocument) {
var data = expandoData[ownerDocument[expando]];
if (!data) {
data = {};
expanID++;
ownerDocument[expando] = expanID;
expandoData[expanID] = data;
}
return data;
}
/**
* returns a shived element for the given nodeName and document
* @memberOf html5
* @param {String} nodeName name of the element
* @param {Document} ownerDocument The context document.
* @returns {Object} The shived element.
*/
function createElement(nodeName, ownerDocument, data){
if (!ownerDocument) {
ownerDocument = document;
}
if(supportsUnknownElements){
return ownerDocument.createElement(nodeName);
}
if (!data) {
data = getExpandoData(ownerDocument);
}
var node;
if (data.cache[nodeName]) {
node = data.cache[nodeName].cloneNode();
} else if (saveClones.test(nodeName)) {
node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
} else {
node = data.createElem(nodeName);
}
return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
}
/**
* returns a shived DocumentFragment for the given document
* @memberOf html5
* @param {Document} ownerDocument The context document.
* @returns {Object} The shived DocumentFragment.
*/
function createDocumentFragment(ownerDocument, data){
if (!ownerDocument) {
ownerDocument = document;
}
if(supportsUnknownElements){
return ownerDocument.createDocumentFragment();
}
data = data || getExpandoData(ownerDocument);
var clone = data.frag.cloneNode(),
i = 0,
elems = getElements(),
l = elems.length;
for(;i<l;i++){
clone.createElement(elems[i]);
}
return clone;
}
/**
* Shivs the `createElement` and `createDocumentFragment` methods of the document.
* @private
* @param {Document|DocumentFragment} ownerDocument The document.
* @param {Object} data of the document.
*/
function shivMethods(ownerDocument, data) {
if (!data.cache) {
data.cache = {};
data.createElem = ownerDocument.createElement;
data.createFrag = ownerDocument.createDocumentFragment;
data.frag = data.createFrag();
}
ownerDocument.createElement = function(nodeName) {
if (!html5.shivMethods) {
return data.createElem(nodeName);
}
return createElement(nodeName, ownerDocument, data);
};
ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
'var n=f.cloneNode(),c=n.createElement;' +
'h.shivMethods&&(' +
getElements().join().replace(/[\w\-]+/g, function(nodeName) {
data.createElem(nodeName);
data.frag.createElement(nodeName);
return 'c("' + nodeName + '")';
}) +
');return n}'
)(html5, data.frag);
}
/*--------------------------------------------------------------------------*/
/**
* Shivs the given document.
* @memberOf html5
* @param {Document} ownerDocument The document to shiv.
* @returns {Document} The shived document.
*/
function shivDocument(ownerDocument) {
if (!ownerDocument) {
ownerDocument = document;
}
var data = getExpandoData(ownerDocument);
if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
data.hasCSS = !!addStyleSheet(ownerDocument,
'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
'mark{background:#FF0;color:#000}' +
'template{display:none}'
);
}
if (!supportsUnknownElements) {
shivMethods(ownerDocument, data);
}
return ownerDocument;
}
/*--------------------------------------------------------------------------*/
/**
* The `html5` object is exposed so that more elements can be shived and
* existing shiving can be detected on iframes.
* @type Object
* @example
*
* // options can be changed before the script is included
* html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
*/
var html5 = {
/**
* An array or space separated string of node names of the elements to shiv.
* @memberOf html5
* @type Array|String
*/
'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',
/**
* current version of html5shiv
*/
'version': version,
/**
* A flag to indicate that the HTML5 style sheet should be inserted.
* @memberOf html5
* @type Boolean
*/
'shivCSS': (options.shivCSS !== false),
/**
* Is equal to true if a browser supports creating unknown/HTML5 elements
* @memberOf html5
* @type boolean
*/
'supportsUnknownElements': supportsUnknownElements,
/**
* A flag to indicate that the document's `createElement` and `createDocumentFragment`
* methods should be overwritten.
* @memberOf html5
* @type Boolean
*/
'shivMethods': (options.shivMethods !== false),
/**
* A string to describe the type of `html5` object ("default" or "default print").
* @memberOf html5
* @type String
*/
'type': 'default',
'shivDocument': shivDocument,
createElement: createElement,
createDocumentFragment: createDocumentFragment
};
/*--------------------------------------------------------------------------*/
window.html5 = html5;
shivDocument(document);
}(this, document));
/*>>shiv*/
Modernizr._version      = version;
/*>>prefixes*/
Modernizr._prefixes     = prefixes;
/*>>prefixes*/
/*>>domprefixes*/
Modernizr._domPrefixes  = domPrefixes;
Modernizr._cssomPrefixes  = cssomPrefixes;
/*>>domprefixes*/
/*>>mq*/
Modernizr.mq            = testMediaQuery;
/*>>mq*/
/*>>hasevent*/
Modernizr.hasEvent      = isEventSupported;
/*>>hasevent*/
/*>>testprop*/
Modernizr.testProp      = function(prop){
return testProps([prop]);
};
/*>>testprop*/
/*>>testallprops*/
Modernizr.testAllProps  = testPropsAll;
/*>>testallprops*/
/*>>teststyles*/
Modernizr.testStyles    = injectElementWithStyles;
/*>>teststyles*/
/*>>prefixed*/
Modernizr.prefixed      = function(prop, obj, elem){
if(!obj) {
return testPropsAll(prop, 'pfx');
} else {
return testPropsAll(prop, obj, elem);
}
};
/*>>prefixed*/
/*>>cssclasses*/
docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +
(enableClasses ? ' js ' + classes.join(' ') : '');
/*>>cssclasses*/
return Modernizr;
})(this, this.document);/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,n);o=void 0===o?l:o}),void 0!==o?o:t}function h(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return u(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),n+=r?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;h>e;e++){var i=u[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s.isBoxSizeOuter=r=200==t(o.width),i.removeChild(e)}}function s(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=n(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;h>l;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=h[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=this.layout.size,r=-1!=n.indexOf("%")?parseFloat(n)/100*s.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*s.height:parseInt(o,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var u=n?"paddingTop":"paddingBottom",h=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),s=parseInt(e,10),r=o===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-n,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,f[o]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;n.extend(c,e.prototype),c.option=function(t){n.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=e[o],r=new i(s,this);n.push(r)}return n},c._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){r++,r==s&&i()}var o=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,n)})},c.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),s={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return s},c.handleEvent=n.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype,o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return o.forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n,a=r&&1>r?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),s=Math.min.apply(Math,o),r=o.indexOf(s),a={x:this.columnWidth*r,y:s},u=s+t.size.outerHeight,h=this.cols+1-o.length,d=0;h>d;d++)this.colYs[r+d]=u;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),s=o?n.left:n.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?n.top:n.bottom)+i.outerHeight,l=a;u>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope/js/item"),require("isotope/js/layout-mode"),require("isotope/js/layout-modes/masonry"),require("isotope/js/layout-modes/fit-rows"),require("isotope/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){function a(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||a>r){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var n=t[i];n.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?n.push(a):u||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},l.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&e>i;i++){var n=t[i];n.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),n=i[0],o=n.match(/^\[(.+)\]$/),s=o&&o[1],r=e(s,n),a=d.sortDataParsers[i[1]];
return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=a(e,this.options.sortAscending);this.filteredItems.sort(i),t!=this.sortHistory[0]&&this.sortHistory.unshift(t)}},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;o>i;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;o>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;o>i;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,n=0;i&&i>n;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});// Carousel
(function(theme, $) {
theme = theme || {};
var instanceName = '__carousel';
var PluginCarousel = function($el, opts) {
return this.initialize($el, opts);
};
PluginCarousel.defaults = {
loop: true,
responsive: {
0: {
items: 1
},
479: {
items: 1
},
768: {
items: 2
},
979: {
items: 3
},
1199: {
items: 4
}
},
navText: []
};
PluginCarousel.prototype = {
initialize: function($el, opts) {
if ($el.data(instanceName)) {
return this;
}
this.$el = $el;
this
.setData()
.setOptions(opts)
.build();
return this;
},
setData: function() {
this.$el.data(instanceName, this);
return this;
},
setOptions: function(opts) {
this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
wrapper: this.$el
});
return this;
},
build: function() {
if (!($.isFunction($.fn.owlCarousel))) {
return this;
}
var self = this,
$el = this.options.wrapper;
$el.addClass('owl-theme');
if ($('html').attr('dir') == 'rtl') {
this.options = $.extend(true, {}, this.options, {
rtl: true
});
}
if (this.options.items == 1) {
this.options.responsive = {}
}
if (this.options.items > 4) {
this.options = $.extend(true, {}, this.options, {
responsive: {
1199: {
items: this.options.items
}
}
});
}
if (this.options.autoHeight) {
$(window).afterResize(function() {
$el.find('.owl-stage-outer').height( $el.find('.owl-item.active').height() );
});
$(window).load(function() {
$el.find('.owl-stage-outer').height( $el.find('.owl-item.active').height() );
});
}
$el.owlCarousel(this.options).addClass("owl-carousel-init");
return this;
}
};
$.extend(theme, {
PluginCarousel: PluginCarousel
});
$.fn.themePluginCarousel = function(opts) {
return this.map(function() {
var $this = $(this);
if ($this.data(instanceName)) {
return $this.data(instanceName);
} else {
return new PluginCarousel($this, opts);
}
});
}
}).apply(this, [window.theme, jQuery]);
(function($) {
'use strict';
if ($.isFunction($.fn['themePluginCarousel'])) {
$(function() {
$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCarousel(opts);
});
});
}
}).apply(this, [jQuery]);/**
* Plugin Name: Count To
* Written by: Matt Huggins - https://github.com/mhuggins/jquery-countTo
*/
(function ($) {
$.fn.countTo = function (options) {
options = options || {};
return $(this).each(function () {
var settings = $.extend({}, $.fn.countTo.defaults, {
from:            $(this).data('from'),
to:              $(this).data('to'),
speed:           $(this).data('speed'),
refreshInterval: $(this).data('refresh-interval'),
decimals:        $(this).data('decimals')
}, options);
var loops = Math.ceil(settings.speed / settings.refreshInterval),
increment = (settings.to - settings.from) / loops;
var self = this,
$self = $(this),
loopCount = 0,
value = settings.from,
data = $self.data('countTo') || {};
$self.data('countTo', data);
if (data.interval) {
clearInterval(data.interval);
}
data.interval = setInterval(updateTimer, settings.refreshInterval);
render(value);
function updateTimer() {
value += increment;
loopCount++;
render(value);
if (typeof(settings.onUpdate) == 'function') {
settings.onUpdate.call(self, value);
}
if (loopCount >= loops) {
$self.removeData('countTo');
clearInterval(data.interval);
value = settings.to;
if (typeof(settings.onComplete) == 'function') {
settings.onComplete.call(self, value);
}
}
}
function render(value) {
var formattedValue = settings.formatter.call(self, value, settings);
$self.html(formattedValue);
}
});
};
$.fn.countTo.defaults = {
from: 0,               // the number the element should start at
to: 0,                 // the number the element should end at
speed: 1000,           // how long it should take to count between the target numbers
refreshInterval: 100,  // how often the element should be updated
decimals: 0,           // the number of decimal places to show
formatter: formatter,  // handler for formatting the value before rendering
onUpdate: null,        // callback method for every time the element is updated
onComplete: null       // callback method for when the element finishes updating
};
function formatter(value, settings) {
return value.toFixed(settings.decimals);
}
}(jQuery));
/**
* Counter Module.
* Dependencies - jQuery Count To Plugin - https://github.com/mhuggins/jquery-countTo
*/
(function(theme, $) {
theme = theme || {};
var instanceName = '__counter';
var PluginCounter = function($el, opts) {
return this.initialize($el, opts);
};
PluginCounter.defaults = {
accX: 0,
accY: 0,
speed: 3000,
refreshInterval: 100,
decimals: 0,
onUpdate: null,
onComplete: null
};
PluginCounter.prototype = {
initialize: function($el, opts) {
if ($el.data(instanceName)) {
return this;
}
this.$el = $el;
this
.setData()
.setOptions(opts)
.build();
return this;
},
setData: function() {
this.$el.data(instanceName, this);
return this;
},
setOptions: function(opts) {
this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
wrapper: this.$el
});
return this;
},
build: function() {
if (!($.isFunction($.fn.countTo))) {
return this;
}
var self = this,
$el = this.options.wrapper;
$.extend(self.options, {
onComplete: function() {
if ($el.data('append')) {
$el.html($el.html() + $el.data('append'));
}
if ($el.data('prepend')) {
$el.html($el.data('prepend') + $el.html());
}
}
});
$el.appear(function() {
$el.countTo(self.options);
}, {
accX: self.options.accX,
accY: self.options.accY
});
return this;
}
};
$.extend(theme, {
PluginCounter: PluginCounter
});
$.fn.themePluginCounter = function(opts) {
return this.map(function() {
var $this = $(this);
if ($this.data(instanceName)) {
return $this.data(instanceName);
} else {
return new PluginCounter($this, opts);
}
});
}
}).apply(this, [window.theme, jQuery]);
(function($) {
'use strict';
if ($.isFunction($.fn['themePluginCounter'])) {
$(function() {
$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCounter(opts);
});
});
}
}).apply(this, [jQuery]);jQuery(function($) {
VideoModuleInitialize();
});
/**
* The function initialize the Video Module.
*/
function VideoModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-videos');
$($section).each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $isotopeFilter = $sectionThis.find('.filter');
/**
* Video Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-iframe:visible',						// Isotope Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
iframe: {
patterns: {
youtube: {
index: 'youtube.com/',
id: function(url) {
var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
if ( !matches || !matches[1] ) return null;
return matches[1];
},
src: '//www.youtube.com/embed/%id%?autoplay=1'
},
vimeo: {
index: 'vimeo.com/',
id: function(url) {
var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
if ( !matches || !matches[5] ) return null;
return matches[5];
},
src: '//player.vimeo.com/video/%id%?autoplay=1'
}
}
},
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
gallery_SetImageWidth($sectionThis);
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.s123-module-gallery .gallery-item-wrapper',
filter: '.all'
});
/**
* Fix Images Height & Position Problem - If the Isotope sort the images
* before they already load, there is a height & position images problem.
* Reproduce: Delete browser cache (images) >> Wizard >> Pages >> Gallery >> Edit >> Close.
* Explanations: http://blog.codebusters.pl/en/images-height-and-position-problem-masonry-isotope/
* Documentations: http://isotope.metafizzy.co/layout.html#imagesloaded
*/
$isotopeContainer.imagesLoaded().progress( function( instance, image ) {
$isotopeContainer.isotope('layout');
$(image.img).css({visibility:'visible'});
});
$isotopeFilter.find('a').click(function () {
var filter = $(this).attr('data-filter');
$isotopeContainer.isotope({ filter: filter });
$isotopeFilter.find('a').parent().removeClass('active');
$(this).parent().addClass('active');
return false;
});
$(window).resize(function (event) {
var $section = $('section.s123-module-videos');
$($section).each(function( index ) {
var $sectionThis	= $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
gallery_SetImageWidth($sectionThis);
});
});
});
});
}jQuery(function($) {
GalleryModuleInitialize();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.isotope-gallery:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $isotopeFilter = $sectionThis.find('.filter');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-image:visible',						// Isotope Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
gallery_SetImageWidth($sectionThis);
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.s123-module-gallery .gallery-item-wrapper'
});
if ( $isotopeFilter.length !== 0 ) {
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter($(this),$isotopeFilter.find('> li > a').first().attr('data-filter'));
}
});
}
/**
* Fix Images Height & Position Problem - If the Isotope sort the images
* before they already load, there is a height & position images problem.
* Reproduce: Delete browser cache (images) >> Wizard >> Pages >> Gallery >> Edit >> Close.
* Explanations: http://blog.codebusters.pl/en/images-height-and-position-problem-masonry-isotope/
* Documentations: http://isotope.metafizzy.co/layout.html#imagesloaded
*/
$isotopeContainer.imagesLoaded().progress( function( instance, image ) {
$isotopeContainer.isotope('layout');
$(image.img).css({visibility:'visible'});
});
$isotopeFilter.find('a').click(function () {
var filter = $(this).attr('data-filter');
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter($(this),filter);
}
});
$isotopeFilter.find('a').parent().removeClass('active');
$(this).parent().addClass('active');
return false;
});
$(window).resize(function (event) {
var $section = $('section.s123-module-gallery.isotope-gallery:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis	= $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
gallery_SetImageWidth($sectionThis);
});
});
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter( $item, filter ) {
return $item.attr('data-filter') == filter || filter == 's123-g-show-all';
}
function gallery_DecideNumberOfImageByScreenWidth($sectionThis) {
var screen = $sectionThis.find('.container').width();
if (screen<=400) {
return 1;
}
if (screen<=768) {
return 2;
}
if (screen<=992) {
return 3;
}
if (screen<=1600) {
return 3;
}
if (screen>1600) {
return 4;
}
}
function gallery_SetImageWidth($sectionThis) {
var imageWidth = Math.floor($sectionThis.find('.container').width()/gallery_DecideNumberOfImageByScreenWidth($sectionThis));
if ($sectionThis.hasClass('layout-1')) {
imageWidth = imageWidth - 10;
}
$sectionThis.find('.gallery-item-wrapper').width(imageWidth);
}jQuery(function($) {
GalleryModuleInitialize_Layout4();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout4() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-4:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
$categories.click(function () {
var $this = $(this);
$categories.removeClass('active');
$this.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $this.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $this.data('filter') + ']');
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
});
});
}jQuery(function($) {
GalleryModuleInitialize_Layout5();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout5() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-5:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
$categories.click(function () {
var $this = $(this);
$categories.removeClass('active');
$this.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $this.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $this.data('filter') + ']');
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
});
});
}/*!
* Flickity PACKAGED v1.2.1
* Touch, responsive, flickable galleries
*
* Licensed GPLv3 for open source use
* or Flickity Commercial License for commercial use
*
* http://flickity.metafizzy.co
* Copyright 2015 Metafizzy
*/
!function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if("string"==typeof o){for(var s=n.call(arguments,1),a=0,l=this.length;l>a;a++){var h=this[a],c=t.data(h,e);if(c)if(t.isFunction(c[o])&&"_"!==o.charAt(0)){var p=c[o].apply(c,s);if(void 0!==p)return p}else r("no such method '"+o+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; attempted to call '"+o+"'")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),o(t,e)},t.bridget}}var n=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i("object"==typeof exports?require("jquery"):t.jQuery)}(window),function(t){function e(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e){var i=n(t,e)?r:o;i(t,e)}var n,o,r;"classList"in document.documentElement?(n=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(n=function(t,i){return e(i).test(t.className)},o=function(t,e){n(t,e)||(t.className=t.className+" "+e)},r=function(t,i){t.className=t.className.replace(e(i)," ")});var s={hasClass:n,addClass:o,removeClass:r,toggleClass:i,has:n,add:o,remove:r,toggle:i};"function"==typeof define&&define.amd?define("classie/classie",s):"object"==typeof exports?module.exports=s:t.classie=s}(window),function(){"use strict";function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype,o=this,r=o.EventEmitter;n.getListeners=function(t){var e,i,n=this._getEvents();if(t instanceof RegExp){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),r="object"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&("function"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e){var i,n,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:o.EventEmitter=t}.call(this),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(n=function(t,i,n){t[i+n]=n.handleEvent?function(){var i=e(t);n.handleEvent.call(n,i)}:function(){var i=e(t);n.call(t,i)},t.attachEvent("on"+i,t[i+n])});var o=function(){};i.removeEventListener?o=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(o=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var r={bind:n,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(window),function(t){function e(t){if(t){if("string"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,"string"==typeof n[e])return e}}var i="Webkit Moz ms Ms O".split(" "),n=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t,e){function i(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function n(){}function o(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=a.length;i>e;e++){var n=a[e];t[n]=0}return t}function r(e){function n(){if(!d){d=!0;var n=t.getComputedStyle;if(h=function(){var t=n?function(t){return n(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||s("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),i}}(),c=e("boxSizing")){var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style[c]="border-box";var r=document.body||document.documentElement;r.appendChild(o);var a=h(o);p=200===i(a.width),r.removeChild(o)}}}function r(t){if(n(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var e=h(t);if("none"===e.display)return o();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var s=r.isBorderBox=!(!c||!e[c]||"border-box"!==e[c]),d=0,u=a.length;u>d;d++){var f=a[d],v=e[f];v=l(t,v);var y=parseFloat(v);r[f]=isNaN(y)?0:y}var g=r.paddingLeft+r.paddingRight,m=r.paddingTop+r.paddingBottom,b=r.marginLeft+r.marginRight,x=r.marginTop+r.marginBottom,S=r.borderLeftWidth+r.borderRightWidth,C=r.borderTopWidth+r.borderBottomWidth,w=s&&p,E=i(e.width);E!==!1&&(r.width=E+(w?0:g+S));var P=i(e.height);return P!==!1&&(r.height=P+(w?0:m+C)),r.innerWidth=r.width-(g+S),r.innerHeight=r.height-(m+C),r.outerWidth=r.width+b,r.outerHeight=r.height+x,r}}function l(e,i){if(t.getComputedStyle||-1===i.indexOf("%"))return i;var n=e.style,o=n.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),n.left=i,i=n.pixelLeft,n.left=o,s&&(r.left=s),i}var h,c,p,d=!1;return r}var s="undefined"==typeof console?n:function(t){console.error(t)},a=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],r):"object"==typeof exports?module.exports=r(require("desandro-get-style-property")):t.getSize=r(t.getStyleProperty)}(window),function(t){function e(t){"function"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==r.readyState;e.isReady||i||n()}function n(){e.isReady=!0;for(var t=0,i=s.length;i>t;t++){var n=s[t];n()}}function o(o){return"complete"===r.readyState?n():(o.bind(r,"DOMContentLoaded",i),o.bind(r,"readystatechange",i),o.bind(t,"load",i)),e}var r=t.document,s=[];e.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],o):"object"==typeof exports?module.exports=o(require("eventie")):t.docReady=o(t.eventie)}(window),function(t){"use strict";function e(t,e){return t[s](e)}function i(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){i(t);for(var n=t.parentNode.querySelectorAll(e),o=0,r=n.length;r>o;o++)if(n[o]===t)return!0;return!1}function o(t,n){return i(t),e(t,n)}var r,s=function(){if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0,n=e.length;n>i;i++){var o=e[i],r=o+"MatchesSelector";if(t[r])return r}}();if(s){var a=document.createElement("div"),l=e(a,"div");r=l?e:o}else r=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return r}):"object"==typeof exports?module.exports=r:window.matchesSelector=r}(Element.prototype),function(t,e){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("doc-ready"),require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.docReady,t.matchesSelector)}(window,function(t,e,i){var n={};n.extend=function(t,e){for(var i in e)t[i]=e[i];return t},n.modulo=function(t,e){return(t%e+e)%e};var o=Object.prototype.toString;n.isArray=function(t){return"[object Array]"==o.call(t)},n.makeArray=function(t){var e=[];if(n.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0,o=t.length;o>i;i++)e.push(t[i]);else e.push(t);return e},n.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1},n.removeFrom=function(t,e){var i=n.indexOf(t,e);-1!=i&&t.splice(i,1)},n.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},n.setText=function(){function t(t,i){e=e||(void 0!==document.documentElement.textContent?"textContent":"innerText"),t[e]=i}var e;return t}(),n.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,i(t,e))return t},n.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},n.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.filterFindElements=function(t,e){t=n.makeArray(t);for(var o=[],r=0,s=t.length;s>r;r++){var a=t[r];if(n.isElement(a))if(e){i(a,e)&&o.push(a);for(var l=a.querySelectorAll(e),h=0,c=l.length;c>h;h++)o.push(l[h])}else o.push(a)}return o},n.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},n.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var r=t.console;return n.htmlInit=function(i,o){e(function(){for(var e=n.toDashed(o),s=document.querySelectorAll(".js-"+e),a="data-"+e+"-options",l=0,h=s.length;h>l;l++){var c,p=s[l],d=p.getAttribute(a);try{c=d&&JSON.parse(d)}catch(u){r&&r.error("Error parsing "+a+" on "+p.nodeName.toLowerCase()+(p.id?"#"+p.id:"")+": "+u);continue}var f=new i(p,c),v=t.jQuery;v&&v.data(p,o,f)}})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n="attachEvent"in t;return i.prototype.create=function(){this.element.style.position="absolute",n&&this.element.setAttribute("unselectable","on"),this.x=0,this.shift=0},i.prototype.destroy=function(){this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},i.prototype.getSize=function(){this.size=e(this.element)},i.prototype.setPosition=function(t){this.x=t,this.setDefaultTarget(),this.renderPosition(t)},i.prototype.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},i.prototype.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},i.prototype.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},i.prototype.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/animate",["get-style-property/get-style-property","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("desandro-get-style-property"),require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.getStyleProperty,t.fizzyUIUtils))}(window,function(t,e,i){for(var n,o=0,r="webkit moz ms o".split(" "),s=t.requestAnimationFrame,a=t.cancelAnimationFrame,l=0;l<r.length&&(!s||!a);l++)n=r[l],s=s||t[n+"RequestAnimationFrame"],a=a||t[n+"CancelAnimationFrame"]||t[n+"CancelRequestAnimationFrame"];s&&a||(s=function(e){var i=(new Date).getTime(),n=Math.max(0,16-(i-o)),r=t.setTimeout(function(){e(i+n)},n);return o=i+n,r},a=function(e){t.clearTimeout(e)});var h={};h.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},h.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;s(function(){e.animate()})}};var c=e("transform"),p=!!e("perspective");return h.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=i.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&c?-t:t;var e=this.getPositionValue(t);c?this.slider.style[c]=p&&this.isAnimating?"translate3d("+e+",0,0)":"translateX("+e+")":this.slider.style[this.originSide]=e},h.positionSliderAtSelected=function(){if(this.cells.length){var t=this.cells[this.selectedIndex];this.x=-t.target,this.positionSlider()}},h.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},h.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,p&&this.positionSlider(),this.dispatchEvent("settle"))},h.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},h._shiftCells=function(t,e,i){for(var n=0,o=t.length;o>n;n++){var r=t[n],s=e>0?i:0;r.wrapShift(s),e-=r.size.outerWidth}},h._unshiftCells=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++)t[e].wrapShift(0)},h.integratePhysics=function(){this.velocity+=this.accel,this.x+=this.velocity,this.velocity*=this.getFrictionFactor(),this.accel=0},h.applyForce=function(t){this.accel+=t},h.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},h.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},h.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},h.applySelectedAttraction=function(){var t=this.cells.length;if(!this.isPointerDown&&!this.isFreeScrolling&&t){var e=this.cells[this.selectedIndex],i=this.options.wrapAround&&t>1?this.slideableWidth*Math.floor(this.selectedIndex/t):0,n=-1*(e.target+i)-this.x,o=n*this.options.selectedAttraction;this.applyForce(o)}},h}),function(t,e){"use strict";if("function"==typeof define&&define.amd)define("flickity/js/flickity",["classie/classie","eventEmitter/EventEmitter","eventie/eventie","get-size/get-size","fizzy-ui-utils/utils","./cell","./animate"],function(i,n,o,r,s,a,l){return e(t,i,n,o,r,s,a,l)});else if("object"==typeof exports)module.exports=e(t,require("desandro-classie"),require("wolfy87-eventemitter"),require("eventie"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.classie,t.EventEmitter,t.eventie,t.getSize,t.fizzyUIUtils,i.Cell,i.animatePrototype)}}(window,function(t,e,i,n,o,r,s,a){function l(t,e){for(t=r.makeArray(t);t.length;)e.appendChild(t.shift())}function h(t,e){var i=r.getQueryElement(t);return i?(this.element=i,c&&(this.$element=c(this.element)),this.options=r.extend({},this.constructor.defaults),this.option(e),void this._create()):void(d&&d.error("Bad element for Flickity: "+(i||t)))}var c=t.jQuery,p=t.getComputedStyle,d=t.console,u=0,f={};h.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},h.createMethods=[],r.extend(h.prototype,i.prototype),h.prototype._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.accel=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",h.setUnselectable(this.viewport),this._createSlider(),(this.options.resize||this.options.watchCSS)&&(n.bind(t,"resize",this),this.isResizeBound=!0);for(var i=0,o=h.createMethods.length;o>i;i++){var r=h.createMethods[i];this[r]()}this.options.watchCSS?this.watchCSS():this.activate()},h.prototype.option=function(t){r.extend(this.options,t)},h.prototype.activate=function(){if(!this.isActive){this.isActive=!0,e.add(this.element,"flickity-enabled"),this.options.rightToLeft&&e.add(this.element,"flickity-rtl"),this.getSize();var t=this._filterFindCellElements(this.element.children);l(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,n.bind(this.element,"keydown",this)),this.emit("activate");var i,o=this.options.initialIndex;i=this.isInitActivated?this.selectedIndex:void 0!==o&&this.cells[o]?o:0,this.select(i,!1,!0),this.isInitActivated=!0}},h.prototype._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},h.prototype._filterFindCellElements=function(t){return r.filterFindElements(t,this.options.cellSelector)},h.prototype.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},h.prototype._makeCells=function(t){for(var e=this._filterFindCellElements(t),i=[],n=0,o=e.length;o>n;n++){var r=e[n],a=new s(r,this);i.push(a)}return i},h.prototype.getLastCell=function(){return this.cells[this.cells.length-1]},h.prototype.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},h.prototype._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n,o=this.cells.length,r=t;o>r;r++)n=this.cells[r],n.setPosition(e),e+=n.size.outerWidth,this.maxCellHeight=Math.max(n.size.outerHeight,this.maxCellHeight);this.slideableWidth=e,this._containCells()},h.prototype._sizeCells=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];n.getSize()}},h.prototype._init=h.prototype.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},h.prototype.getSize=function(){this.size=o(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};h.prototype.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},h.prototype.setGallerySize=function(){this.options.setGallerySize&&(this.viewport.style.height=this.maxCellHeight+"px")},h.prototype._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},h.prototype._getGapCells=function(t,e,i){for(var n=[];t>0;){var o=this.cells[e];if(!o)break;n.push(o),e+=i,t-=o.size.outerWidth}return n},h.prototype._containCells=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length)for(var t=this.options.rightToLeft?"marginRight":"marginLeft",e=this.options.rightToLeft?"marginLeft":"marginRight",i=this.cells[0].size[t],n=this.getLastCell(),o=this.slideableWidth-n.size[e],r=o-this.size.innerWidth*(1-this.cellAlign),s=o<this.size.innerWidth,a=0,l=this.cells.length;l>a;a++){var h=this.cells[a];h.setDefaultTarget(),s?h.target=o*this.cellAlign:(h.target=Math.max(h.target,this.cursorPosition+i),h.target=Math.min(h.target,r))}},h.prototype.dispatchEvent=function(t,e,i){var n=[e].concat(i);if(this.emitEvent(t,n),c&&this.$element)if(e){var o=c.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},h.prototype.select=function(t,e,i){if(this.isActive){t=parseInt(t,10);var n=this.cells.length;this.options.wrapAround&&n>1&&(0>t?this.x-=this.slideableWidth:t>=n&&(this.x+=this.slideableWidth)),(this.options.wrapAround||e)&&(t=r.modulo(t,n)),this.cells[t]&&(this.selectedIndex=t,this.setSelectedCell(),i?this.positionSliderAtSelected():this.startAnimation(),this.dispatchEvent("cellSelect"))}},h.prototype.previous=function(t){this.select(this.selectedIndex-1,t)},h.prototype.next=function(t){this.select(this.selectedIndex+1,t)},h.prototype.setSelectedCell=function(){this._removeSelectedCellClass(),this.selectedCell=this.cells[this.selectedIndex],this.selectedElement=this.selectedCell.element,e.add(this.selectedElement,"is-selected")},h.prototype._removeSelectedCellClass=function(){this.selectedCell&&e.remove(this.selectedCell.element,"is-selected")},h.prototype.getCell=function(t){for(var e=0,i=this.cells.length;i>e;e++){var n=this.cells[e];if(n.element==t)return n}},h.prototype.getCells=function(t){t=r.makeArray(t);for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],s=this.getCell(o);s&&e.push(s)}return e},h.prototype.getCellElements=function(){for(var t=[],e=0,i=this.cells.length;i>e;e++)t.push(this.cells[e].element);return t},h.prototype.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=r.getParent(t,".flickity-slider > *"),this.getCell(t))},h.prototype.getAdjacentCellElements=function(t,e){if(!t)return[this.selectedElement];e=void 0===e?this.selectedIndex:e;var i=this.cells.length;if(1+2*t>=i)return this.getCellElements();for(var n=[],o=e-t;e+t>=o;o++){var s=this.options.wrapAround?r.modulo(o,i):o,a=this.cells[s];a&&n.push(a.element)}return n},h.prototype.uiChange=function(){this.emit("uiChange")},h.prototype.childUIPointerDown=function(t){this.emitEvent("childUIPointerDown",[t])},h.prototype.onresize=function(){this.watchCSS(),this.resize()},r.debounceMethod(h,"onresize",150),h.prototype.resize=function(){this.isActive&&(this.getSize(),this.options.wrapAround&&(this.x=r.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.positionSliderAtSelected())};var y=h.supportsConditionalCSS=function(){var t;return function(){if(void 0!==t)return t;if(!p)return void(t=!1);var e=document.createElement("style"),i=document.createTextNode('body:after { content: "foo"; display: none; }');e.appendChild(i),document.head.appendChild(e);var n=p(document.body,":after").content;return t=-1!=n.indexOf("foo"),document.head.removeChild(e),t}}();h.prototype.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=y();if(!e){var i="fallbackOn"==t?"activate":"deactivate";return void this[i]()}var n=p(this.element,":after").content;-1!=n.indexOf("flickity")?this.activate():this.deactivate()}},h.prototype.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?"next":"previous";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?"previous":"next";this.uiChange(),this[i]()}},h.prototype.deactivate=function(){if(this.isActive){e.remove(this.element,"flickity-enabled"),e.remove(this.element,"flickity-rtl");for(var t=0,i=this.cells.length;i>t;t++){var o=this.cells[t];o.destroy()}this._removeSelectedCellClass(),this.element.removeChild(this.viewport),l(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),n.unbind(this.element,"keydown",this)),this.isActive=!1,this.emit("deactivate")}},h.prototype.destroy=function(){this.deactivate(),this.isResizeBound&&n.unbind(t,"resize",this),this.emit("destroy"),c&&this.$element&&c.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete f[this.guid]},r.extend(h.prototype,a);var g="attachEvent"in t;return h.setUnselectable=function(t){g&&t.setAttribute("unselectable","on")},h.data=function(t){t=r.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},r.htmlInit(h,"flickity"),c&&c.bridget&&c.bridget("flickity",h),h.Cell=s,h}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("unipointer/unipointer",["eventEmitter/EventEmitter","eventie/eventie"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("wolfy87-eventemitter"),require("eventie")):t.Unipointer=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,i){function n(){}function o(){}o.prototype=new e,o.prototype.bindStartEvent=function(t){this._bindStartEvent(t,!0)},o.prototype.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},o.prototype._bindStartEvent=function(e,n){n=void 0===n?!0:!!n;var o=n?"bind":"unbind";t.navigator.pointerEnabled?i[o](e,"pointerdown",this):t.navigator.msPointerEnabled?i[o](e,"MSPointerDown",this):(i[o](e,"mousedown",this),i[o](e,"touchstart",this))},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.getTouch=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];if(n.identifier==this.pointerIdentifier)return n}},o.prototype.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},o.prototype.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},o.prototype.onMSPointerDown=o.prototype.onpointerdown=function(t){this._pointerDown(t,t)},o.prototype._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},o.prototype.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var r={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return o.prototype._bindPostStartEvents=function(e){if(e){for(var n=r[e.type],o=e.preventDefault?t:document,s=0,a=n.length;a>s;s++){var l=n[s];i.bind(o,l,this)}this._boundPointerEvents={events:n,node:o}}},o.prototype._unbindPostStartEvents=function(){var t=this._boundPointerEvents;if(t&&t.events){for(var e=0,n=t.events.length;n>e;e++){var o=t.events[e];i.unbind(t.node,o,this)}delete this._boundPointerEvents}},o.prototype.onmousemove=function(t){this._pointerMove(t,t)},o.prototype.onMSPointerMove=o.prototype.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},o.prototype.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},o.prototype._pointerMove=function(t,e){this.pointerMove(t,e)},o.prototype.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},o.prototype.onmouseup=function(t){this._pointerUp(t,t)},o.prototype.onMSPointerUp=o.prototype.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},o.prototype.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},o.prototype._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},o.prototype.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},o.prototype._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},o.prototype.pointerDone=n,o.prototype.onMSPointerCancel=o.prototype.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},o.prototype.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},o.prototype._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},o.prototype.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},o.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("unidragger/unidragger",["eventie/eventie","unipointer/unipointer"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("unipointer")):t.Unidragger=e(t,t.eventie,t.Unipointer)}(window,function(t,e,i){function n(){}function o(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function r(){}function s(){return!1}r.prototype=new i,r.prototype.bindHandles=function(){this._bindHandles(!0)},r.prototype.unbindHandles=function(){this._bindHandles(!1)};var a=t.navigator;r.prototype._bindHandles=function(t){t=void 0===t?!0:!!t;var i;i=a.pointerEnabled?function(e){e.style.touchAction=t?"none":""}:a.msPointerEnabled?function(e){e.style.msTouchAction=t?"none":""}:function(){t&&h(s)};for(var n=t?"bind":"unbind",o=0,r=this.handles.length;r>o;o++){var s=this.handles[o];this._bindStartEvent(s,t),i(s),e[n](s,"click",this)}};var l="attachEvent"in document.documentElement,h=l?function(t){"IMG"==t.nodeName&&(t.ondragstart=s);for(var e=t.querySelectorAll("img"),i=0,n=e.length;n>i;i++){var o=e[i];o.ondragstart=s}}:n;r.prototype.pointerDown=function(i,n){if("INPUT"==i.target.nodeName&&"range"==i.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(i,n);var o=document.activeElement;o&&o.blur&&o.blur(),this._bindPostStartEvents(i),this.pointerDownScroll=r.getScrollPosition(),e.bind(t,"scroll",this),this.emitEvent("pointerDown",[i,n])},r.prototype._dragPointerDown=function(t,e){this.pointerDownPoint=i.getPointerPoint(e);var n="touchstart"==t.type,r=t.target.nodeName;n||"SELECT"==r||o(t)},r.prototype.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},r.prototype._dragPointerMove=function(t,e){var n=i.getPointerPoint(e),o={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(o)&&this._dragStart(t,e),o},r.prototype.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},r.prototype.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},r.prototype._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},r.prototype.pointerDone=function(){e.unbind(t,"scroll",this)},r.prototype._dragStart=function(t,e){
this.isDragging=!0,this.dragStartPoint=r.getPointerPoint(e),this.isPreventingClicks=!0,this.dragStart(t,e)},r.prototype.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},r.prototype._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},r.prototype.dragMove=function(t,e,i){o(t),this.emitEvent("dragMove",[t,e,i])},r.prototype._dragEnd=function(t,e){this.isDragging=!1;var i=this;setTimeout(function(){delete i.isPreventingClicks}),this.dragEnd(t,e)},r.prototype.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},r.prototype.pointerDone=function(){e.unbind(t,"scroll",this),delete this.pointerDownScroll},r.prototype.onclick=function(t){this.isPreventingClicks&&o(t)},r.prototype._staticClick=function(t,e){if(!this.isIgnoringMouseUp||"mouseup"!=t.type){var i=t.target.nodeName;if(("INPUT"==i||"TEXTAREA"==i)&&t.target.focus(),this.staticClick(t,e),"mouseup"!=t.type){this.isIgnoringMouseUp=!0;var n=this;setTimeout(function(){delete n.isIgnoringMouseUp},400)}}},r.prototype.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},r.prototype.onscroll=function(){var t=r.getScrollPosition(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},r.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}};var c=void 0!==t.pageYOffset;return r.getScrollPosition=function(){return{x:c?t.pageXOffset:document.body.scrollLeft,y:c?t.pageYOffset:document.body.scrollTop}},r.getPointerPoint=i.getPointerPoint,r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/drag",["classie/classie","eventie/eventie","./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,o,r,s){return e(t,i,n,o,r,s)}):"object"==typeof exports?module.exports=e(t,require("desandro-classie"),require("eventie"),require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.classie,t.eventie,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n,o,r){function s(t){t.preventDefault?t.preventDefault():t.returnValue=!1}r.extend(n.defaults,{draggable:!0}),n.createMethods.push("_createDrag"),r.extend(n.prototype,o.prototype),n.prototype._createDrag=function(){this.on("activate",this.bindDrag),this.on("uiChange",this._uiChangeDrag),this.on("childUIPointerDown",this._childUIPointerDownDrag),this.on("deactivate",this.unbindDrag)},n.prototype.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(e.add(this.element,"is-draggable"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},n.prototype.unbindDrag=function(){this.isDragBound&&(e.remove(this.element,"is-draggable"),this.unbindHandles(),delete this.isDragBound)},n.prototype._uiChangeDrag=function(){delete this.isFreeScrolling},n.prototype._childUIPointerDownDrag=function(t){s(t),this.pointerDownFocus(t)},n.prototype.pointerDown=function(n,r){if("INPUT"==n.target.nodeName&&"range"==n.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(n,r);var s=document.activeElement;s&&s.blur&&s!=this.element&&s!=document.body&&s.blur(),this.pointerDownFocus(n),this.dragX=this.x,e.add(this.viewport,"is-pointer-down"),this._bindPostStartEvents(n),this.pointerDownScroll=o.getScrollPosition(),i.bind(t,"scroll",this),this.dispatchEvent("pointerDown",n,[r])};var a={touchstart:!0,MSPointerDown:!0},l={INPUT:!0,SELECT:!0};return n.prototype.pointerDownFocus=function(e){if(this.options.accessibility&&!a[e.type]&&!l[e.target.nodeName]){var i=t.pageYOffset;this.element.focus(),t.pageYOffset!=i&&t.scrollTo(t.pageXOffset,i)}},n.prototype.hasDragStarted=function(t){return Math.abs(t.x)>3},n.prototype.pointerUp=function(t,i){e.remove(this.viewport,"is-pointer-down"),this.dispatchEvent("pointerUp",t,[i]),this._dragPointerUp(t,i)},n.prototype.pointerDone=function(){i.unbind(t,"scroll",this),delete this.pointerDownScroll},n.prototype.dragStart=function(t,e){this.dragStartPosition=this.x,this.startAnimation(),this.dispatchEvent("dragStart",t,[e])},n.prototype.dragMove=function(t,e,i){s(t),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,o=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.cells.length){var r=Math.max(-this.cells[0].target,this.dragStartPosition);o=o>r?.5*(o+r):o;var a=Math.min(-this.getLastCell().target,this.dragStartPosition);o=a>o?.5*(o+a):o}this.dragX=o,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])},n.prototype.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.cells[0].target&&-n<this.getLastCell().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.select(i),this.dispatchEvent("dragEnd",t,[e])},n.prototype.dragEndRestingSelect=function(){var t=this.getRestingPosition(),e=Math.abs(this.getCellDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),o=i.distance<n.distance?i.index:n.index;return o},n.prototype._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,o=1/0,r=this.options.contain&&!this.options.wrapAround?function(t,e){return e>=t}:function(t,e){return e>t};r(e,o)&&(n+=i,o=e,e=this.getCellDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:o,index:n-i}},n.prototype.getCellDistance=function(t,e){var i=this.cells.length,n=this.options.wrapAround&&i>1,o=n?r.modulo(e,i):e,s=this.cells[o];if(!s)return null;var a=n?this.slideableWidth*Math.floor(e/i):0;return t-(s.target+a)},n.prototype.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getCellDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:0>t&&0>e?-1:0},n.prototype.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,o=i&&r.indexOf(this.cells,i);this.dispatchEvent("staticClick",t,[e,n,o])},n}),function(t,e){"function"==typeof define&&define.amd?define("tap-listener/tap-listener",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof exports?module.exports=e(t,require("unipointer")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){this.bindTap(t)}i.prototype=new e,i.prototype.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},i.prototype.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)};var n=void 0!==t.pageYOffset;return i.prototype.pointerUp=function(i,o){if(!this.isIgnoringMouseUp||"mouseup"!=i.type){var r=e.getPointerPoint(o),s=this.tapElement.getBoundingClientRect(),a=n?t.pageXOffset:document.body.scrollLeft,l=n?t.pageYOffset:document.body.scrollTop,h=r.x>=s.left+a&&r.x<=s.right+a&&r.y>=s.top+l&&r.y<=s.bottom+l;h&&this.emitEvent("tap",[i,o]),"mouseup"!=i.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),320))}},i.prototype.destroy=function(){this.pointerDone(),this.unbindTap()},i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["eventie/eventie","./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.eventie,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n,o){function r(t,e){this.direction=t,this.parent=e,this._create()}function s(t){return"string"==typeof t?t:"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}var a="http://www.w3.org/2000/svg",l=function(){function t(){if(void 0!==e)return e;var t=document.createElement("div");return t.innerHTML="<svg/>",e=(t.firstChild&&t.firstChild.namespaceURI)==a}var e;return t}();return r.prototype=new n,r.prototype._create=function(){this.isEnabled=!0,this.isPrevious=-1==this.direction;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");if(e.className="flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"previous":"next"),i.setUnselectable(e),l()){var n=this.createSVG();e.appendChild(n)}else this.setArrowText(),e.className+=" no-svg";var o=this;this.onCellSelect=function(){o.update()},this.parent.on("cellSelect",this.onCellSelect),this.on("tap",this.onTap),this.on("pointerDown",function(t,e){o.parent.childUIPointerDown(e)})},r.prototype.activate=function(){this.bindTap(this.element),e.bind(this.element,"click",this),this.parent.element.appendChild(this.element)},r.prototype.deactivate=function(){this.parent.element.removeChild(this.element),n.prototype.destroy.call(this),e.unbind(this.element,"click",this)},r.prototype.createSVG=function(){var t=document.createElementNS(a,"svg");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(a,"path"),i=s(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},r.prototype.setArrowText=function(){var t=this.parent.options,e=this.isLeft?t.leftArrowText:t.rightArrowText;o.setText(this.element,e)},r.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},r.prototype.handleEvent=o.handleEvent,r.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},r.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},r.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},r.prototype.update=function(){var t=this.parent.cells;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?"disable":"enable";this[n]()},r.prototype.destroy=function(){this.deactivate()},o.extend(i.defaults,{prevNextButtons:!0,leftArrowText:"‹",rightArrowText:"›",arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),i.createMethods.push("_createPrevNextButtons"),i.prototype._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new r(-1,this),this.nextButton=new r(1,this),this.on("activate",this.activatePrevNextButtons))},i.prototype.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},i.prototype.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},i.PrevNextButton=r,i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/page-dots",["eventie/eventie","./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof exports?module.exports=e(t,require("eventie"),require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.eventie,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n,o){function r(t){this.parent=t,this._create()}return r.prototype=new n,r.prototype._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",i.setUnselectable(this.holder),this.dots=[];var t=this;this.onCellSelect=function(){t.updateSelected()},this.parent.on("cellSelect",this.onCellSelect),this.on("tap",this.onTap),this.on("pointerDown",function(e,i){t.parent.childUIPointerDown(i)})},r.prototype.activate=function(){this.setDots(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},r.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),n.prototype.destroy.call(this)},r.prototype.setDots=function(){var t=this.parent.cells.length-this.dots.length;t>0?this.addDots(t):0>t&&this.removeDots(-t)},r.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement("li");n.className="dot",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},r.prototype.removeDots=function(t){for(var e=this.dots.splice(this.dots.length-t,t),i=0,n=e.length;n>i;i++){var o=e[i];this.holder.removeChild(o)}},r.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected")},r.prototype.onTap=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=o.indexOf(this.dots,e);this.parent.select(i)}},r.prototype.destroy=function(){this.deactivate()},i.PageDots=r,o.extend(i.defaults,{pageDots:!0}),i.createMethods.push("_createPageDots"),i.prototype._createPageDots=function(){this.options.pageDots&&(this.pageDots=new r(this),this.on("activate",this.activatePageDots),this.on("cellAddedRemoved",this.onCellAddedRemovedPageDots),this.on("deactivate",this.deactivatePageDots))},i.prototype.activatePageDots=function(){this.pageDots.activate()},i.prototype.onCellAddedRemovedPageDots=function(){this.pageDots.setDots()},i.prototype.deactivatePageDots=function(){this.pageDots.deactivate()},i.PageDots=r,i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/player",["eventEmitter/EventEmitter","eventie/eventie","fizzy-ui-utils/utils","./flickity"],function(t,i,n,o){return e(t,i,n,o)}):"object"==typeof exports?module.exports=e(require("wolfy87-eventemitter"),require("eventie"),require("fizzy-ui-utils"),require("./flickity")):e(t.EventEmitter,t.eventie,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i,n){function o(t){if(this.parent=t,this.state="stopped",s){var e=this;this.onVisibilityChange=function(){e.visibilityChange()}}}var r,s;return"hidden"in document?(r="hidden",s="visibilitychange"):"webkitHidden"in document&&(r="webkitHidden",s="webkitvisibilitychange"),o.prototype=new t,o.prototype.play=function(){"playing"!=this.state&&(this.state="playing",s&&document.addEventListener(s,this.onVisibilityChange,!1),this.tick())},o.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},o.prototype.stop=function(){this.state="stopped",this.clear(),s&&document.removeEventListener(s,this.onVisibilityChange,!1)},o.prototype.clear=function(){clearTimeout(this.timeout)},o.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},o.prototype.unpause=function(){"paused"==this.state&&this.play()},o.prototype.visibilityChange=function(){var t=document[r];this[t?"pause":"unpause"]()},i.extend(n.defaults,{pauseAutoPlayOnHover:!0}),n.createMethods.push("_createPlayer"),n.prototype._createPlayer=function(){this.player=new o(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},n.prototype.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),e.bind(this.element,"mouseenter",this),this.isMouseenterBound=!0)},n.prototype.playPlayer=function(){this.player.play()},n.prototype.stopPlayer=function(){this.player.stop()},n.prototype.pausePlayer=function(){this.player.pause()},n.prototype.unpausePlayer=function(){this.player.unpause()},n.prototype.deactivatePlayer=function(){this.player.stop(),this.isMouseenterBound&&(e.unbind(this.element,"mouseenter",this),delete this.isMouseenterBound)},n.prototype.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),e.bind(this.element,"mouseleave",this))},n.prototype.onmouseleave=function(){this.player.unpause(),e.unbind(this.element,"mouseleave",this)},n.Player=o,n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){for(var e=document.createDocumentFragment(),i=0,n=t.length;n>i;i++){var o=t[i];e.appendChild(o.element)}return e}return e.prototype.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var o=this.cells.length;e=void 0===e?o:e;var r=n(i),s=e==o;if(s)this.slider.appendChild(r);else{var a=this.cells[e].element;this.slider.insertBefore(r,a)}if(0===e)this.cells=i.concat(this.cells);else if(s)this.cells=this.cells.concat(i);else{var l=this.cells.splice(e,o-e);this.cells=this.cells.concat(i).concat(l)}this._sizeCells(i);var h=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,h)}},e.prototype.append=function(t){this.insert(t,this.cells.length)},e.prototype.prepend=function(t){this.insert(t,0)},e.prototype.remove=function(t){var e,n,o,r=this.getCells(t),s=0;for(e=0,n=r.length;n>e;e++){o=r[e];var a=i.indexOf(this.cells,o)<this.selectedIndex;s-=a?1:0}for(e=0,n=r.length;n>e;e++)o=r[e],o.remove(),i.removeFrom(this.cells,o);r.length&&this._cellAddedRemoved(0,s)},e.prototype._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.cells.length-1,this.selectedIndex)),this.emitEvent("cellAddedRemoved",[t,e]),this.cellChange(t,!0)},e.prototype.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var n=i.indexOf(this.cells,e);this.cellChange(n)}},e.prototype.cellChange=function(t,e){var i=this.slideableWidth;if(this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.options.freeScroll){var n=i-this.slideableWidth;this.x+=n*this.cellAlign,this.positionSlider()}else e&&this.positionSliderAtSelected(),this.select(this.selectedIndex)},e}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/lazyload",["classie/classie","eventie/eventie","./flickity","fizzy-ui-utils/utils"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof exports?module.exports=e(t,require("desandro-classie"),require("eventie"),require("./flickity"),require("fizzy-ui-utils")):e(t,t.classie,t.eventie,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i,n,o){"use strict";function r(t){if("IMG"==t.nodeName&&t.getAttribute("data-flickity-lazyload"))return[t];var e=t.querySelectorAll("img[data-flickity-lazyload]");return o.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}return n.createMethods.push("_createLazyload"),n.prototype._createLazyload=function(){this.on("cellSelect",this.lazyLoad)},n.prototype.lazyLoad=function(){var t=this.options.lazyLoad;if(t){for(var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),n=[],o=0,a=i.length;a>o;o++){var l=i[o],h=r(l);n=n.concat(h)}for(o=0,a=n.length;a>o;o++){var c=n[o];new s(c,this)}}},s.prototype.handleEvent=o.handleEvent,s.prototype.load=function(){i.bind(this.img,"load",this),i.bind(this.img,"error",this),this.img.src=this.img.getAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,n){i.unbind(this.img,"load",this),i.unbind(this.img,"error",this);var o=this.flickity.getParentCell(this.img),r=o&&o.element;this.flickity.cellSizeChange(r),e.add(this.img,n),this.flickity.dispatchEvent("lazyLoad",t,r)},n.LazyLoader=s,n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["classie/classie","flickity/js/index","fizzy-ui-utils/utils"],function(i,n,o){return e(t,i,n,o)}):"object"==typeof exports?module.exports=e(t,require("desandro-classie"),require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t,t.classie,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i,n){return i.createMethods.push("_createAsNavFor"),i.prototype._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},i.prototype.setNavCompanion=function(t){t=n.getQueryElement(t);var e=i.data(t);if(e&&e!=this){this.navCompanion=e;var o=this;this.onNavCompanionSelect=function(){o.navCompanionSelect()},e.on("cellSelect",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect()}},i.prototype.navCompanionSelect=function(){if(this.navCompanion){var t=this.navCompanion.selectedIndex;this.select(t),this.removeNavSelectedElement(),this.selectedIndex==t&&(this.navSelectedElement=this.cells[t].element,e.add(this.navSelectedElement,"is-nav-selected"))}},i.prototype.activateAsNavFor=function(){this.navCompanionSelect()},i.prototype.removeNavSelectedElement=function(){this.navSelectedElement&&(e.remove(this.navSelectedElement,"is-nav-selected"),delete this.navSelectedElement)},i.prototype.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.select(n)},i.prototype.deactivateAsNavFor=function(){this.removeNavSelectedElement()},i.prototype.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("cellSelect",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["eventEmitter/EventEmitter","eventie/eventie"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("wolfy87-eventemitter"),require("eventie")):t.imagesLoaded=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,i){function n(t,e){for(var i in e)t[i]=e[i];return t}function o(t){return"[object Array]"==p.call(t)}function r(t){var e=[];if(o(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,i){if(!(this instanceof s))return new s(t,e,i);"string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=r(t),this.options=n({},this.options),"function"==typeof e?i=e:n(this.options,e),i&&this.on("always",i),this.getImages(),h&&(this.jqDeferred=new h.Deferred);var o=this;setTimeout(function(){o.check()})}function a(t){this.img=t}function l(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,c=t.console,p=Object.prototype.toString;s.prototype=new e,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var t=0;t<this.elements.length;t++){var e=this.elements[t];this.addElementImages(e)}},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};s.prototype.addElementBackgroundImages=function(t){for(var e=u(t),i=/url\(['"]*([^'"\)]+)['"]*\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[1];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}};var u=t.getComputedStyle||function(t){return t.currentStyle};return s.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new l(t,e);this.images.push(i)},s.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;if(this.progressedCount=0,this.hasAnyBroken=!1,!this.images.length)return void this.complete();for(var i=0;i<this.images.length;i++){var n=this.images[i];n.once("progress",t),n.check()}},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emit("progress",this,t,e),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&c&&c.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emit(t,this),this.emit("always",this),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},a.prototype=new e,a.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,i.bind(this.proxyImage,"load",this),i.bind(this.proxyImage,"error",this),i.bind(this.img,"load",this),i.bind(this.img,"error",this),void(this.proxyImage.src=this.img.src))},a.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emit("progress",this,this.img,e)},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},a.prototype.unbindEvents=function(){i.unbind(this.proxyImage,"load",this),i.unbind(this.proxyImage,"error",this),i.unbind(this.img,"load",this),i.unbind(this.img,"error",this)},l.prototype=new a,l.prototype.check=function(){i.bind(this.img,"load",this),i.bind(this.img,"error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},l.prototype.unbindEvents=function(){i.unbind(this.img,"load",this),i.unbind(this.img,"error",this)},l.prototype.confirm=function(t,e){this.isLoaded=t,this.emit("progress",this,this.element,e)},s.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(h(this))})},s.makeJQueryPlugin(),s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";return e.createMethods.push("_createImagesLoaded"),e.prototype._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},e.prototype.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on("progress",t)}},e});jQuery(function($) {
GalleryModuleInitialize_Layout6();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout6() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-6:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $categories = $sectionThis.find('.filter li');
var $flickityContainer = $sectionThis.find('.gallery-images-container');
/**
* Gallery Modules - Flickity Initial
* Documentation : http://flickity.metafizzy.co/options.html
*/
$flickityContainer.flickity({
imagesLoaded: true,
lazyLoad: 2
});
$flickityContainer.on( 'cellSelect', function() {
var $this = $(this);
var flkty = Flickity.data( this );
$this.next('.gallery-image-caption').text($(flkty.selectedElement).find('img').attr('alt'));
});
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.gallery-images-container, .gallery-image-caption'
});
$isotopeContainer.on( 'arrangeComplete', function( event, filteredItems ) {
$flickityContainer.flickity('resize');
});
$categories.click(function () {
var $this = $(this);
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter_Layout6($(this),$this.data('filter'));
}
});
$flickityContainer.flickity('resize');
return false;
});
$categories.first().trigger('click');
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter_Layout6( $item, filter ) {
return $item.attr('data-filter') == filter;
}jQuery(function($) {
GalleryModuleInitialize_Layout7();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout7() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-7:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $isotopeContainer = $sectionThis.find('.isotope-gallery-container');
var $categories = $sectionThis.find('.filter li');
var $flickityContainer = $sectionThis.find('.gallery-images-container');
/**
* Gallery Modules - Flickity Initial
* Documentation : http://flickity.metafizzy.co/options.html
*/
$flickityContainer.flickity({
imagesLoaded: true,
initialIndex: 1,
lazyLoad: 2
});
$flickityContainer.on( 'cellSelect', function() {
var $this = $(this);
var flkty = Flickity.data( this );
$this.next('.gallery-image-caption').text($(flkty.selectedElement).attr('alt'));
});
/**
* Gallery Modules - Isotope Initial
*/
$isotopeContainer.isotope({
itemSelector: '.gallery-images-container, .gallery-image-caption'
});
$isotopeContainer.on( 'arrangeComplete', function( event, filteredItems ) {
$flickityContainer.flickity('resize');
});
$categories.click(function () {
var $this = $(this);
$isotopeContainer.isotope({
filter: function() {
return gallery_Filter_Layout7($(this),$this.data('filter'));
}
});
$flickityContainer.flickity('resize');
return false;
});
$categories.first().trigger('click');
});
});
}
/**
* The function filter the items related to the selected category.
* We create a custom filter function because we like to filter
* the items via data-attributes and not by class.
*/
function gallery_Filter_Layout7( $item, filter ) {
return $item.attr('data-filter') == filter;
}jQuery(function($) {
GalleryModuleInitialize_Layout8();
});
/**
* The function initialize the Gallery Module.
*/
function GalleryModuleInitialize_Layout8() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Gallery & Video modules using the same classes but need to get different
* settings, so we create a selector to choose only the galley modules.
* Note: if we choose also the video the magnificPopup wont work.
*/
var $section = $('section.s123-module-gallery.layout-8:not(.s123-module-videos)');
$section.each(function( index ) {
var $sectionThis = $(this);
var $categories = $sectionThis.find('.filter li');
var $images = $sectionThis.find('.gallery-image');
/**
* Gallery Modules - Magnific Popup Initial
* Documentation : http://dimsemenov.com/plugins/magnific-popup/documentation.html
*/
$sectionThis.magnificPopup({
delegate: '.mfp-image:visible',						// Categories Filter
closeOnContentClick: true,
closeBtnInside: false,
tLoading: translations.loading,						// Text that is displayed during loading
gallery: {
enabled: true,
tClose: translations.closeEsc,					// Alt text on close button
tPrev: translations.previousLeftArrowKey,		// Alt text on left arrow
tNext: translations.NextRightArrowKey,			// Alt text on right arrow
tCounter: '%curr% '+translations.of+' %total%'	// Markup for "1 of 7" counter
},
image: {
titleSrc: 'data-caption',
tError: translations.imageCouldNotLoaded		// Error message when image could not be loaded
}
});
$categories.click(function () {
var $this = $(this);
$categories.removeClass('active');
$this.addClass('active');
$sectionThis.css({ minHeight: $sectionThis.height() });
var $filtered = $this.data('filter') == 's123-g-show-all' ? $images : $images.filter('[data-filter=' + $this.data('filter') + ']');
$images.fadeOut(200).promise().done( function() {
$filtered.fadeIn(200);
$sectionThis.css({ minHeight: '' });
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
});
});
}jQuery(function($) {
ContactModuleInitialize();
});
/**
* The function initialize the Contact Module.
*/
function ContactModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-contact');
$section.each( function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.contactUsForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/contactO.php",
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: 'Thank you!<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
$sectionThis.find('.google-map-obj').each( function( index ) {
var $this = $(this);
/**
* There is no option to get an exist instance of GMaps and
* every time its load it include some JS files. To prevent
* reinitialize of an exist object we set a custom flag.
*/
if ( !$this.data('gmapInit') ) {
var map =  new GMaps({
div: '#'+$this.attr('id'),
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
scrollwheel: false,
draggable: isMobile.any() ? false : true
});
map.addMarker({
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val()
});
$this.data('gmapInit',true);
}
});
});
});
}jQuery(function($) {
TeamModuleInitialize();
});
/**
* The function initialize the Team Module.
*/
function TeamModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-team');
$section.each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.team-phone-btn').click(function() {
var $this = $(this);
var $teamPhone = $this.closest('.team-phone');
buildPopup('teamPopupFloatDivPhone','',$teamPhone.find('.team-phone-popover').html(),'',true,true,true,'');
});
});
});
}jQuery(function($) {
CustomFormModuleInitialize();
});
/**
* The function initialize the Custom Form Module.
*/
function CustomFormModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-custom-form-builder');
$section.each( function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.customForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var sendingDialog = bootbox.alert({
title: translations.sending,
message: '<div id="customFormLoadingMessage">'+translations.loading+'</div>',
className: 'contactUsConfirm',
backdrop: true
});
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/customFormO.php",
data: new FormData($form.get(0)),
cache: false,
contentType: false,
processData: false,
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
message = '<span>Thank you!<iframe src="/versions/'+$('#versionNUM').val()+'/include/customFormSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe></span>';
var $sentMessage = $(message);
sendingDialog.find('.modal-title').html(translations.sent);
sendingDialog.find('.bootbox-body').append($sentMessage.hide());
$('#customFormLoadingMessage').hide();
$sentMessage.slideDown(200);
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
});
});
}jQuery(function($) {
MapModuleInitialize();
});
/**
* The function initialize the Map Module.
*/
function MapModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-gmap');
$($section).each( function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.gmap-obj').each( function( index ) {
var $this = $(this);
/**
* There is no option to get an exist instance of GMaps and
* every time its load it include some JS files. To prevent
* reinitialize of an exist object we set a custom flag.
*/
if ( !$this.data('gmapInit') ) {
var mapProperty = {
div: '#'+$this.attr('id'),
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
scrollwheel: false,
draggable: isMobile.any() ? false : true
}
if ($sectionThis.hasClass('layout-2')) {
mapProperty.styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
}
var map =  new GMaps(mapProperty);
map.addMarker({
lat: $this.parent('div').find('.googleMapLat').val(),
lng: $this.parent('div').find('.googleMapLng').val(),
infoWindow: {
content: '<p style="color: black;">' + $this.parent('div').find('.googleMapContent').val() + '</p>'
}
});
$this.data('gmapInit',true);
}
});
});
});
}jQuery(function($) {
MenuModuleInitialize();
});
/**
* The function initialize the Menu Module.
*/
function MenuModuleInitialize() {
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-menu.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.filter a');
$categories.click(function () {
var $category = $(this);
var $products = $s.find('.menu-category');
$s.find('.filter li').removeClass('active');
$category.parent().addClass('active');
$products.fadeOut(200).promise().done( function() {
$products
.filter('[data-filter=' + $category.data('filter') + ']')
.fadeIn(200);
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
});
});
}jQuery(function($) {
var rtl = $('html[dir=rtl]').length === 1;
var $section = $('section.s123-page-data-products');
var $mainImage = $section.find('.main-image > div');
var $productOwlcarousel = $section.find('#productOwlcarousel');
jQueryZoomInitialize($mainImage.data('zoom-image'));
/**
* Owl Carousel 2 Initialize
* Documentation: http://www.owlcarousel.owlgraphic.com/docs/api-options.html
*/
$productOwlcarousel.owlCarousel({
autoPlay: false,
items : 4,
margin: 10,
stagePadding: 5,
startPosition: 0,
loop: false,
center: false,
nav: true,
rtl: rtl,
navText:  [
'<i class="fa fa-2x fa-angle-' + (rtl ? 'right' : 'left') + '" aria-hidden="true"></i>',
'<i class="fa fa-2x fa-angle-' + (rtl ? 'left' : 'right') + '" aria-hidden="true"></i>'
],
dots: true
});
$productOwlcarousel.find('.item').click(function() {
var $clickedImage = $(this).find('.item-image');
jQueryZoomInitialize($clickedImage.data('zoom-image'));
$mainImage.css({
backgroundImage: $clickedImage.css('background-image')
});
});
/**
* The function initialize the jQuery Zoom Plugin on the main product image.
* Documentation: http://www.jacklmoore.com/zoom/
*
* @param {string} url - The URL of the image we like to zoom in to it.
*/
function jQueryZoomInitialize( url ) {
if ( isMobile.any() ) return;
$mainImage.trigger('zoom.destroy');
/**
* It take some time for the zoom image to loaded and if the user hover the image
* before the zoom image finished loaded the zoom is not activate. We fix it by
* creating a div and removing it (for activate the `'mouseover' event).
*/
var loading = $('<div style="position:absolute;width:100%;height:100%;z-index:99999;"></div>').appendTo($mainImage);
$mainImage.zoom({
url: url,
magnify: 2,
touch: true,
callback: function() {
loading.remove();
},
});
}
(function () {
var $productOptions = $section.find(".product-options");
var $options = $productOptions.find('.p-o-container');
if ( $productOptions.length !== 0 ) {
$options.filter('[data-type="color"]').each( function() {
var $option = $(this);
var $colors = $option.find('.p-o-color');
$colors.click( function( event ) {
var $color = $(this);
$colors.filter('.selected').removeClass('selected');
$color.addClass('selected');
$option.find('.p-o-item-value').html(fixQuotIssue($color.attr('title')));
update();
});
$colors.first().trigger('click');	// default value
});
$options.filter('[data-type="list"]').each( function() {
var $option = $(this);
var $list = $option.find('.p-o-list');
$list.change( function( event ) {
$option.find('.p-o-item-value').html(fixQuotIssue($list.val()));
update();
}).trigger('change');	// default value
});
update();
}
/**
* The function update the product options object.
*/
function update() {
var po = [];
var totalItemsPrice = 0.00;
$options.each( function() {
var $option = $(this);
var pOption = new ProductOptions();
pOption.id = $option.get(0).id;
pOption.title = fixQuotIssue($option.data('title'));
pOption.type = $option.data('type');
switch( $option.data('type') ) {
case 'color':
var $color = $option.find('.p-o-color.selected');
if ( $color.length === 0 ) return;
pOption.item.id = $color.get(0).id
pOption.item.title = fixQuotIssue($color.attr('title'));
pOption.item.price = $color.data('price');
break;
case 'list':
var $list = $option.find('.p-o-list');
var $listSelectedOpt = $list.find('option:selected');
if ( $list.find('option').length === 0 ) return;
pOption.item.id = $listSelectedOpt.get(0).id;
pOption.item.title = fixQuotIssue($list.val());
pOption.item.price = $listSelectedOpt.data('price');
break;
}
totalItemsPrice += parseFloat(pOption.item.price);
po.push(pOption);
});
$('#productOptions').html(JSON.stringify(po));
addItemsPrice(totalItemsPrice);
}
/**
* Product Option Class.
*/
function ProductOptions() {
return {
id: null,
title: null,
type: null,
item: {
id: null,
title: null,
price: 0
}
};
}
/**
* The function add product items price to the product price.
*
* @param {float} totalItemsPrice - The total items price.
*/
function addItemsPrice( totalItemsPrice ) {
var $productPrice = $section.find('#productPrice');
var $price = $productPrice.find('[data-type="price"]');
if ( !$.isNumeric(totalItemsPrice) ) return;
if ( parseFloat($productPrice.data('price'))
+ parseFloat(totalItemsPrice) == parseFloat($price.html()) ) return;
var p = parseFloat($productPrice.data('price')) + parseFloat(totalItemsPrice);
$price.html(p.toFixed(2));
}
})();
(function () {
var $ct = $section.find("#product-custom-text");
var $ct_fieldTitle = $ct.find("#ct_fieldTitle");
var $ct_charLimit = $ct.find("#ct_charLimit");
var $orderButtonPopup = $section.find(".orderButtonPopup");
$ct_fieldTitle.on('input', function( event ) {
var max = $ct.data('char-limit');
var length = $ct_fieldTitle.val().length
if ( length > max) {
$ct_fieldTitle.val($ct_fieldTitle.val().substring(0, max));
} else {
$ct_charLimit.html(max - length);
}
});
$ct_fieldTitle.blur( function( event ) {
update();
});
$orderButtonPopup.click( function( event ) {
update();
});
/**
* The function update the custom text object.
*/
function update() {
var ct = new CustomText();
ct.fieldTitle = fixQuotIssue($ct.data('field-title'));
ct.value = $ct_fieldTitle.val();
$('#customText').html(JSON.stringify(ct));
}
/**
* Custom Text Class.
*/
function CustomText() {
return {
fieldTitle: null,
value: null
};
}
})();
/**
* The function convert `&quot;` to `"`, We use data attribute to to pass
* some of the fields with `htmlspecialchars()` on the server side to
* prevent HTML break with quot, the JS function `stringify` doesn't
* handle `&quot;` chars so we fix it manually by replacing it to `"`.
* In the feature we need to stop passing the values using `data`.
*/
function fixQuotIssue( value ) {
if ( !value ) return value;
return value.toString().replace(/\&quot;/g,'\"');
}
});jQuery(function($) {
ProductsModuleInitialize();
});
/**
* The function initialize the Products Module.
*/
function ProductsModuleInitialize() {
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-products.layout-2');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.filter a');
$categories.click(function () {
var $category = $(this);
var $products = $s.find('.products-category');
$s.find('.filter li').removeClass('active');
$category.parent().addClass('active');
$products.fadeOut(200).promise().done( function() {
$products
.filter('[data-filter=' + $category.data('filter') + ']')
.fadeIn(200);
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
});
});
}jQuery(function($) {
ProductsModuleInitialize_Layout3();
});
/**
* The function initialize the Products Module.
*/
function ProductsModuleInitialize_Layout3() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-products.layout-3');
$sections.each(function( index ) {
var $s = $(this);
var $categories = $s.find('.products-categories-container li');
var $products = $s.find('.products-container li');
$categories.click(function () {
var $category = $(this);
$categories.removeClass('active');
$category.addClass('active');
$products.fadeOut(200).promise().done( function() {
$products
.filter('[data-product-filter=' + $category.data('categories-filter') + ']')
.fadeIn(200);
$(window).trigger('scroll');
});
return false;
});
$categories.first().trigger('click');
$s.find('.products-responsive-filter').click(function() {
var $category = $(this);
$s.find('.categories-panel').slideToggle('slow');
$category.toggleClass('active');
return false;
});
});
});
}jQuery(function($) {
TimelineModuleInitialize();
});
/**
* The function initialize the Timeline Module.
*/
function TimelineModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var timelineBlocks = $('.cd-timeline-block'),
offset = 0.8;
hideBlocks(timelineBlocks, offset);
$(window).on('scroll', function(){
(!window.requestAnimationFrame)
? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
});
function hideBlocks(blocks, offset) {
blocks.each(function(){
( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
});
}
function showBlocks(blocks, offset) {
blocks.each(function(){
( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
});
}
});
}/*! flipclock 2015-01-19 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return b instanceof Object&&b instanceof Date==!1&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-12-12",version:"0.7.7",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({autoStart:!0,dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){this.autoStart&&this.start()},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"],g=a(f.join(""));return this.dividers.push(g),g},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0,{minimumDigits:this.factory.minimumDigits}),this.flip(this.factory.original,!1)},appendDigitToClock:function(a){a.$el.append(!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});this.appendDigitToClock(b)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.countdown?this.decrement():this.increment()},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({animationRate:1e3,autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",$el:!1,face:!0,lang:!1,language:"english",minimumDigits:0,original:!1,running:!1,time:!1,timer:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:this.minimumDigits,animationRate:this.animationRate}),this.timer=new FlipClock.Timer(this,d),this.loadLanguage(this.language),this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face",e=!1;return a=a.ucfirst()+d,this.face.stop&&(this.stop(),e=!0),this.$el.html(""),this.time.minimumDigits=this.minimumDigits,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),this.face=c,e&&this.start(),this.face},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage],this.lang=b},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$obj=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){"object"!=typeof c&&(c={}),c.minimumDigits||(c.minimumDigits=a.minimumDigits),this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDateObject:function(){return this.time instanceof Date?this.time:new Date((new Date).getTime()+1e3*this.getTimeSeconds())},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject());var c=[a.getHours(),a.getMinutes()];return b===!0&&c.push(a.getSeconds()),this.digitize(c)},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(a){return a||(a=new Date),this.time instanceof Date?this.factory.countdown?Math.max(this.time.getTime()/1e3-a.getTime()/1e3,0):a.getTime()/1e3-this.time.getTime()/1e3:this.time},getTime:function(a,b){"undefined"==typeof b&&(b=!0),a||(a=this.getDateObject()),console.log(a);var c=a.getHours(),d=[c>12?c-12:0===c?12:c,a.getMinutes()];return b===!0&&d.push(a.getSeconds()),this.digitize(d)},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getWeeks:function(a){var b=this.getTimeSeconds()/60/60/24/7;return a&&(b%=52),Math.floor(b)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()+a):this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time instanceof Date?this.time.setSeconds(this.time.getSeconds()-a):this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");this.factory.time.time||(this.factory.original=new Date,this.factory.time=new FlipClock.Time(this.factory,this.factory.original));var b=b?b:this.factory.time.getMilitaryTime(!1,this.showSeconds);b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.createDivider(),this.createDivider(),a(this.dividers[0]).insertBefore(this.lists[this.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.lists[this.lists.length-4].$el),this.base()},flip:function(a,b){this.autoIncrement(),a=a?a:this.factory.time.getMilitaryTime(!1,this.showSeconds),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({shouldAutoIncrement:!1,constructor:function(a,b){"object"!=typeof b&&(b={}),a.autoStart=b.autoStart?!0:!1,b.autoStart&&(this.shouldAutoIncrement=!0),a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=this.factory.getTime().digitize([this.factory.getTime().time]);d.length>c.length&&a.each(d,function(a,c){var d=b.createList(c);d.select(c)}),a.each(this.lists,function(a,b){b.play()}),this.base()},flip:function(a,b){this.shouldAutoIncrement&&this.autoIncrement(),a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factory,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul"),e=0;b=b?b:this.factory.time.getDayCounter(this.showSeconds),b.length>d.length&&a.each(b,function(a,b){c.createList(b)}),this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el):e=2,a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4+e].$el),a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length-6+e].$el),a(this.createDivider("Days",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul");c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){d.createList(b)}),a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.lists[0].$el),this.base()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)},appendDigitToClock:function(a){this.base(a),this.dividers[0].insertAfter(this.dividers[0].next())}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(){var b=this.factory.time.getTime(!1,this.showSeconds);this.base(b),this.meridiumText=this.getMeridium(),this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.lists[this.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this.getMeridium()&&(this.meridiumText=this.getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(!1,this.showSeconds),b)},getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},isPM:function(){return"PM"==this.getMeridium()?!0:!1},isAM:function(){return"AM"==this.getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery),function(){FlipClock.Lang.Chinese={years:"年",months:"月",days:"日",hours:"时",minutes:"分",seconds:"秒"},FlipClock.Lang.zh=FlipClock.Lang.Chinese,FlipClock.Lang["zh-cn"]=FlipClock.Lang.Chinese,FlipClock.Lang.chinese=FlipClock.Lang.Chinese}(jQuery);jQuery(function($) {
BlogModuleInitialize();
});
/**
* The function initialize the Contact Module.
*/
function BlogModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('.blogCommentsForm').length !== 0 ) {
var $blogCommentsForm = $('.blogCommentsForm');
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$blogCommentsForm.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
}
});
$blogCommentsForm.submit(function() {
event.preventDefault();
if ( !$blogCommentsForm.valid() ) return;
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/wizard/comments/commentO.php",
data: $blogCommentsForm.serialize(),
success: function(data) {
var dataObj = jQuery.parseJSON(data);
if ( dataObj.blockComment  == '0' ) {
$("#commentIframeContent").attr("src", function(index, attr){
return attr;
});
return false;
}
$blogCommentsForm.trigger("reset");
bootbox.alert({
title: translations.sent,
message: translations.blogReviewMessage,
className: 'contactUsConfirm',
backdrop: true
});
}
});
return false;
});
}
if ( $('#commentIframeContent').length !== 0 ) {
$("#commentIframeContent").load( function() {
var $iframe = $(this);
$iframe.height($iframe.contents().find('body').outerHeight(true));
});
}
});
}jQuery(function($) {
PromoModuleInitialize();
});
/**
* The function initialize the Promo Module.
*/
function PromoModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-promo-module-v2');
$($section).each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.carousel').carousel();
$sectionThis.find('.promoForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/contactO.php",
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: 'Thank you!<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'&moduleID='+dataObj.moduleID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
});
});
}jQuery(function($) {
PromoModuleInitialize();
});
/**
* The function initialize the Promo Module.
*/
function PromoOldV1ModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-promo');
$($section).each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.carousel').carousel();
});
});
}jQuery(function($) {
CountdownModuleInitialize();
});
/**
* The function initialize the Countdown Module.
*/
function CountdownModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
$('.s123-module-countdown-container').each( function() {
var $this = $(this);
var $clock = $this.find('.clock');
var $message = $this.find('.message');
var datetime = $clock.data('datetime');
var type = $clock.data('type');
var futureDate  = new Date(datetime);
var currentDate = new Date();
var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
if( diff <= 0 ) {
diff = 0;
$message.css('visibility', 'visible');
}
switch( type ) {
case 1:
var clockFace = 'DailyCounter';
break;
case 2:
var clockFace = 'HourlyCounter';
break;
case 3:
var clockFace = 'MinuteCounter';
break;
default:
var clockFace = 'DailyCounter';
}
/**
* Countdown Modules - FlipClock Initial
* Documentation : http://flipclockjs.com/
*/
$clock = $clock.FlipClock( diff, {
clockFace: clockFace,
autoStart: true,
countdown: true,
callbacks: {
stop: function() {
$message.css('visibility', 'visible');
}
}
});
});
});
}!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="dist/",t(0)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},a=o(1),r=(n(a),o(5)),c=n(r),u=o(6),s=n(u),d=o(7),f=n(d),l=o(8),m=n(l),p=o(9),b=n(p),v=o(10),g=n(v),y=o(13),w=n(y),h=[],k=!1,x=document.all&&!window.atob,j={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded"},O=function(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];return e&&(k=!0),k?(h=(0,g["default"])(h,j),(0,b["default"])(h,j.once),h):void 0},_=function(){h=(0,w["default"])(),O()},z=function(){h.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},A=function(e){return e===!0||"mobile"===e&&m["default"].mobile()||"phone"===e&&m["default"].phone()||"tablet"===e&&m["default"].tablet()||"function"==typeof e&&e()===!0},E=function(e){return j=i(j,e),h=(0,w["default"])(),A(j.disable)||x?z():(document.querySelector("body").setAttribute("data-aos-easing",j.easing),document.querySelector("body").setAttribute("data-aos-duration",j.duration),document.querySelector("body").setAttribute("data-aos-delay",j.delay),"DOMContentLoaded"===j.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?O(!0):"load"===j.startEvent?window.addEventListener(j.startEvent,function(){O(!0)}):document.addEventListener(j.startEvent,function(){O(!0)}),window.addEventListener("resize",(0,s["default"])(O,50,!0)),window.addEventListener("orientationchange",(0,s["default"])(O,50,!0)),window.addEventListener("scroll",(0,c["default"])(function(){(0,b["default"])(h,j.once)},99)),document.addEventListener("DOMNodeRemoved",function(e){var t=e.target;t&&1===t.nodeType&&t.hasAttribute&&t.hasAttribute("data-aos")&&(0,s["default"])(_,50,!0)}),(0,f["default"])("[data-aos]",_),h)};e.exports={init:E,refresh:O,refreshHard:_}},function(e,t){},,,,function(e,t,o){"use strict";function n(e,t,o){var n=!0,a=!0;if("function"!=typeof e)throw new TypeError(c);return i(o)&&(n="leading"in o?!!o.leading:n,a="trailing"in o?!!o.trailing:a),r(e,t,{leading:n,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":a(e);return!!e&&("object"==t||"function"==t)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},r=o(6),c="Expected a function";e.exports=n},function(e,t){"use strict";function o(e,t,o){function n(t){var o=b,n=v;return b=v=void 0,O=t,y=e.apply(n,o)}function a(e){return O=e,w=setTimeout(d,t),_?n(e):y}function r(e){var o=e-h,n=e-O,i=t-o;return z?x(i,g-n):i}function u(e){var o=e-h,n=e-O;return!h||o>=t||0>o||z&&n>=g}function d(){var e=j();return u(e)?f(e):void(w=setTimeout(d,r(e)))}function f(e){return clearTimeout(w),w=void 0,A&&b?n(e):(b=v=void 0,y)}function l(){void 0!==w&&clearTimeout(w),h=O=0,b=v=w=void 0}function m(){return void 0===w?y:f(j())}function p(){var e=j(),o=u(e);if(b=arguments,v=this,h=e,o){if(void 0===w)return a(h);if(z)return clearTimeout(w),w=setTimeout(d,t),n(h)}return void 0===w&&(w=setTimeout(d,t)),y}var b,v,g,y,w,h=0,O=0,_=!1,z=!1,A=!0;if("function"!=typeof e)throw new TypeError(s);return t=c(t)||0,i(o)&&(_=!!o.leading,z="maxWait"in o,g=z?k(c(o.maxWait)||0,t):g,A="trailing"in o?!!o.trailing:A),p.cancel=l,p.flush=m,p}function n(e){var t=i(e)?h.call(e):"";return t==f||t==l}function i(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function a(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||a(e)&&h.call(e)==m}function c(e){if("number"==typeof e)return e;if(r(e))return d;if(i(e)){var t=n(e.valueOf)?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(p,"");var o=v.test(e);return o||g.test(e)?y(e.slice(2),o?2:8):b.test(e)?d:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s="Expected a function",d=NaN,f="[object Function]",l="[object GeneratorFunction]",m="[object Symbol]",p=/^\s+|\s+$/g,b=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,g=/^0o[0-7]+$/i,y=parseInt,w=Object.prototype,h=w.toString,k=Math.max,x=Math.min,j=Date.now;e.exports=o},function(e,t){"use strict";function o(e,t){r.push({selector:e,fn:t}),!c&&a&&(c=new a(n),c.observe(i.documentElement,{childList:!0,subtree:!0,removedNodes:!0})),n()}function n(){for(var e,t,o=0,n=r.length;n>o;o++){e=r[o],t=i.querySelectorAll(e.selector);for(var a,c=0,u=t.length;u>c;c++)a=t[c],a.ready||(a.ready=!0,e.fn.call(a,a))}}Object.defineProperty(t,"__esModule",{value:!0});var i=window.document,a=window.MutationObserver||window.WebKitMutationObserver,r=[],c=void 0;t["default"]=o},function(e,t){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),i=function(){function e(){o(this,e)}return n(e,[{key:"phone",value:function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}},{key:"mobile",value:function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t["default"]=new i},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t,o){var n=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof n&&("false"===n||!o&&"true"!==n)&&e.node.classList.remove("aos-animate")},n=function(e,t){var n=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,a){o(e,i+n,t)})};t["default"]=n},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(11),a=n(i),r=function(e,t){return e.forEach(function(e,o){e.node.classList.add("aos-init"),e.position=(0,a["default"])(e.node,t.offset)}),e};t["default"]=r},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(12),a=n(i),r=function(e,t){var o=0,n=0,i=window.innerHeight,r={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(r.offset&&!isNaN(r.offset)&&(n=parseInt(r.offset)),r.anchor&&document.querySelectorAll(r.anchor)&&(e=document.querySelectorAll(r.anchor)[0]),o=(0,a["default"])(e).top,r.anchorPlacement){case"top-bottom":break;case"center-bottom":o+=e.offsetHeight/2;break;case"bottom-bottom":o+=e.offsetHeight;break;case"top-center":o+=i/2;break;case"bottom-center":o+=i/2+e.offsetHeight;break;case"center-center":o+=i/2+e.offsetHeight/2;break;case"top-top":o+=i;break;case"bottom-top":o+=e.offsetHeight+i;break;case"center-top":o+=e.offsetHeight/2+i}return r.anchorPlacement||r.offset||isNaN(t)||(n=t),o+n};t["default"]=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){for(var t=0,o=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),o+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:o,left:t}};t["default"]=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){e=e||document.querySelectorAll("[data-aos]");var t=[];return[].forEach.call(e,function(e,o){t.push({node:e})}),t};t["default"]=o}])});jQuery(function($) {
JobsModuleInitialize();
});
/**
* The function initialize the Jobs Module.
*/
function JobsModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
var $section = $('section.s123-module-jobs, section.s123-page-data-job');
$section.each(function( index ) {
var $sectionThis = $(this);
$sectionThis.find('.jobsApplyBtn').click(function() {
var $applyBtn = $(this);
var websiteID = $applyBtn.data('website-id');
var moduleID = $applyBtn.data('module-id');
var uniqueID = $applyBtn.data('unique-id');
var w = $('#w').val();
buildPopup('popupJobs','',buildForm(websiteID,moduleID,uniqueID,w),'',true,false,true,'');
$('#popupJobs').find('.jobsForm').each( function( index ) {
var $form = $(this);
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$form.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
var $jobsLoadingMessage = $('<div id="jobsLoadingMessage">'+translations.loading+'</div>');
var bootboxDialog = bootbox.alert({
title: translations.sending,
message: $jobsLoadingMessage,
className: 'jobsConfirm, bootbox-jobs-form',
backdrop: true
}).on("hidden.bs.modal", function() {
buildPopup_CloseAction('popupJobs');
});
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/jobsO.php",
data: new FormData($form.get(0)),
cache: false,
contentType: false,
processData: false,
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
message = '<span>Thank you!</span>';
var $sentMessage = $(message);
bootboxDialog.find('.modal-title').html(translations.sent);
bootboxDialog.find('.bootbox-body').append($sentMessage.hide());
$jobsLoadingMessage.hide();
$sentMessage.slideDown(200);
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
});
});
});
}
/**
* The function build the html of the job form
*
* @param {string} websiteID - Website ID.
* @param {string} moduleID - Module ID.
* @param {string} uniqueID - Unique item ID.
* @return {string} html - Html of the form.
*/
function buildForm( websiteID, moduleID, uniqueID, w ) {
var html = '';
html += '<form class="jobsForm">';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="first">'+translations.firstName+'</label>';
html += '<input type="text" name="jobs_first_name" placeholder="'+translations.firstName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_last_name">'+translations.lastName+'</label>';
html += '<input type="text" name="jobs_last_name" placeholder="'+translations.lastName+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_phone">'+translations.phone+'</label>';
html += '<input type="text" name="jobs_phone" placeholder="'+translations.phone+'" class="form-control">';
html += '</div>';
html += '</div>';
html += '<div class="col-sm-6 col-xs-12">';
html += '<div class="form-group">';
html += '<label for="jobs_email">'+translations.emailAddress+'</label>';
html += '<input type="text" name="jobs_email" placeholder="'+translations.emailAddress+'" class="form-control" required data-msg-required="'+translations.jqueryValidMsgRequire+'" data-rule-email="true" data-msg-email="'+translations.jqueryValidMsgEmail+'">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<div class="row">';
html += '<div class="col-xs-12">';
html += '<div class="form-group">';
html += '<label for="">'+translations.fileUpload+'</label>';
html += '<input type="file" class="form-control" name="jobs_upload_file">';
html += '</div>';
html += '</div>';
html += '</div>';
html += '<button type="submit" class="btn btn-primary btn-block">'+translations.send+'</button>';
html += '<input type="hidden" name="w" value="'+w+'">';
html += '<input type="hidden" name="websiteID" value="'+websiteID+'">';
html += '<input type="hidden" name="moduleID" value="'+moduleID+'">';
html += '<input type="hidden" name="uniqueID" value="'+uniqueID+'">';
html += '</form>';
return html;
}jQuery(function($) {
TestimonialsModuleInitialize_Layout1();
});
/**
* The function initialize the Testimonials Module.
*/
function TestimonialsModuleInitialize_Layout1() {
$( document ).on( "s123.page.ready", function( event ) {
var $sections = $('.s123-module-testimonials.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $carousel = $s.find('[data-ride="carousel"]');
$carousel.carousel({
interval: isMobile.any() ? false : 7000
});
$carousel.find('.carousel-control.left').click(function() {
if ( $('html').attr('dir') == 'rtl' ) {
$carousel.carousel('next');
} else {
$carousel.carousel('prev');
}
});
$carousel.find('.carousel-control.right').click(function() {
if ( $('html').attr('dir') == 'rtl' ) {
$carousel.carousel('prev');
} else {
$carousel.carousel('next');
}
});
});
});
$( document ).on( "s123.page.load", function( event ) {
var $sections = $('.s123-module-testimonials.layout-1');
$sections.each(function( index ) {
var $s = $(this);
var $carousel = $s.find('[data-ride="carousel"]');
/**
* Set the Testimonials items height to the higher item height
* to prevent layout from jumping
*/
$carousel.find('.item').css({
minHeight: Math.max.apply(Math, $carousel.find('.item').map(function() { return $(this).outerHeight(); }))
});
});
});
}/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a){a.fn.appear=function(b,c){var d=a.extend({data:void 0,one:!0,accX:0,accY:0},c);return this.each(function(){var c=a(this);if(c.appeared=!1,!b)return void c.trigger("appear",d.data);var e=a(window),f=function(){if(!c.is(":visible"))return void(c.appeared=!1);var a=e.scrollLeft(),b=e.scrollTop(),f=c.offset(),g=f.left,h=f.top,i=d.accX,j=d.accY,k=c.height(),l=e.height(),m=c.width(),n=e.width();h+k+j>=b&&b+l+j>=h&&g+m+i>=a&&a+n+i>=g?c.appeared||c.trigger("appear",d.data):c.appeared=!1},g=function(){if(c.appeared=!0,d.one){e.unbind("scroll",f);var g=a.inArray(f,a.fn.appear.checks);g>=0&&a.fn.appear.checks.splice(g,1)}b.apply(this,arguments)};d.one?c.one("appear",d.data,g):c.bind("appear",d.data,g),e.scroll(f),a.fn.appear.checks.push(f),f()})},a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var b=a.fn.appear.checks.length;if(b>0)for(;b--;)a.fn.appear.checks[b]()},run:function(){a.fn.appear.timeout&&clearTimeout(a.fn.appear.timeout),a.fn.appear.timeout=setTimeout(a.fn.appear.checkAll,20)}}),a.each(["append","prepend","after","before","attr","removeAttr","addClass","removeClass","toggleClass","remove","css","show","hide"],function(b,c){var d=a.fn[c];d&&(a.fn[c]=function(){var b=d.apply(this,arguments);return a.fn.appear.run(),b})})}(jQuery);!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.$element.is(":visible")?(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized"))):!1:!1},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),c=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return b>h-e&&h+e>b?d=a:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),-1===d},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=this._items.length,f=c?0:this._clones.length;return!a.isNumeric(b)||1>e?b=d:(0>b||b>=e+f)&&(b=((b-f/2)%e+e)%e+f/2),b},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c=this.settings,d=this._coordinates.length,e=Math.abs(this._coordinates[d-1])-this._width,f=-1;if(c.loop)d=this._clones.length/2+this._items.length-1;else if(c.autoWidth||c.merge)for(;d-f>1;)Math.abs(this._coordinates[b=d+f>>1])<e?f=b:d=b;else d=c.center?this._items.length-1:this._items.length-c.items;return a&&(d-=this._clones.length/2),Math.max(d,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(0>e),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&i>=d-e&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.leave("animating"),void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f)),h),f++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c);heights=[],maxheight=0,a.each(d,function(b,c){heights.push(a(c).height())}),maxheight=Math.max.apply(null,heights),this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="http://www.youtube.com/embed/'+f.id+"?autoplay=1&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type&&(c='<iframe src="http://player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name&&(this._core.settings.autoplay?this.play():this.stop())},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){
this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(d,e){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._interval=b.setInterval(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout))},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearInterval(this._interval),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;e>a;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):0>b&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){return g[b]!==d?(e=c?b:!0,!1):void 0}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);(function(b){b.gritter={};b.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:6000};b.gritter.add=function(f){try{return a.add(f||{})}catch(d){var c="Gritter Error: "+d;(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)}};b.gritter.remove=function(d,c){a.removeSpecific(d,c||{})};b.gritter.removeAll=function(c){a.stop(c||{})};var a={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(g){if(typeof(g)=="string"){g={text:g}}if(g.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var k=g.title,n=g.text,e=g.image||"",l=g.sticky||false,m=g.class_name||b.gritter.options.class_name,j=b.gritter.options.position,d=g.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,i=this._tpl_item;b(["before_open","after_open","before_close","after_close"]).each(function(p,q){a["_"+q+"_"+f]=(b.isFunction(g[q]))?g[q]:function(){}});this._custom_timer=0;if(d){this._custom_timer=d}var c=(e!="")?'<img src="'+e+'" class="gritter-image" />':"",h=(e!="")?"gritter-with-image":"gritter-without-image";if(k){k=this._str_replace("[[title]]",k,this._tpl_title)}else{k=""}i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[k,n,this._tpl_close,c,this._item_count,h,m],i);if(this["_before_open_"+f]()===false){return false}b("#gritter-notice-wrapper").addClass(j).append(i);var o=b("#gritter-item-"+this._item_count);o.fadeIn(this.fade_in_speed,function(){a["_after_open_"+f](b(this))});if(!l){this._setFadeTimer(o,f)}b(o).bind("mouseenter mouseleave",function(p){if(p.type=="mouseenter"){if(!l){a._restoreItemIfFading(b(this),f)}}else{if(!l){a._setFadeTimer(b(this),f)}}a._hoverState(b(this),p.type)});b(o).find(".gritter-close").click(function(){a.removeSpecific(f,{},null,true);return false;});return f},_countRemoveWrapper:function(c,d,f){d.remove();this["_after_close_"+c](d,f);if(b(".gritter-item-wrapper").length==0){b("#gritter-notice-wrapper").remove()}},_fade:function(g,d,j,f){var j=j||{},i=(typeof(j.fade)!="undefined")?j.fade:true,c=j.speed||this.fade_out_speed,h=f;this["_before_close_"+d](g,h);if(f){g.unbind("mouseenter mouseleave")}if(i){g.animate({opacity:0},c,function(){g.animate({height:0},300,function(){a._countRemoveWrapper(d,g,h)})})}else{this._countRemoveWrapper(d,g)}},_hoverState:function(d,c){if(c=="mouseenter"){d.addClass("hover");d.find(".gritter-close").show()}else{d.removeClass("hover");d.find(".gritter-close").hide()}},removeSpecific:function(c,g,f,d){if(!f){var f=b("#gritter-item-"+c)}this._fade(f,c,g||{},d)},_restoreItemIfFading:function(d,c){clearTimeout(this["_int_id_"+c]);d.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in b.gritter.options){this[opt]=b.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(f,d){var c=(this._custom_timer)?this._custom_timer:this.time;this["_int_id_"+d]=setTimeout(function(){a._fade(f,d)},c)},stop:function(e){var c=(b.isFunction(e.before_close))?e.before_close:function(){};var f=(b.isFunction(e.after_close))?e.after_close:function(){};var d=b("#gritter-notice-wrapper");c(d);d.fadeOut(function(){b(this).remove();f()})},_str_replace:function(v,e,o,n){var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;u=[].concat(u);if(n){this.window[n]=0}for(k=0,g=u.length;k<g;k++){if(u[k]===""){continue}for(h=0,q=l.length;h<q;h++){t=u[k]+"";m=d?(c[h]!==undefined?c[h]:""):c[0];u[k]=(t).split(l[h]).join(m);if(n&&u[k]!==t){this.window[n]+=(t.length-u[k].length)/l[h].length}}}return p?u:u[0]},_verifyWrapper:function(){if(b("#gritter-notice-wrapper").length==0){b("body").append(this._tpl_wrap)}}}})(jQuery);
/*!
Colorbox 1.6.4
license: MIT
http://www.jacklmoore.com/colorbox
*/
(function ($, document, window) {
var
defaults = {
html: false,
photo: false,
iframe: false,
inline: false,
transition: "elastic",
speed: 300,
fadeOut: 300,
width: false,
initialWidth: "600",
innerWidth: false,
maxWidth: false,
height: false,
initialHeight: "450",
innerHeight: false,
maxHeight: false,
scalePhotos: true,
scrolling: true,
opacity: 0.9,
preloading: true,
className: false,
overlayClose: true,
escKey: true,
arrowKey: true,
top: false,
bottom: false,
left: false,
right: false,
fixed: false,
data: undefined,
closeButton: true,
fastIframe: true,
open: false,
reposition: true,
loop: true,
slideshow: false,
slideshowAuto: true,
slideshowSpeed: 2500,
slideshowStart: "start slideshow",
slideshowStop: "stop slideshow",
photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
retinaImage: false,
retinaUrl: false,
retinaSuffix: '@2x.$1',
current: "image {current} of {total}",
previous: "previous",
next: "next",
close: "close",
xhrError: "This content failed to load.",
imgError: "This image failed to load.",
returnFocus: true,
trapFocus: true,
onOpen: false,
onLoad: false,
onComplete: false,
onCleanup: false,
onClosed: false,
rel: function() {
return this.rel;
},
href: function() {
return $(this).attr('href');
},
title: function() {
return this.title;
},
createImg: function() {
var img = new Image();
var attrs = $(this).data('cbox-img-attrs');
if (typeof attrs === 'object') {
$.each(attrs, function(key, val){
img[key] = val;
});
}
return img;
},
createIframe: function() {
var iframe = document.createElement('iframe');
var attrs = $(this).data('cbox-iframe-attrs');
if (typeof attrs === 'object') {
$.each(attrs, function(key, val){
iframe[key] = val;
});
}
if ('frameBorder' in iframe) {
iframe.frameBorder = 0;
}
if ('allowTransparency' in iframe) {
iframe.allowTransparency = "true";
}
iframe.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
iframe.allowFullscreen = true;
return iframe;
}
},
colorbox = 'colorbox',
prefix = 'cbox',
boxElement = prefix + 'Element',
event_open = prefix + '_open',
event_load = prefix + '_load',
event_complete = prefix + '_complete',
event_cleanup = prefix + '_cleanup',
event_closed = prefix + '_closed',
event_purge = prefix + '_purge',
$overlay,
$box,
$wrap,
$content,
$topBorder,
$leftBorder,
$rightBorder,
$bottomBorder,
$related,
$window,
$loaded,
$loadingBay,
$loadingOverlay,
$title,
$current,
$slideshow,
$next,
$prev,
$close,
$groupControls,
$events = $('<a/>'), // $({}) would be preferred, but there is an issue with jQuery 1.4.2
settings,
interfaceHeight,
interfaceWidth,
loadedHeight,
loadedWidth,
index,
photo,
open,
active,
closing,
loadingTimer,
publicMethod,
div = "div",
requests = 0,
previousCSS = {},
init;
function $tag(tag, id, css) {
var element = document.createElement(tag);
if (id) {
element.id = prefix + id;
}
if (css) {
element.style.cssText = css;
}
return $(element);
}
function winheight() {
return window.innerHeight ? window.innerHeight : $(window).height();
}
function Settings(element, options) {
if (options !== Object(options)) {
options = {};
}
this.cache = {};
this.el = element;
this.value = function(key) {
var dataAttr;
if (this.cache[key] === undefined) {
dataAttr = $(this.el).attr('data-cbox-'+key);
if (dataAttr !== undefined) {
this.cache[key] = dataAttr;
} else if (options[key] !== undefined) {
this.cache[key] = options[key];
} else if (defaults[key] !== undefined) {
this.cache[key] = defaults[key];
}
}
return this.cache[key];
};
this.get = function(key) {
var value = this.value(key);
return $.isFunction(value) ? value.call(this.el, this) : value;
};
}
function getIndex(increment) {
var
max = $related.length,
newIndex = (index + increment) % max;
return (newIndex < 0) ? max + newIndex : newIndex;
}
function setSize(size, dimension) {
return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
}
function isImage(settings, url) {
return settings.get('photo') || settings.get('photoRegex').test(url);
}
function retinaUrl(settings, url) {
return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
}
function trapFocus(e) {
if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {
e.stopPropagation();
$box.focus();
}
}
function setClass(str) {
if (setClass.str !== str) {
$box.add($overlay).removeClass(setClass.str).addClass(str);
setClass.str = str;
}
}
function getRelated(rel) {
index = 0;
if (rel && rel !== false && rel !== 'nofollow') {
$related = $('.' + boxElement).filter(function () {
var options = $.data(this, colorbox);
var settings = new Settings(this, options);
return (settings.get('rel') === rel);
});
index = $related.index(settings.el);
if (index === -1) {
$related = $related.add(settings.el);
index = $related.length - 1;
}
} else {
$related = $(settings.el);
}
}
function trigger(event) {
$(document).trigger(event);
$events.triggerHandler(event);
}
var slideshow = (function(){
var active,
className = prefix + "Slideshow_",
click = "click." + prefix,
timeOut;
function clear () {
clearTimeout(timeOut);
}
function set() {
if (settings.get('loop') || $related[index + 1]) {
clear();
timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
}
}
function start() {
$slideshow
.html(settings.get('slideshowStop'))
.unbind(click)
.one(click, stop);
$events
.bind(event_complete, set)
.bind(event_load, clear);
$box.removeClass(className + "off").addClass(className + "on");
}
function stop() {
clear();
$events
.unbind(event_complete, set)
.unbind(event_load, clear);
$slideshow
.html(settings.get('slideshowStart'))
.unbind(click)
.one(click, function () {
publicMethod.next();
start();
});
$box.removeClass(className + "on").addClass(className + "off");
}
function reset() {
active = false;
$slideshow.hide();
clear();
$events
.unbind(event_complete, set)
.unbind(event_load, clear);
$box.removeClass(className + "off " + className + "on");
}
return function(){
if (active) {
if (!settings.get('slideshow')) {
$events.unbind(event_cleanup, reset);
reset();
}
} else {
if (settings.get('slideshow') && $related[1]) {
active = true;
$events.one(event_cleanup, reset);
if (settings.get('slideshowAuto')) {
start();
} else {
stop();
}
$slideshow.show();
}
}
};
}());
function launch(element) {
var options;
if (!closing) {
options = $(element).data(colorbox);
settings = new Settings(element, options);
getRelated(settings.get('rel'));
if (!open) {
open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
setClass(settings.get('className'));
$box.css({visibility:'hidden', display:'block', opacity:''});
$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
$content.css({width:'', height:''}).append($loaded);
interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
loadedHeight = $loaded.outerHeight(true);
loadedWidth = $loaded.outerWidth(true);
var initialWidth = setSize(settings.get('initialWidth'), 'x');
var initialHeight = setSize(settings.get('initialHeight'), 'y');
var maxWidth = settings.get('maxWidth');
var maxHeight = settings.get('maxHeight');
settings.w = Math.max((maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth, 0);
settings.h = Math.max((maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight, 0);
$loaded.css({width:'', height:settings.h});
publicMethod.position();
trigger(event_open);
settings.get('onOpen');
$groupControls.add($title).hide();
$box.focus();
if (settings.get('trapFocus')) {
if (document.addEventListener) {
document.addEventListener('focus', trapFocus, true);
$events.one(event_closed, function () {
document.removeEventListener('focus', trapFocus, true);
});
}
}
if (settings.get('returnFocus')) {
$events.one(event_closed, function () {
$(settings.el).focus();
});
}
}
var opacity = parseFloat(settings.get('opacity'));
$overlay.css({
opacity: opacity === opacity ? opacity : '',
cursor: settings.get('overlayClose') ? 'pointer' : '',
visibility: 'visible'
}).show();
if (settings.get('closeButton')) {
$close.html(settings.get('close')).appendTo($content);
} else {
$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
}
load();
}
}
function appendHTML() {
if (!$box) {
init = false;
$window = $(window);
$box = $tag(div).attr({
id: colorbox,
'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
role: 'dialog',
tabindex: '-1'
}).hide();
$overlay = $tag(div, "Overlay").hide();
$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);
$wrap = $tag(div, "Wrapper");
$content = $tag(div, "Content").append(
$title = $tag(div, "Title"),
$current = $tag(div, "Current"),
$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),
$next = $('<button type="button"/>').attr({id:prefix+'Next'}),
$slideshow = $('<button type="button"/>').attr({id:prefix+'Slideshow'}),
$loadingOverlay
);
$close = $('<button type="button"/>').attr({id:prefix+'Close'});
$wrap.append( // The 3x3 Grid that makes up Colorbox
$tag(div).append(
$tag(div, "TopLeft"),
$topBorder = $tag(div, "TopCenter"),
$tag(div, "TopRight")
),
$tag(div, false, 'clear:left').append(
$leftBorder = $tag(div, "MiddleLeft"),
$content,
$rightBorder = $tag(div, "MiddleRight")
),
$tag(div, false, 'clear:left').append(
$tag(div, "BottomLeft"),
$bottomBorder = $tag(div, "BottomCenter"),
$tag(div, "BottomRight")
)
).find('div div').css({'float': 'left'});
$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');
$groupControls = $next.add($prev).add($current).add($slideshow);
}
if (document.body && !$box.parent().length) {
$(document.body).append($overlay, $box.append($wrap, $loadingBay));
}
}
function addBindings() {
function clickHandler(e) {
if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
e.preventDefault();
launch(this);
}
}
if ($box) {
if (!init) {
init = true;
$next.click(function () {
publicMethod.next();
});
$prev.click(function () {
publicMethod.prev();
});
$close.click(function () {
publicMethod.close();
});
$overlay.click(function () {
if (settings.get('overlayClose')) {
publicMethod.close();
}
});
$(document).bind('keydown.' + prefix, function (e) {
var key = e.keyCode;
if (open && settings.get('escKey') && key === 27) {
e.preventDefault();
publicMethod.close();
}
if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
if (key === 37) {
e.preventDefault();
$prev.click();
} else if (key === 39) {
e.preventDefault();
$next.click();
}
}
});
if ($.isFunction($.fn.on)) {
$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
} else {
$('.'+boxElement).live('click.'+prefix, clickHandler);
}
}
return true;
}
return false;
}
if ($[colorbox]) {
return;
}
$(appendHTML);
publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
var settings;
var $obj = this;
options = options || {};
if ($.isFunction($obj)) { // assume a call to $.colorbox
$obj = $('<a/>');
options.open = true;
}
if (!$obj[0]) { // colorbox being applied to empty collection
return $obj;
}
appendHTML();
if (addBindings()) {
if (callback) {
options.onComplete = callback;
}
$obj.each(function () {
var old = $.data(this, colorbox) || {};
$.data(this, colorbox, $.extend(old, options));
}).addClass(boxElement);
settings = new Settings($obj[0], options);
if (settings.get('open')) {
launch($obj[0]);
}
}
return $obj;
};
publicMethod.position = function (speed, loadedCallback) {
var
css,
top = 0,
left = 0,
offset = $box.offset(),
scrollTop,
scrollLeft;
$window.unbind('resize.' + prefix);
$box.css({top: -9e4, left: -9e4});
scrollTop = $window.scrollTop();
scrollLeft = $window.scrollLeft();
if (settings.get('fixed')) {
offset.top -= scrollTop;
offset.left -= scrollLeft;
$box.css({position: 'fixed'});
} else {
top = scrollTop;
left = scrollLeft;
$box.css({position: 'absolute'});
}
if (settings.get('right') !== false) {
left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
} else if (settings.get('left') !== false) {
left += setSize(settings.get('left'), 'x');
} else {
left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
}
if (settings.get('bottom') !== false) {
top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
} else if (settings.get('top') !== false) {
top += setSize(settings.get('top'), 'y');
} else {
top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
}
$box.css({top: offset.top, left: offset.left, visibility:'visible'});
$wrap[0].style.width = $wrap[0].style.height = "9999px";
function modalDimensions() {
$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';
$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';
}
css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};
if (speed) {
var tempSpeed = 0;
$.each(css, function(i){
if (css[i] !== previousCSS[i]) {
tempSpeed = speed;
return;
}
});
speed = tempSpeed;
}
previousCSS = css;
if (!speed) {
$box.css(css);
}
$box.dequeue().animate(css, {
duration: speed || 0,
complete: function () {
modalDimensions();
active = false;
$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
if (settings.get('reposition')) {
setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
$window.bind('resize.' + prefix, publicMethod.position);
}, 1);
}
if ($.isFunction(loadedCallback)) {
loadedCallback();
}
},
step: modalDimensions
});
};
publicMethod.resize = function (options) {
var scrolltop;
if (open) {
options = options || {};
if (options.width) {
settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
}
if (options.innerWidth) {
settings.w = setSize(options.innerWidth, 'x');
}
$loaded.css({width: settings.w});
if (options.height) {
settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
}
if (options.innerHeight) {
settings.h = setSize(options.innerHeight, 'y');
}
if (!options.innerHeight && !options.height) {
scrolltop = $loaded.scrollTop();
$loaded.css({height: "auto"});
settings.h = $loaded.height();
}
$loaded.css({height: settings.h});
if(scrolltop) {
$loaded.scrollTop(scrolltop);
}
publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
}
};
publicMethod.prep = function (object) {
if (!open) {
return;
}
var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');
$loaded.remove();
$loaded = $tag(div, 'LoadedContent').append(object);
function getWidth() {
settings.w = settings.w || $loaded.width();
settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
return settings.w;
}
function getHeight() {
settings.h = settings.h || $loaded.height();
settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
return settings.h;
}
$loaded.hide()
.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
.prependTo($content);
$loadingBay.hide();
$(photo).css({'float': 'none'});
setClass(settings.get('className'));
callback = function () {
var total = $related.length,
iframe,
complete;
if (!open) {
return;
}
function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
if ($.support.opacity === false) {
$box[0].style.removeAttribute('filter');
}
}
complete = function () {
clearTimeout(loadingTimer);
$loadingOverlay.hide();
trigger(event_complete);
settings.get('onComplete');
};
$title.html(settings.get('title')).show();
$loaded.show();
if (total > 1) { // handle grouping
if (typeof settings.get('current') === "string") {
$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
}
$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));
slideshow();
if (settings.get('preloading')) {
$.each([getIndex(-1), getIndex(1)], function(){
var img,
i = $related[this],
settings = new Settings(i, $.data(i, colorbox)),
src = settings.get('href');
if (src && isImage(settings, src)) {
src = retinaUrl(settings, src);
img = document.createElement('img');
img.src = src;
}
});
}
} else {
$groupControls.hide();
}
if (settings.get('iframe')) {
iframe = settings.get('createIframe');
if (!settings.get('scrolling')) {
iframe.scrolling = "no";
}
$(iframe)
.attr({
src: settings.get('href'),
'class': prefix + 'Iframe'
})
.one('load', complete)
.appendTo($loaded);
$events.one(event_purge, function () {
iframe.src = "//about:blank";
});
if (settings.get('fastIframe')) {
$(iframe).trigger('load');
}
} else {
complete();
}
if (settings.get('transition') === 'fade') {
$box.fadeTo(speed, 1, removeFilter);
} else {
removeFilter();
}
};
if (settings.get('transition') === 'fade') {
$box.fadeTo(speed, 0, function () {
publicMethod.position(0, callback);
});
} else {
publicMethod.position(speed, callback);
}
};
function load () {
var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;
active = true;
photo = false;
trigger(event_purge);
trigger(event_load);
settings.get('onLoad');
settings.h = settings.get('height') ?
setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');
settings.w = settings.get('width') ?
setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');
settings.mw = settings.w;
settings.mh = settings.h;
if (settings.get('maxWidth')) {
settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
}
if (settings.get('maxHeight')) {
settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
}
href = settings.get('href');
loadingTimer = setTimeout(function () {
$loadingOverlay.show();
}, 100);
if (settings.get('inline')) {
var $target = $(href).eq(0);
$inline = $('<div>').hide().insertBefore($target);
$events.one(event_purge, function () {
$inline.replaceWith($target);
});
prep($target);
} else if (settings.get('iframe')) {
prep(" ");
} else if (settings.get('html')) {
prep(settings.get('html'));
} else if (isImage(settings, href)) {
href = retinaUrl(settings, href);
photo = settings.get('createImg');
$(photo)
.addClass(prefix + 'Photo')
.bind('error.'+prefix,function () {
prep($tag(div, 'Error').html(settings.get('imgError')));
})
.one('load', function () {
if (request !== requests) {
return;
}
setTimeout(function(){
var percent;
if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
photo.height = photo.height / window.devicePixelRatio;
photo.width = photo.width / window.devicePixelRatio;
}
if (settings.get('scalePhotos')) {
setResize = function () {
photo.height -= photo.height * percent;
photo.width -= photo.width * percent;
};
if (settings.mw && photo.width > settings.mw) {
percent = (photo.width - settings.mw) / photo.width;
setResize();
}
if (settings.mh && photo.height > settings.mh) {
percent = (photo.height - settings.mh) / photo.height;
setResize();
}
}
if (settings.h) {
photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
}
if ($related[1] && (settings.get('loop') || $related[index + 1])) {
photo.style.cursor = 'pointer';
$(photo).bind('click.'+prefix, function () {
publicMethod.next();
});
}
photo.style.width = photo.width + 'px';
photo.style.height = photo.height + 'px';
prep(photo);
}, 1);
});
photo.src = href;
} else if (href) {
$loadingBay.load(href, settings.get('data'), function (data, status) {
if (request === requests) {
prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
}
});
}
}
publicMethod.next = function () {
if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
index = getIndex(1);
launch($related[index]);
}
};
publicMethod.prev = function () {
if (!active && $related[1] && (settings.get('loop') || index)) {
index = getIndex(-1);
launch($related[index]);
}
};
publicMethod.close = function () {
if (open && !closing) {
closing = true;
open = false;
trigger(event_cleanup);
settings.get('onCleanup');
$window.unbind('.' + prefix);
$overlay.fadeTo(settings.get('fadeOut') || 0, 0);
$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
$box.hide();
$overlay.hide();
trigger(event_purge);
$loaded.remove();
setTimeout(function () {
closing = false;
trigger(event_closed);
settings.get('onClosed');
}, 1);
});
}
};
publicMethod.remove = function () {
if (!$box) { return; }
$box.stop();
$[colorbox].close();
$box.stop(false, true).remove();
$overlay.remove();
closing = false;
$box = null;
$('.' + boxElement)
.removeData(colorbox)
.removeClass(boxElement);
$(document).unbind('click.'+prefix).unbind('keydown.'+prefix);
};
publicMethod.element = function () {
return $(settings.el);
};
publicMethod.settings = defaults;
}(jQuery, document, window));/** @license


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20150601
*/
(function(h,g){function K(sb,K){function ha(b){return c.preferFlash&&H&&!c.ignoreFlash&&c.flash[b]!==g&&c.flash[b]}function r(b){return function(d){var e=this._s;e&&e._a?d=b.call(this,d):(e&&e.id?c._wD(e.id+": Ignoring "+d.type):c._wD("HTML5::Ignoring "+d.type),d=null);return d}}this.setupOptions={url:'/files/soundmanagerv297a-20150601/swf/',flashVersion:8,debugMode:!1,debugFlash:!1,useConsole:!0,consoleOnly:!0,waitForWindowLoad:!1,bgColor:"#ffffff",useHighPerformance:!1,flashPollingInterval:null,html5PollingInterval:null,flashLoadTimeout:1E3,
wmode:null,allowScriptAccess:"always",useFlashBlock:!1,useHTML5Audio:!0,forceUseGlobalHTML5Audio:!1,ignoreMobileRestrictions:!1,html5Test:/^(probably|maybe)$/i,preferFlash:!1,noSWFCache:!1,idPrefix:"sound"};this.defaultOptions={autoLoad:!1,autoPlay:!1,from:null,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onposition:null,onstop:null,onfailure:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,stream:!0,to:null,type:null,
usePolicyFile:!1,volume:100};this.flash9Options={isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a","m4b"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},
ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},opus:{type:["audio/ogg; codecs=opus","audio/opus"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:!1}};this.movieID="sm2-container";this.id=K||"sm2movie";this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.versionNumber="V2.97a.20150601";this.altURL=this.movieURL=this.version=null;this.enabled=this.swfLoaded=!1;this.oMC=null;this.sounds={};this.soundIDs=[];this.didFlashBlock=
this.muted=!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},description:null,noRemote:null,noLocal:null};this.html5=
{usingFlash:null};this.flash={};this.ignoreFlash=this.html5Only=!1;var W,c=this,Ya=null,l=null,F,v=navigator.userAgent,ia=h.location.href.toString(),m=document,ya,Za,za,n,I=[],Aa=!0,D,X=!1,Y=!1,q=!1,y=!1,ja=!1,p,tb=0,Z,A,Ba,R,Ca,P,S,T,$a,Da,Ea,ka,z,la,Q,Fa,aa,ma,na,U,ab,Ga,bb=["log","info","warn","error"],cb,Ha,db,ba=null,Ia=null,t,Ja,V,eb,oa,pa,L,w,ca=!1,Ka=!1,fb,gb,hb,qa=0,da=null,ra,M=[],ea,u=null,ib,sa,fa,N,ta,La,jb,x,kb=Array.prototype.slice,C=!1,Ma,H,Na,lb,J,mb,Oa,ua,nb=0,Pa,Qa=v.match(/(ipad|iphone|ipod)/i),
Ra=v.match(/android/i),O=v.match(/msie/i),ub=v.match(/webkit/i),va=v.match(/safari/i)&&!v.match(/chrome/i),Sa=v.match(/opera/i),wa=v.match(/(mobile|pre\/|xoom)/i)||Qa||Ra,Ta=!ia.match(/usehtml5audio/i)&&!ia.match(/sm2\-ignorebadua/i)&&va&&!v.match(/silk/i)&&v.match(/OS X 10_6_([3-7])/i),Ua=h.console!==g&&console.log!==g,Va=m.hasFocus!==g?m.hasFocus():null,xa=va&&(m.hasFocus===g||!m.hasFocus()),ob=!xa,pb=/(mp3|mp4|mpa|m4a|m4b)/i,ga=m.location?m.location.protocol.match(/http/i):null,vb=ga?"":"http://",
qb=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,rb="mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),wb=new RegExp("\\.("+rb.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!ga;var Wa;try{Wa=Audio!==g&&(Sa&&opera!==g&&10>opera.version()?new Audio(null):new Audio).canPlayType!==g}catch(xb){Wa=!1}this.hasHTML5=Wa;this.setup=function(b){var d=!c.url;b!==g&&q&&u&&c.ok()&&(b.flashVersion!==g||
b.url!==g||b.html5Test!==g)&&L(t("setupLate"));Ba(b);if(!C)if(wa){if(!c.setupOptions.ignoreMobileRestrictions||c.setupOptions.forceUseGlobalHTML5Audio)M.push(z.globalHTML5),C=!0}else c.setupOptions.forceUseGlobalHTML5Audio&&(M.push(z.globalHTML5),C=!0);if(!Pa&&wa)if(c.setupOptions.ignoreMobileRestrictions)M.push(z.ignoreMobile);else if(c.setupOptions.useHTML5Audio&&!c.setupOptions.preferFlash||c._wD(z.mobileUA),c.setupOptions.useHTML5Audio=!0,c.setupOptions.preferFlash=!1,Qa)c.ignoreFlash=!0;else if(Ra&&
!v.match(/android\s2\.3/i)||!Ra)c._wD(z.globalHTML5),C=!0;b&&(d&&aa&&b.url!==g&&c.beginDelayedInit(),aa||b.url===g||"complete"!==m.readyState||setTimeout(Q,1));Pa=!0;return c};this.supported=this.ok=function(){return u?q&&!y:c.useHTML5Audio&&c.hasHTML5};this.getMovie=function(c){return F(c)||m[c]||h[c]};this.createSound=function(b,d){function e(){f=oa(f);c.sounds[f.id]=new W(f);c.soundIDs.push(f.id);return c.sounds[f.id]}var a,f;a=null;a="soundManager.createSound(): "+t(q?"notOK":"notReady");if(!q||
!c.ok())return L(a),!1;d!==g&&(b={id:b,url:d});f=A(b);f.url=ra(f.url);f.id===g&&(f.id=c.setupOptions.idPrefix+nb++);f.id.toString().charAt(0).match(/^[0-9]$/)&&c._wD("soundManager.createSound(): "+t("badID",f.id),2);c._wD("soundManager.createSound(): "+f.id+(f.url?" ("+f.url+")":""),1);if(w(f.id,!0))return c._wD("soundManager.createSound(): "+f.id+" exists",1),c.sounds[f.id];if(sa(f))a=e(),c.html5Only||c._wD(f.id+": Using HTML5"),a._setup_html5(f);else{if(c.html5Only)return c._wD(f.id+": No HTML5 support for this sound, and no Flash. Exiting."),
e();if(c.html5.usingFlash&&f.url&&f.url.match(/data\:/i))return c._wD(f.id+": data: URIs not supported via Flash. Exiting."),e();8<n&&(null===f.isMovieStar&&(f.isMovieStar=!!(f.serverURL||f.type&&f.type.match(qb)||f.url&&f.url.match(wb))),f.isMovieStar&&(c._wD("soundManager.createSound(): using MovieStar handling"),1<f.loops&&p("noNSLoop")));f=pa(f,"soundManager.createSound(): ");a=e();8===n?l._createSound(f.id,f.loops||1,f.usePolicyFile):(l._createSound(f.id,f.url,f.usePeakData,f.useWaveformData,
f.useEQData,f.isMovieStar,f.isMovieStar?f.bufferTime:!1,f.loops||1,f.serverURL,f.duration||null,f.autoPlay,!0,f.autoLoad,f.usePolicyFile),f.serverURL||(a.connected=!0,f.onconnect&&f.onconnect.apply(a)));f.serverURL||!f.autoLoad&&!f.autoPlay||a.load(f)}!f.serverURL&&f.autoPlay&&a.play();return a};this.destroySound=function(b,d){if(!w(b))return!1;var e=c.sounds[b],a;e.stop();e._iO={};e.unload();for(a=0;a<c.soundIDs.length;a++)if(c.soundIDs[a]===b){c.soundIDs.splice(a,1);break}d||e.destruct(!0);delete c.sounds[b];
return!0};this.load=function(b,d){return w(b)?c.sounds[b].load(d):!1};this.unload=function(b){return w(b)?c.sounds[b].unload():!1};this.onposition=this.onPosition=function(b,d,e,a){return w(b)?c.sounds[b].onposition(d,e,a):!1};this.clearOnPosition=function(b,d,e){return w(b)?c.sounds[b].clearOnPosition(d,e):!1};this.start=this.play=function(b,d){var e=null,a=d&&!(d instanceof Object);if(!q||!c.ok())return L("soundManager.play(): "+t(q?"notOK":"notReady")),!1;if(w(b,a))a&&(d={url:d});else{if(!a)return!1;
a&&(d={url:d});d&&d.url&&(c._wD('soundManager.play(): Attempting to create "'+b+'"',1),d.id=b,e=c.createSound(d).play())}null===e&&(e=c.sounds[b].play(d));return e};this.setPosition=function(b,d){return w(b)?c.sounds[b].setPosition(d):!1};this.stop=function(b){if(!w(b))return!1;c._wD("soundManager.stop("+b+")",1);return c.sounds[b].stop()};this.stopAll=function(){var b;c._wD("soundManager.stopAll()",1);for(b in c.sounds)c.sounds.hasOwnProperty(b)&&c.sounds[b].stop()};this.pause=function(b){return w(b)?
c.sounds[b].pause():!1};this.pauseAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].pause()};this.resume=function(b){return w(b)?c.sounds[b].resume():!1};this.resumeAll=function(){var b;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){return w(b)?c.sounds[b].togglePause():!1};this.setPan=function(b,d){return w(b)?c.sounds[b].setPan(d):!1};this.setVolume=function(b,d){var e,a;if(b===g||isNaN(b)||d!==g)return w(b)?c.sounds[b].setVolume(d):
!1;e=0;for(a=c.soundIDs.length;e<a;e++)c.sounds[c.soundIDs[e]].setVolume(b)};this.mute=function(b){var d=0;b instanceof String&&(b=null);if(b){if(!w(b))return!1;c._wD('soundManager.mute(): Muting "'+b+'"');return c.sounds[b].mute()}c._wD("soundManager.mute(): Muting all sounds");for(d=c.soundIDs.length-1;0<=d;d--)c.sounds[c.soundIDs[d]].mute();return c.muted=!0};this.muteAll=function(){c.mute()};this.unmute=function(b){b instanceof String&&(b=null);if(b){if(!w(b))return!1;c._wD('soundManager.unmute(): Unmuting "'+
b+'"');return c.sounds[b].unmute()}c._wD("soundManager.unmute(): Unmuting all sounds");for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].unmute();c.muted=!1;return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){return w(b)?c.sounds[b].toggleMute():!1};this.getMemoryUse=function(){var c=0;l&&8!==n&&(c=parseInt(l._getMemoryUse(),10));return c};this.disable=function(b){var d;b===g&&(b=!1);if(y)return!1;y=!0;p("shutdown",1);for(d=c.soundIDs.length-1;0<=d;d--)cb(c.sounds[c.soundIDs[d]]);
Z(b);x.remove(h,"load",S);return!0};this.canPlayMIME=function(b){var d;c.hasHTML5&&(d=fa({type:b}));!d&&u&&(d=b&&c.ok()?!!(8<n&&b.match(qb)||b.match(c.mimePattern)):null);return d};this.canPlayURL=function(b){var d;c.hasHTML5&&(d=fa({url:b}));!d&&u&&(d=b&&c.ok()?!!b.match(c.filePattern):null);return d};this.canPlayLink=function(b){return b.type!==g&&b.type&&c.canPlayMIME(b.type)?!0:c.canPlayURL(b.href)};this.getSoundById=function(b,d){if(!b)return null;var e=c.sounds[b];e||d||c._wD('soundManager.getSoundById(): Sound "'+
b+'" not found.',2);return e};this.onready=function(b,d){if("function"===typeof b)q&&c._wD(t("queue","onready")),d||(d=h),Ca("onready",b,d),P();else throw t("needFunction","onready");return!0};this.ontimeout=function(b,d){if("function"===typeof b)q&&c._wD(t("queue","ontimeout")),d||(d=h),Ca("ontimeout",b,d),P({type:"ontimeout"});else throw t("needFunction","ontimeout");return!0};this._writeDebug=function(b,d){var e,a;if(!c.setupOptions.debugMode)return!1;if(Ua&&c.useConsole){if(d&&"object"===typeof d)console.log(b,
d);else if(bb[d]!==g)console[bb[d]](b);else console.log(b);if(c.consoleOnly)return!0}e=F("soundmanager-debug");if(!e)return!1;a=m.createElement("div");0===++tb%2&&(a.className="sm2-alt");d=d===g?0:parseInt(d,10);a.appendChild(m.createTextNode(b));d&&(2<=d&&(a.style.fontWeight="bold"),3===d&&(a.style.color="#ff3333"));e.insertBefore(a,e.firstChild);return!0};-1!==ia.indexOf("sm2-debug=alert")&&(this._writeDebug=function(c){h.alert(c)});this._wD=this._writeDebug;this._debug=function(){var b,d;p("currentObj",
1);b=0;for(d=c.soundIDs.length;b<d;b++)c.sounds[c.soundIDs[b]]._debug()};this.reboot=function(b,d){c.soundIDs.length&&c._wD("Destroying "+c.soundIDs.length+" SMSound object"+(1!==c.soundIDs.length?"s":"")+"...");var e,a,f;for(e=c.soundIDs.length-1;0<=e;e--)c.sounds[c.soundIDs[e]].destruct();if(l)try{O&&(Ia=l.innerHTML),ba=l.parentNode.removeChild(l)}catch(g){p("badRemove",2)}Ia=ba=u=l=null;c.enabled=aa=q=ca=Ka=X=Y=y=C=c.swfLoaded=!1;c.soundIDs=[];c.sounds={};nb=0;Pa=!1;if(b)I=[];else for(e in I)if(I.hasOwnProperty(e))for(a=
0,f=I[e].length;a<f;a++)I[e][a].fired=!1;d||c._wD("soundManager: Rebooting...");c.html5={usingFlash:null};c.flash={};c.html5Only=!1;c.ignoreFlash=!1;h.setTimeout(function(){d||c.beginDelayedInit()},20);return c};this.reset=function(){p("reset");return c.reboot(!0,!0)};this.getMoviePercent=function(){return l&&"PercentLoaded"in l?l.PercentLoaded():null};this.beginDelayedInit=function(){ja=!0;Q();setTimeout(function(){if(Ka)return!1;na();la();return Ka=!0},20);T()};this.destruct=function(){c._wD("soundManager.destruct()");
c.disable(!0)};W=function(b){var d,e,a=this,f,h,k,G,m,q,r=!1,E=[],v=0,Xa,y,u=null,z;e=d=null;this.sID=this.id=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=A(b);this.pan=this.options.pan;this.volume=this.options.volume;this.isHTML5=!1;this._a=null;z=this.url?!1:!0;this.id3={};this._debug=function(){c._wD(a.id+": Merged options:",a.options)};this.load=function(b){var d=null,e;b!==g?a._iO=A(b,a.options):(b=a.options,a._iO=b,u&&u!==a.url&&(p("manURL"),a._iO.url=a.url,a.url=null));a._iO.url||
(a._iO.url=a.url);a._iO.url=ra(a._iO.url);e=a.instanceOptions=a._iO;c._wD(a.id+": load ("+e.url+")");if(!e.url&&!a.url)return c._wD(a.id+": load(): url is unassigned. Exiting.",2),a;a.isHTML5||8!==n||a.url||e.autoPlay||c._wD(a.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1);if(e.url===a.url&&0!==a.readyState&&2!==a.readyState)return p("onURL",1),3===a.readyState&&e.onload&&ua(a,function(){e.onload.apply(a,[!!a.duration])}),a;a.loaded=!1;a.readyState=1;a.playState=0;a.id3=
{};if(sa(e))d=a._setup_html5(e),d._called_load?c._wD(a.id+": Ignoring request to load again"):(a._html5_canplay=!1,a.url!==e.url&&(c._wD(p("manURL")+": "+e.url),a._a.src=e.url,a.setPosition(0)),a._a.autobuffer="auto",a._a.preload="auto",a._a._called_load=!0);else{if(c.html5Only)return c._wD(a.id+": No flash support. Exiting."),a;if(a._iO.url&&a._iO.url.match(/data\:/i))return c._wD(a.id+": data: URIs not supported via Flash. Exiting."),a;try{a.isHTML5=!1,a._iO=pa(oa(e)),a._iO.autoPlay&&(a._iO.position||
a._iO.from)&&(c._wD(a.id+": Disabling autoPlay because of non-zero offset case"),a._iO.autoPlay=!1),e=a._iO,8===n?l._load(a.id,e.url,e.stream,e.autoPlay,e.usePolicyFile):l._load(a.id,e.url,!!e.stream,!!e.autoPlay,e.loops||1,!!e.autoLoad,e.usePolicyFile)}catch(f){p("smError",2),D("onload",!1),U({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:!0})}}a.url=e.url;return a};this.unload=function(){0!==a.readyState&&(c._wD(a.id+": unload()"),a.isHTML5?(G(),a._a&&(a._a.pause(),u=ta(a._a))):8===n?l._unload(a.id,"about:blank"):
l._unload(a.id),f());return a};this.destruct=function(b){c._wD(a.id+": Destruct");a.isHTML5?(G(),a._a&&(a._a.pause(),ta(a._a),C||k(),a._a._s=null,a._a=null)):(a._iO.onfailure=null,l._destroySound(a.id));b||c.destroySound(a.id,!0)};this.start=this.play=function(b,d){var e,f,k,G,h,B=!0,B=null;e=a.id+": play(): ";d=d===g?!0:d;b||(b={});a.url&&(a._iO.url=a.url);a._iO=A(a._iO,a.options);a._iO=A(b,a._iO);a._iO.url=ra(a._iO.url);a.instanceOptions=a._iO;if(!a.isHTML5&&a._iO.serverURL&&!a.connected)return a.getAutoPlay()||
(c._wD(e+" Netstream not connected yet - setting autoPlay"),a.setAutoPlay(!0)),a;sa(a._iO)&&(a._setup_html5(a._iO),m());1!==a.playState||a.paused||((f=a._iO.multiShot)?c._wD(e+"Already playing (multi-shot)",1):(c._wD(e+"Already playing (one-shot)",1),a.isHTML5&&a.setPosition(a._iO.position),B=a));if(null!==B)return B;b.url&&b.url!==a.url&&(a.readyState||a.isHTML5||8!==n||!z?a.load(a._iO):z=!1);a.loaded?c._wD(e.substr(0,e.lastIndexOf(":"))):0===a.readyState?(c._wD(e+"Attempting to load"),a.isHTML5||
c.html5Only?a.isHTML5?a.load(a._iO):(c._wD(e+"Unsupported type. Exiting."),B=a):(a._iO.autoPlay=!0,a.load(a._iO)),a.instanceOptions=a._iO):2===a.readyState?(c._wD(e+"Could not load - exiting",2),B=a):c._wD(e+"Loading - attempting to play...");if(null!==B)return B;!a.isHTML5&&9===n&&0<a.position&&a.position===a.duration&&(c._wD(e+"Sound at end, resetting to position: 0"),b.position=0);if(a.paused&&0<=a.position&&(!a._iO.serverURL||0<a.position))c._wD(e+"Resuming from paused state",1),a.resume();else{a._iO=
A(b,a._iO);if((!a.isHTML5&&null!==a._iO.position&&0<a._iO.position||null!==a._iO.from&&0<a._iO.from||null!==a._iO.to)&&0===a.instanceCount&&0===a.playState&&!a._iO.serverURL){f=function(){a._iO=A(b,a._iO);a.play(a._iO)};a.isHTML5&&!a._html5_canplay?(c._wD(e+"Beginning load for non-zero offset case"),a.load({_oncanplay:f}),B=!1):a.isHTML5||a.loaded||a.readyState&&2===a.readyState||(c._wD(e+"Preloading for non-zero offset case"),a.load({onload:f}),B=!1);if(null!==B)return B;a._iO=y()}(!a.instanceCount||
a._iO.multiShotEvents||a.isHTML5&&a._iO.multiShot&&!C||!a.isHTML5&&8<n&&!a.getAutoPlay())&&a.instanceCount++;a._iO.onposition&&0===a.playState&&q(a);a.playState=1;a.paused=!1;a.position=a._iO.position===g||isNaN(a._iO.position)?0:a._iO.position;a.isHTML5||(a._iO=pa(oa(a._iO)));a._iO.onplay&&d&&(a._iO.onplay.apply(a),r=!0);a.setVolume(a._iO.volume,!0);a.setPan(a._iO.pan,!0);a.isHTML5?2>a.instanceCount?(m(),e=a._setup_html5(),a.setPosition(a._iO.position),e.play()):(c._wD(a.id+": Cloning Audio() for instance #"+
a.instanceCount+"..."),k=new Audio(a._iO.url),G=function(){x.remove(k,"ended",G);a._onfinish(a);ta(k);k=null},h=function(){x.remove(k,"canplay",h);try{k.currentTime=a._iO.position/1E3}catch(c){L(a.id+": multiShot play() failed to apply position of "+a._iO.position/1E3)}k.play()},x.add(k,"ended",G),a._iO.volume!==g&&(k.volume=Math.max(0,Math.min(1,a._iO.volume/100))),a.muted&&(k.muted=!0),a._iO.position?x.add(k,"canplay",h):k.play()):(B=l._start(a.id,a._iO.loops||1,9===n?a.position:a.position/1E3,
a._iO.multiShot||!1),9!==n||B||(c._wD(e+"No sound hardware, or 32-sound ceiling hit",2),a._iO.onplayerror&&a._iO.onplayerror.apply(a)))}return a};this.stop=function(b){var d=a._iO;1===a.playState&&(c._wD(a.id+": stop()"),a._onbufferchange(0),a._resetOnPosition(0),a.paused=!1,a.isHTML5||(a.playState=0),Xa(),d.to&&a.clearOnPosition(d.to),a.isHTML5?a._a&&(b=a.position,a.setPosition(0),a.position=b,a._a.pause(),a.playState=0,a._onTimer(),G()):(l._stop(a.id,b),d.serverURL&&a.unload()),a.instanceCount=
0,a._iO={},d.onstop&&d.onstop.apply(a));return a};this.setAutoPlay=function(b){c._wD(a.id+": Autoplay turned "+(b?"on":"off"));a._iO.autoPlay=b;a.isHTML5||(l._setAutoPlay(a.id,b),b&&!a.instanceCount&&1===a.readyState&&(a.instanceCount++,c._wD(a.id+": Incremented instance count to "+a.instanceCount)))};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPosition=function(b){b===g&&(b=0);var d=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=d;b=a.position/
1E3;a._resetOnPosition(a.position);a._iO.position=d;if(!a.isHTML5)b=9===n?a.position:b,a.readyState&&2!==a.readyState&&l._setPosition(a.id,b,a.paused||!a.playState,a._iO.multiShot);else if(a._a){if(a._html5_canplay){if(a._a.currentTime!==b){c._wD(a.id+": setPosition("+b+")");try{a._a.currentTime=b,(0===a.playState||a.paused)&&a._a.pause()}catch(e){c._wD(a.id+": setPosition("+b+") failed: "+e.message,2)}}}else if(b)return c._wD(a.id+": setPosition("+b+"): Cannot seek yet, sound not ready",2),a;a.paused&&
a._onTimer(!0)}return a};this.pause=function(b){if(a.paused||0===a.playState&&1!==a.readyState)return a;c._wD(a.id+": pause()");a.paused=!0;a.isHTML5?(a._setup_html5().pause(),G()):(b||b===g)&&l._pause(a.id,a._iO.multiShot);a._iO.onpause&&a._iO.onpause.apply(a);return a};this.resume=function(){var b=a._iO;if(!a.paused)return a;c._wD(a.id+": resume()");a.paused=!1;a.playState=1;a.isHTML5?(a._setup_html5().play(),m()):(b.isMovieStar&&!b.serverURL&&a.setPosition(a.position),l._pause(a.id,b.multiShot));
!r&&b.onplay?(b.onplay.apply(a),r=!0):b.onresume&&b.onresume.apply(a);return a};this.togglePause=function(){c._wD(a.id+": togglePause()");if(0===a.playState)return a.play({position:9!==n||a.isHTML5?a.position/1E3:a.position}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(c,b){c===g&&(c=0);b===g&&(b=!1);a.isHTML5||l._setPan(a.id,c);a._iO.pan=c;b||(a.pan=c,a.options.pan=c);return a};this.setVolume=function(b,d){b===g&&(b=100);d===g&&(d=!1);a.isHTML5?a._a&&(c.muted&&!a.muted&&(a.muted=
!0,a._a.muted=!0),a._a.volume=Math.max(0,Math.min(1,b/100))):l._setVolume(a.id,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;d||(a.volume=b,a.options.volume=b);return a};this.mute=function(){a.muted=!0;a.isHTML5?a._a&&(a._a.muted=!0):l._setVolume(a.id,0);return a};this.unmute=function(){a.muted=!1;var b=a._iO.volume!==g;a.isHTML5?a._a&&(a._a.muted=!1):l._setVolume(a.id,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?a.unmute():a.mute()};this.onposition=this.onPosition=
function(b,c,d){E.push({position:parseInt(b,10),method:c,scope:d!==g?d:a,fired:!1});return a};this.clearOnPosition=function(a,b){var c;a=parseInt(a,10);if(isNaN(a))return!1;for(c=0;c<E.length;c++)a!==E[c].position||b&&b!==E[c].method||(E[c].fired&&v--,E.splice(c,1))};this._processOnPosition=function(){var b,c;b=E.length;if(!b||!a.playState||v>=b)return!1;for(--b;0<=b;b--)c=E[b],!c.fired&&a.position>=c.position&&(c.fired=!0,v++,c.method.apply(c.scope,[c.position]));return!0};this._resetOnPosition=
function(a){var b,c;b=E.length;if(!b)return!1;for(--b;0<=b;b--)c=E[b],c.fired&&a<=c.position&&(c.fired=!1,v--);return!0};y=function(){var b=a._iO,d=b.from,e=b.to,f,g;g=function(){c._wD(a.id+': "To" time of '+e+" reached.");a.clearOnPosition(e,g);a.stop()};f=function(){c._wD(a.id+': Playing "from" '+d);if(null!==e&&!isNaN(e))a.onPosition(e,g)};null===d||isNaN(d)||(b.position=d,b.multiShot=!1,f());return b};q=function(){var b,c=a._iO.onposition;if(c)for(b in c)if(c.hasOwnProperty(b))a.onPosition(parseInt(b,
10),c[b])};Xa=function(){var b,c=a._iO.onposition;if(c)for(b in c)c.hasOwnProperty(b)&&a.clearOnPosition(parseInt(b,10))};m=function(){a.isHTML5&&fb(a)};G=function(){a.isHTML5&&gb(a)};f=function(b){b||(E=[],v=0);r=!1;a._hasTimer=null;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.buffered=[];a.eqData=[];a.eqData.left=[];a.eqData.right=[];a.failures=0;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=
0;a.loaded=!1;a.metadata={};a.readyState=0;a.muted=!1;a.paused=!1;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.playState=0;a.position=null;a.id3={}};f();this._onTimer=function(b){var c,f=!1,g={};if(a._hasTimer||b)return a._a&&(b||(0<a.playState||1===a.readyState)&&!a.paused)&&(c=a._get_html5_duration(),c!==d&&(d=c,a.duration=c,f=!0),a.durationEstimate=a.duration,c=1E3*a._a.currentTime||0,c!==e&&(e=c,f=!0),(f||b)&&a._whileplaying(c,g,g,g,g)),f};this._get_html5_duration=function(){var b=
a._iO;return(b=a._a&&a._a.duration?1E3*a._a.duration:b&&b.duration?b.duration:null)&&!isNaN(b)&&Infinity!==b?b:null};this._apply_loop=function(a,b){!a.loop&&1<b&&c._wD("Note: Native HTML5 looping is infinite.",1);a.loop=1<b?"loop":""};this._setup_html5=function(b){b=A(a._iO,b);var c=C?Ya:a._a,d=decodeURI(b.url),e;C?d===decodeURI(Ma)&&(e=!0):d===decodeURI(u)&&(e=!0);if(c){if(c._s)if(C)c._s&&c._s.playState&&!e&&c._s.stop();else if(!C&&d===decodeURI(u))return a._apply_loop(c,b.loops),c;e||(u&&f(!1),
c.src=b.url,Ma=u=a.url=b.url,c._called_load=!1)}else b.autoLoad||b.autoPlay?(a._a=new Audio(b.url),a._a.load()):a._a=Sa&&10>opera.version()?new Audio(null):new Audio,c=a._a,c._called_load=!1,C&&(Ya=c);a.isHTML5=!0;a._a=c;c._s=a;h();a._apply_loop(c,b.loops);b.autoLoad||b.autoPlay?a.load():(c.autobuffer=!1,c.preload="auto");return c};h=function(){if(a._a._added_events)return!1;var b;a._a._added_events=!0;for(b in J)J.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,J[b],!1);return!0};k=function(){var b;
c._wD(a.id+": Removing event listeners");a._a._added_events=!1;for(b in J)J.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,J[b],!1)};this._onload=function(b){var d=!!b||!a.isHTML5&&8===n&&a.duration;b=a.id+": ";c._wD(b+(d?"onload()":"Failed to load / invalid sound?"+(a.duration?" -":" Zero-length duration reported.")+" ("+a.url+")"),d?1:2);d||a.isHTML5||(!0===c.sandbox.noRemote&&c._wD(b+t("noNet"),1),!0===c.sandbox.noLocal&&c._wD(b+t("noLocal"),1));a.loaded=d;a.readyState=d?3:2;a._onbufferchange(0);
a._iO.onload&&ua(a,function(){a._iO.onload.apply(a,[d])});return!0};this._onbufferchange=function(b){if(0===a.playState||b&&a.isBuffering||!b&&!a.isBuffering)return!1;a.isBuffering=1===b;a._iO.onbufferchange&&(c._wD(a.id+": Buffer state change: "+b),a._iO.onbufferchange.apply(a,[b]));return!0};this._onsuspend=function(){a._iO.onsuspend&&(c._wD(a.id+": Playback suspended"),a._iO.onsuspend.apply(a));return!0};this._onfailure=function(b,d,e){a.failures++;c._wD(a.id+": Failure ("+a.failures+"): "+b);
if(a._iO.onfailure&&1===a.failures)a._iO.onfailure(b,d,e);else c._wD(a.id+": Ignoring failure")};this._onwarning=function(b,c,d){if(a._iO.onwarning)a._iO.onwarning(b,c,d)};this._onfinish=function(){var b=a._iO.onfinish;a._onbufferchange(0);a._resetOnPosition(0);a.instanceCount&&(a.instanceCount--,a.instanceCount||(Xa(),a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},G(),a.isHTML5&&(a.position=0)),a.instanceCount&&!a._iO.multiShotEvents||!b||(c._wD(a.id+": onfinish()"),ua(a,
function(){b.apply(a)})))};this._whileloading=function(b,c,d,e){var f=a._iO;a.bytesLoaded=b;a.bytesTotal=c;a.duration=Math.floor(d);a.bufferLength=e;a.durationEstimate=a.isHTML5||f.isMovieStar?a.duration:f.duration?a.duration>f.duration?a.duration:f.duration:parseInt(a.bytesTotal/a.bytesLoaded*a.duration,10);a.isHTML5||(a.buffered=[{start:0,end:a.duration}]);(3!==a.readyState||a.isHTML5)&&f.whileloading&&f.whileloading.apply(a)};this._whileplaying=function(b,c,d,e,f){var k=a._iO;if(isNaN(b)||null===
b)return!1;a.position=Math.max(0,b);a._processOnPosition();!a.isHTML5&&8<n&&(k.usePeakData&&c!==g&&c&&(a.peakData={left:c.leftPeak,right:c.rightPeak}),k.useWaveformData&&d!==g&&d&&(a.waveformData={left:d.split(","),right:e.split(",")}),k.useEQData&&f!==g&&f&&f.leftEQ&&(b=f.leftEQ.split(","),a.eqData=b,a.eqData.left=b,f.rightEQ!==g&&f.rightEQ&&(a.eqData.right=f.rightEQ.split(","))));1===a.playState&&(a.isHTML5||8!==n||a.position||!a.isBuffering||a._onbufferchange(0),k.whileplaying&&k.whileplaying.apply(a));
return!0};this._oncaptiondata=function(b){c._wD(a.id+": Caption data received.");a.captiondata=b;a._iO.oncaptiondata&&a._iO.oncaptiondata.apply(a,[b])};this._onmetadata=function(b,d){c._wD(a.id+": Metadata received.");var e={},f,g;f=0;for(g=b.length;f<g;f++)e[b[f]]=d[f];a.metadata=e;a._iO.onmetadata&&a._iO.onmetadata.call(a,a.metadata)};this._onid3=function(b,d){c._wD(a.id+": ID3 data received.");var e=[],f,g;f=0;for(g=b.length;f<g;f++)e[b[f]]=d[f];a.id3=A(a.id3,e);a._iO.onid3&&a._iO.onid3.apply(a)};
this._onconnect=function(b){b=1===b;c._wD(a.id+": "+(b?"Connected.":"Failed to connect? - "+a.url),b?1:2);if(a.connected=b)a.failures=0,w(a.id)&&(a.getAutoPlay()?a.play(g,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._ondataerror=function(b){0<a.playState&&(c._wD(a.id+": Data error: "+b),a._iO.ondataerror&&a._iO.ondataerror.apply(a))};this._debug()};ma=function(){return m.body||m.getElementsByTagName("div")[0]};F=function(b){return m.getElementById(b)};
A=function(b,d){var e=b||{},a,f;a=d===g?c.defaultOptions:d;for(f in a)a.hasOwnProperty(f)&&e[f]===g&&(e[f]="object"!==typeof a[f]||null===a[f]?a[f]:A(e[f],a[f]));return e};ua=function(b,c){b.isHTML5||8!==n?c():h.setTimeout(c,0)};R={onready:1,ontimeout:1,defaultOptions:1,flash9Options:1,movieStarOptions:1};Ba=function(b,d){var e,a=!0,f=d!==g,h=c.setupOptions;if(b===g){a=[];for(e in h)h.hasOwnProperty(e)&&a.push(e);for(e in R)R.hasOwnProperty(e)&&("object"===typeof c[e]?a.push(e+": {...}"):c[e]instanceof
Function?a.push(e+": function() {...}"):a.push(e));c._wD(t("setup",a.join(", ")));return!1}for(e in b)if(b.hasOwnProperty(e))if("object"!==typeof b[e]||null===b[e]||b[e]instanceof Array||b[e]instanceof RegExp)f&&R[d]!==g?c[d][e]=b[e]:h[e]!==g?(c.setupOptions[e]=b[e],c[e]=b[e]):R[e]===g?(L(t(c[e]===g?"setupUndef":"setupError",e),2),a=!1):c[e]instanceof Function?c[e].apply(c,b[e]instanceof Array?b[e]:[b[e]]):c[e]=b[e];else if(R[e]===g)L(t(c[e]===g?"setupUndef":"setupError",e),2),a=!1;else return Ba(b[e],
e);return a};x=function(){function b(a){a=kb.call(a);var b=a.length;e?(a[1]="on"+a[1],3<b&&a.pop()):3===b&&a.push(!1);return a}function c(b,d){var g=b.shift(),h=[a[d]];if(e)g[h](b[0],b[1]);else g[h].apply(g,b)}var e=h.attachEvent,a={add:e?"attachEvent":"addEventListener",remove:e?"detachEvent":"removeEventListener"};return{add:function(){c(b(arguments),"add")},remove:function(){c(b(arguments),"remove")}}}();J={abort:r(function(){c._wD(this._s.id+": abort")}),canplay:r(function(){var b=this._s,d;if(b._html5_canplay)return!0;
b._html5_canplay=!0;c._wD(b.id+": canplay");b._onbufferchange(0);d=b._iO.position===g||isNaN(b._iO.position)?null:b._iO.position/1E3;if(this.currentTime!==d){c._wD(b.id+": canplay: Setting position to "+d);try{this.currentTime=d}catch(e){c._wD(b.id+": canplay: Setting position of "+d+" failed: "+e.message,2)}}b._iO._oncanplay&&b._iO._oncanplay()}),canplaythrough:r(function(){var b=this._s;b.loaded||(b._onbufferchange(0),b._whileloading(b.bytesLoaded,b.bytesTotal,b._get_html5_duration()),b._onload(!0))}),
durationchange:r(function(){var b=this._s,d;d=b._get_html5_duration();isNaN(d)||d===b.duration||(c._wD(this._s.id+": durationchange ("+d+")"+(b.duration?", previously "+b.duration:"")),b.durationEstimate=b.duration=d)}),ended:r(function(){var b=this._s;c._wD(b.id+": ended");b._onfinish()}),error:r(function(){c._wD(this._s.id+": HTML5 error, code "+this.error.code);this._s._onload(!1)}),loadeddata:r(function(){var b=this._s;c._wD(b.id+": loadeddata");b._loaded||va||(b.duration=b._get_html5_duration())}),
loadedmetadata:r(function(){c._wD(this._s.id+": loadedmetadata")}),loadstart:r(function(){c._wD(this._s.id+": loadstart");this._s._onbufferchange(1)}),play:r(function(){this._s._onbufferchange(0)}),playing:r(function(){c._wD(this._s.id+": playing "+String.fromCharCode(9835));this._s._onbufferchange(0)}),progress:r(function(b){var d=this._s,e,a,f;e=0;var g="progress"===b.type,k=b.target.buffered,h=b.loaded||0,m=b.total||1;d.buffered=[];if(k&&k.length){e=0;for(a=k.length;e<a;e++)d.buffered.push({start:1E3*
k.start(e),end:1E3*k.end(e)});e=1E3*(k.end(0)-k.start(0));h=Math.min(1,e/(1E3*b.target.duration));if(g&&1<k.length){f=[];a=k.length;for(e=0;e<a;e++)f.push(1E3*b.target.buffered.start(e)+"-"+1E3*b.target.buffered.end(e));c._wD(this._s.id+": progress, timeRanges: "+f.join(", "))}g&&!isNaN(h)&&c._wD(this._s.id+": progress, "+Math.floor(100*h)+"% loaded")}isNaN(h)||(d._whileloading(h,m,d._get_html5_duration()),h&&m&&h===m&&J.canplaythrough.call(this,b))}),ratechange:r(function(){c._wD(this._s.id+": ratechange")}),
suspend:r(function(b){var d=this._s;c._wD(this._s.id+": suspend");J.progress.call(this,b);d._onsuspend()}),stalled:r(function(){c._wD(this._s.id+": stalled")}),timeupdate:r(function(){this._s._onTimer()}),waiting:r(function(){var b=this._s;c._wD(this._s.id+": waiting");b._onbufferchange(1)})};sa=function(b){return b&&(b.type||b.url||b.serverURL)?b.serverURL||b.type&&ha(b.type)?!1:b.type?fa({type:b.type}):fa({url:b.url})||c.html5Only||b.url.match(/data\:/i):!1};ta=function(b){var d;b&&(d=va?"about:blank":
c.html5.canPlayType("audio/wav")?"data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==":"about:blank",b.src=d,b._called_unload!==g&&(b._called_load=!1));C&&(Ma=null);return d};fa=function(b){if(!c.useHTML5Audio||!c.hasHTML5)return!1;var d=b.url||null;b=b.type||null;var e=c.audioFormats,a;if(b&&c.html5[b]!==g)return c.html5[b]&&!ha(b);if(!N){N=[];for(a in e)e.hasOwnProperty(a)&&(N.push(a),e[a].related&&(N=N.concat(e[a].related)));N=new RegExp("\\.("+N.join("|")+
")(\\?.*)?$","i")}(a=d?d.toLowerCase().match(N):null)&&a.length?a=a[1]:b&&(d=b.indexOf(";"),a=(-1!==d?b.substr(0,d):b).substr(6));a&&c.html5[a]!==g?d=c.html5[a]&&!ha(a):(b="audio/"+a,d=c.html5.canPlayType({type:b}),d=(c.html5[a]=d)&&c.html5[b]&&!ha(b));return d};jb=function(){function b(a){var b,e=b=!1;if(!d||"function"!==typeof d.canPlayType)return b;if(a instanceof Array){k=0;for(b=a.length;k<b;k++)if(c.html5[a[k]]||d.canPlayType(a[k]).match(c.html5Test))e=!0,c.html5[a[k]]=!0,c.flash[a[k]]=!!a[k].match(pb);
b=e}else a=d&&"function"===typeof d.canPlayType?d.canPlayType(a):!1,b=!(!a||!a.match(c.html5Test));return b}if(!c.useHTML5Audio||!c.hasHTML5)return u=c.html5.usingFlash=!0,!1;var d=Audio!==g?Sa&&10>opera.version()?new Audio(null):new Audio:null,e,a,f={},h,k;h=c.audioFormats;for(e in h)if(h.hasOwnProperty(e)&&(a="audio/"+e,f[e]=b(h[e].type),f[a]=f[e],e.match(pb)?(c.flash[e]=!0,c.flash[a]=!0):(c.flash[e]=!1,c.flash[a]=!1),h[e]&&h[e].related))for(k=h[e].related.length-1;0<=k;k--)f["audio/"+h[e].related[k]]=
f[e],c.html5[h[e].related[k]]=f[e],c.flash[h[e].related[k]]=f[e];f.canPlayType=d?b:null;c.html5=A(c.html5,f);c.html5.usingFlash=ib();u=c.html5.usingFlash;return!0};z={notReady:"Unavailable - wait until onready() has fired.",notOK:"Audio support is not available.",domError:"soundManagerexception caught while appending SWF to DOM.",spcWmode:"Removing wmode, preventing known SWF loading issue(s)",swf404:"soundManager: Verify that %s is a valid path.",tryDebug:"Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",localFail:"soundManager: Non-HTTP page ("+m.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",waitFocus:"soundManager: Special case: Waiting for SWF to load with window focus...",waitForever:"soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF:"soundManager: Waiting for 100% SWF load...",needFunction:"soundManager: Function object expected for %s",badID:'Sound ID "%s" should be a string, starting with a non-numeric character',currentObj:"soundManager: _debug(): Current sound objects",waitOnload:"soundManager: Waiting for window.onload()",docLoaded:"soundManager: Document already loaded",onload:"soundManager: initComplete(): calling soundManager.onload()",onloadOK:"soundManager.onload() complete",didInit:"soundManager: init(): Already called?",
secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",badRemove:"soundManager: Failed to remove Flash node.",shutdown:"soundManager.disable(): Shutting down",queue:"soundManager: Queueing %s handler",smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",fbTimeout:"No flash response, applying .swf_timedout CSS...",
fbLoaded:"Flash loaded",fbHandler:"soundManager: flashBlockHandler()",manURL:"SMSound.load(): Using manually-assigned URL",onURL:"soundManager.load(): current URL already assigned.",badFV:'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",noNSLoop:"Note: Looping not implemented for MovieStar formats",needfl9:"Note: Switching to flash 9, required for MP4 formats.",mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash:"soundManager: Fatal error: Flash is needed to play some required formats, but is not available.",gotFocus:"soundManager: Got window focus.",policy:"Enabling usePolicyFile for data access",setup:"soundManager.setup(): allowed parameters: %s",setupError:'soundManager.setup(): "%s" cannot be assigned with this method.',setupUndef:'soundManager.setup(): Could not find option "%s"',setupLate:"soundManager.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL:"soundManager: Flash URL required. Call soundManager.setup({url:...}) to get started.",sm2Loaded:"SoundManager 2: Ready. "+String.fromCharCode(10003),reset:"soundManager.reset(): Removing event callbacks",mobileUA:"Mobile UA detected, preferring HTML5 by default.",globalHTML5:"Using singleton HTML5 Audio() pattern for this device.",ignoreMobile:"Ignoring mobile restrictions for this device."};t=function(){var b,c,e,a;b=kb.call(arguments);c=b.shift();if((a=z&&z[c]?z[c]:"")&&b&&b.length)for(c=
0,e=b.length;c<e;c++)a=a.replace("%s",b[c]);return a};oa=function(b){8===n&&1<b.loops&&b.stream&&(p("as2loop"),b.stream=!1);return b};pa=function(b,d){b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||b.useEQData)&&(c._wD((d||"")+t("policy")),b.usePolicyFile=!0);return b};L=function(b){Ua&&console.warn!==g?console.warn(b):c._wD(b)};ya=function(){return!1};cb=function(b){for(var c in b)b.hasOwnProperty(c)&&"function"===typeof b[c]&&(b[c]=ya)};Ha=function(b){b===g&&(b=!1);(y||b)&&c.disable(b)};
db=function(b){var d=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(d=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+="/");b=(b&&-1!==b.lastIndexOf("/")?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL;c.noSWFCache&&(b+="?ts="+(new Date).getTime());return b};Ea=function(){n=parseInt(c.flashVersion,10);8!==n&&9!==n&&(c._wD(t("badFV",n,8)),c.flashVersion=n=8);var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";c.useHTML5Audio&&!c.html5Only&&c.audioFormats.mp4.required&&
9>n&&(c._wD(t("needfl9")),c.flashVersion=n=9);c.version=c.versionNumber+(c.html5Only?" (HTML5-only mode)":9===n?" (AS3/Flash 9)":" (AS2/Flash 8)");8<n?(c.defaultOptions=A(c.defaultOptions,c.flash9Options),c.features.buffering=!0,c.defaultOptions=A(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=new RegExp("\\.(mp3|"+rb.join("|")+")(\\?.*)?$","i"),c.features.movieStar=!0):c.features.movieStar=!1;c.filePattern=c.filePatterns[8!==n?"flash9":"flash8"];c.movieURL=(8===n?"soundmanager2.swf":
"soundmanager2_flash9.swf").replace(".swf",b);c.features.peakData=c.features.waveformData=c.features.eqData=8<n};ab=function(b,c){if(!l)return!1;l._setPolling(b,c)};Ga=function(){c.debugURLParam.test(ia)&&(c.setupOptions.debugMode=c.debugMode=!0);if(F(c.debugID))return!1;var b,d,e,a;if(!(!c.debugMode||F(c.debugID)||Ua&&c.useConsole&&c.consoleOnly)){b=m.createElement("div");b.id=c.debugID+"-toggle";d={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",
textAlign:"center",border:"1px solid #999",cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};b.appendChild(m.createTextNode("-"));b.onclick=eb;b.title="Toggle SM2 debug console";v.match(/msie 6/i)&&(b.style.position="absolute",b.style.cursor="hand");for(a in d)d.hasOwnProperty(a)&&(b.style[a]=d[a]);d=m.createElement("div");d.id=c.debugID;d.style.display=c.debugMode?"block":"none";if(c.debugMode&&!F(b.id)){try{e=ma(),e.appendChild(b)}catch(f){throw Error(t("domError")+" \n"+f.toString());
}e.appendChild(d)}}};w=this.getSoundById;p=function(b,d){return b?c._wD(t(b),d):""};eb=function(){var b=F(c.debugID),d=F(c.debugID+"-toggle");if(!b)return!1;Aa?(d.innerHTML="+",b.style.display="none"):(d.innerHTML="-",b.style.display="block");Aa=!Aa};D=function(b,c,e){if(h.sm2Debugger!==g)try{sm2Debugger.handleEvent(b,c,e)}catch(a){return!1}return!0};V=function(){var b=[];c.debugMode&&b.push("sm2_debug");c.debugFlash&&b.push("flash_debug");c.useHighPerformance&&b.push("high_performance");return b.join(" ")};
Ja=function(){var b=t("fbHandler"),d=c.getMoviePercent(),e={type:"FLASHBLOCK"};if(c.html5Only)return!1;c.ok()?(c.didFlashBlock&&c._wD(b+": Unblocked"),c.oMC&&(c.oMC.className=[V(),"movieContainer","swf_loaded"+(c.didFlashBlock?" swf_unblocked":"")].join(" "))):(u&&(c.oMC.className=V()+" movieContainer "+(null===d?"swf_timedout":"swf_error"),c._wD(b+": "+t("fbTimeout")+(d?" ("+t("fbLoaded")+")":""))),c.didFlashBlock=!0,P({type:"ontimeout",ignoreInit:!0,error:e}),U(e))};Ca=function(b,c,e){I[b]===g&&
(I[b]=[]);I[b].push({method:c,scope:e||null,fired:!1})};P=function(b){b||(b={type:c.ok()?"onready":"ontimeout"});if(!q&&b&&!b.ignoreInit||"ontimeout"===b.type&&(c.ok()||y&&!b.ignoreInit))return!1;var d={success:b&&b.ignoreInit?c.ok():!y},e=b&&b.type?I[b.type]||[]:[],a=[],f,d=[d],g=u&&!c.ok();b.error&&(d[0].error=b.error);b=0;for(f=e.length;b<f;b++)!0!==e[b].fired&&a.push(e[b]);if(a.length)for(b=0,f=a.length;b<f;b++)a[b].scope?a[b].method.apply(a[b].scope,d):a[b].method.apply(this,d),g||(a[b].fired=
!0);return!0};S=function(){h.setTimeout(function(){c.useFlashBlock&&Ja();P();"function"===typeof c.onload&&(p("onload",1),c.onload.apply(h),p("onloadOK",1));c.waitForWindowLoad&&x.add(h,"load",S)},1)};Na=function(){if(H!==g)return H;var b=!1,c=navigator,e=c.plugins,a,f=h.ActiveXObject;if(e&&e.length)(c=c.mimeTypes)&&c["application/x-shockwave-flash"]&&c["application/x-shockwave-flash"].enabledPlugin&&c["application/x-shockwave-flash"].enabledPlugin.description&&(b=!0);else if(f!==g&&!v.match(/MSAppHost/i)){try{a=
new f("ShockwaveFlash.ShockwaveFlash")}catch(m){a=null}b=!!a}return H=b};ib=function(){var b,d,e=c.audioFormats;Qa&&v.match(/os (1|2|3_0|3_1)\s/i)?(c.hasHTML5=!1,c.html5Only=!0,c.oMC&&(c.oMC.style.display="none")):c.useHTML5Audio&&(c.html5&&c.html5.canPlayType||(c._wD("SoundManager: No HTML5 Audio() support detected."),c.hasHTML5=!1),Ta&&c._wD("soundManager: Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(H?"will use flash fallback for MP3/MP4, if available":
" would use flash fallback for MP3/MP4, but none detected."),1));if(c.useHTML5Audio&&c.hasHTML5)for(d in ea=!0,e)e.hasOwnProperty(d)&&e[d].required&&(c.html5.canPlayType(e[d].type)?c.preferFlash&&(c.flash[d]||c.flash[e[d].type])&&(b=!0):(ea=!1,b=!0));c.ignoreFlash&&(b=!1,ea=!0);c.html5Only=c.hasHTML5&&c.useHTML5Audio&&!b;return!c.html5Only};ra=function(b){var d,e,a=0;if(b instanceof Array){d=0;for(e=b.length;d<e;d++)if(b[d]instanceof Object){if(c.canPlayMIME(b[d].type)){a=d;break}}else if(c.canPlayURL(b[d])){a=
d;break}b[a].url&&(b[a]=b[a].url);b=b[a]}return b};fb=function(b){b._hasTimer||(b._hasTimer=!0,!wa&&c.html5PollingInterval&&(null===da&&0===qa&&(da=setInterval(hb,c.html5PollingInterval)),qa++))};gb=function(b){b._hasTimer&&(b._hasTimer=!1,!wa&&c.html5PollingInterval&&qa--)};hb=function(){var b;if(null!==da&&!qa)return clearInterval(da),da=null,!1;for(b=c.soundIDs.length-1;0<=b;b--)c.sounds[c.soundIDs[b]].isHTML5&&c.sounds[c.soundIDs[b]]._hasTimer&&c.sounds[c.soundIDs[b]]._onTimer()};U=function(b){b=
b!==g?b:{};"function"===typeof c.onerror&&c.onerror.apply(h,[{type:b.type!==g?b.type:null}]);b.fatal!==g&&b.fatal&&c.disable()};lb=function(){if(!Ta||!Na())return!1;var b=c.audioFormats,d,e;for(e in b)if(b.hasOwnProperty(e)&&("mp3"===e||"mp4"===e)&&(c._wD("soundManager: Using flash fallback for "+e+" format"),c.html5[e]=!1,b[e]&&b[e].related))for(d=b[e].related.length-1;0<=d;d--)c.html5[b[e].related[d]]=!1};this._setSandboxType=function(b){var d=c.sandbox;d.type=b;d.description=d.types[d.types[b]!==
g?b:"unknown"];"localWithFile"===d.type?(d.noRemote=!0,d.noLocal=!1,p("secNote",2)):"localWithNetwork"===d.type?(d.noRemote=!1,d.noLocal=!0):"localTrusted"===d.type&&(d.noRemote=!1,d.noLocal=!1)};this._externalInterfaceOK=function(b){if(c.swfLoaded)return!1;var d;D("swf",!0);D("flashtojs",!0);c.swfLoaded=!0;xa=!1;Ta&&lb();if(!b||b.replace(/\+dev/i,"")!==c.versionNumber.replace(/\+dev/i,""))return d='soundManager: Fatal: JavaScript file build "'+c.versionNumber+'" does not match Flash SWF build "'+
b+'" at '+c.url+". Ensure both are up-to-date.",setTimeout(function(){throw Error(d);},0),!1;setTimeout(za,O?100:1)};na=function(b,d){function e(){var a=[],b,d=[];b="SoundManager "+c.version+(!c.html5Only&&c.useHTML5Audio?c.hasHTML5?" + HTML5 audio":", no HTML5 audio support":"");c.html5Only?c.html5PollingInterval&&a.push("html5PollingInterval ("+c.html5PollingInterval+"ms)"):(c.preferFlash&&a.push("preferFlash"),c.useHighPerformance&&a.push("useHighPerformance"),c.flashPollingInterval&&a.push("flashPollingInterval ("+
c.flashPollingInterval+"ms)"),c.html5PollingInterval&&a.push("html5PollingInterval ("+c.html5PollingInterval+"ms)"),c.wmode&&a.push("wmode ("+c.wmode+")"),c.debugFlash&&a.push("debugFlash"),c.useFlashBlock&&a.push("flashBlock"));a.length&&(d=d.concat([a.join(" + ")]));c._wD(b+(d.length?" + "+d.join(", "):""),1);mb()}function a(a,b){return'<param name="'+a+'" value="'+b+'" />'}if(X&&Y)return!1;if(c.html5Only)return Ea(),e(),c.oMC=F(c.movieID),za(),Y=X=!0,!1;var f=d||c.url,h=c.altURL||f,k=ma(),l=V(),
n=null,n=m.getElementsByTagName("html")[0],p,r,q,n=n&&n.dir&&n.dir.match(/rtl/i);b=b===g?c.id:b;Ea();c.url=db(ga?f:h);d=c.url;c.wmode=!c.wmode&&c.useHighPerformance?"transparent":c.wmode;null!==c.wmode&&(v.match(/msie 8/i)||!O&&!c.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(M.push(z.spcWmode),c.wmode=null);k={name:b,id:b,src:d,quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:vb+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",
type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};c.debugFlash&&(k.FlashVars="debug=1");c.wmode||delete k.wmode;if(O)f=m.createElement("div"),r=['<object id="'+b+'" data="'+d+'" type="'+k.type+'" title="'+k.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',a("movie",d),a("AllowScriptAccess",c.allowScriptAccess),a("quality",k.quality),c.wmode?a("wmode",c.wmode):"",a("bgcolor",
c.bgColor),a("hasPriority","true"),c.debugFlash?a("FlashVars",k.FlashVars):"","</object>"].join("");else for(p in f=m.createElement("embed"),k)k.hasOwnProperty(p)&&f.setAttribute(p,k[p]);Ga();l=V();if(k=ma())if(c.oMC=F(c.movieID)||m.createElement("div"),c.oMC.id)q=c.oMC.className,c.oMC.className=(q?q+" ":"movieContainer")+(l?" "+l:""),c.oMC.appendChild(f),O&&(p=c.oMC.appendChild(m.createElement("div")),p.className="sm2-object-box",p.innerHTML=r),Y=!0;else{c.oMC.id=c.movieID;c.oMC.className="movieContainer "+
l;p=l=null;c.useFlashBlock||(c.useHighPerformance?l={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}:(l={position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"},n&&(l.left=Math.abs(parseInt(l.left,10))+"px")));ub&&(c.oMC.style.zIndex=1E4);if(!c.debugFlash)for(q in l)l.hasOwnProperty(q)&&(c.oMC.style[q]=l[q]);try{O||c.oMC.appendChild(f),k.appendChild(c.oMC),O&&(p=c.oMC.appendChild(m.createElement("div")),p.className="sm2-object-box",p.innerHTML=
r),Y=!0}catch(u){throw Error(t("domError")+" \n"+u.toString());}}X=!0;e();return!0};la=function(){if(c.html5Only)return na(),!1;if(l)return!1;if(!c.url)return p("noURL"),!1;l=c.getMovie(c.id);l||(ba?(O?c.oMC.innerHTML=Ia:c.oMC.appendChild(ba),ba=null,X=!0):na(c.id,c.url),l=c.getMovie(c.id));"function"===typeof c.oninitmovie&&setTimeout(c.oninitmovie,1);Oa();return!0};T=function(){setTimeout($a,1E3)};Da=function(){h.setTimeout(function(){L("soundManager: useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...");
c.setup({preferFlash:!1}).reboot();c.didFlashBlock=!0;c.beginDelayedInit()},1)};$a=function(){var b,d=!1;if(!c.url||ca)return!1;ca=!0;x.remove(h,"load",T);if(H&&xa&&!Va)return p("waitFocus"),!1;q||(b=c.getMoviePercent(),0<b&&100>b&&(d=!0));setTimeout(function(){b=c.getMoviePercent();if(d)return ca=!1,c._wD(t("waitSWF")),h.setTimeout(T,1),!1;q||(c._wD("soundManager: No Flash response within expected time. Likely causes: "+(0===b?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(c.debugFlash?
" "+t("checkSWF"):""),2),!ga&&b&&(p("localFail",2),c.debugFlash||p("tryDebug",2)),0===b&&c._wD(t("swf404",c.url),1),D("flashtojs",!1,": Timed out"+(ga?" (Check flash security or flash blockers)":" (No plugin/missing SWF?)")));!q&&ob&&(null===b?c.useFlashBlock||0===c.flashLoadTimeout?(c.useFlashBlock&&Ja(),p("waitForever")):!c.useFlashBlock&&ea?Da():(p("waitForever"),P({type:"ontimeout",ignoreInit:!0,error:{type:"INIT_FLASHBLOCK"}})):0===c.flashLoadTimeout?p("waitForever"):!c.useFlashBlock&&ea?Da():
Ha(!0))},c.flashLoadTimeout)};ka=function(){if(Va||!xa)return x.remove(h,"focus",ka),!0;Va=ob=!0;p("gotFocus");ca=!1;T();x.remove(h,"focus",ka);return!0};Oa=function(){M.length&&(c._wD("SoundManager 2: "+M.join(" "),1),M=[])};mb=function(){Oa();var b,d=[];if(c.useHTML5Audio&&c.hasHTML5){for(b in c.audioFormats)c.audioFormats.hasOwnProperty(b)&&d.push(b+" = "+c.html5[b]+(!c.html5[b]&&u&&c.flash[b]?" (using flash)":c.preferFlash&&c.flash[b]&&u?" (preferring flash)":c.html5[b]?"":" ("+(c.audioFormats[b].required?
"required, ":"")+"and no flash support)"));c._wD("SoundManager 2 HTML5 support: "+d.join(", "),1)}};Z=function(b){if(q)return!1;if(c.html5Only)return p("sm2Loaded",1),q=!0,S(),D("onload",!0),!0;var d=!0,e;c.useFlashBlock&&c.flashLoadTimeout&&!c.getMoviePercent()||(q=!0);e={type:!H&&u?"NO_FLASH":"INIT_TIMEOUT"};c._wD("SoundManager 2 "+(y?"failed to load":"loaded")+" ("+(y?"Flash security/load error":"OK")+") "+String.fromCharCode(y?10006:10003),y?2:1);y||b?(c.useFlashBlock&&c.oMC&&(c.oMC.className=
V()+" "+(null===c.getMoviePercent()?"swf_timedout":"swf_error")),P({type:"ontimeout",error:e,ignoreInit:!0}),D("onload",!1),U(e),d=!1):D("onload",!0);y||(c.waitForWindowLoad&&!ja?(p("waitOnload"),x.add(h,"load",S)):(c.waitForWindowLoad&&ja&&p("docLoaded"),S()));return d};Za=function(){var b,d=c.setupOptions;for(b in d)d.hasOwnProperty(b)&&(c[b]===g?c[b]=d[b]:c[b]!==d[b]&&(c.setupOptions[b]=c[b]))};za=function(){if(q)return p("didInit"),!1;if(c.html5Only)return q||(x.remove(h,"load",c.beginDelayedInit),
c.enabled=!0,Z()),!0;la();try{l._externalInterfaceTest(!1),ab(!0,c.flashPollingInterval||(c.useHighPerformance?10:50)),c.debugMode||l._disableDebug(),c.enabled=!0,D("jstoflash",!0),c.html5Only||x.add(h,"unload",ya)}catch(b){return c._wD("js/flash exception: "+b.toString()),D("jstoflash",!1),U({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),Ha(!0),Z(),!1}Z();x.remove(h,"load",c.beginDelayedInit);return!0};Q=function(){if(aa)return!1;aa=!0;Za();Ga();!H&&c.hasHTML5&&(c._wD("SoundManager 2: No Flash detected"+
(c.useHTML5Audio?". Trying HTML5-only mode.":", enabling HTML5."),1),c.setup({useHTML5Audio:!0,preferFlash:!1}));jb();!H&&u&&(M.push(z.needFlash),c.setup({flashLoadTimeout:1}));m.removeEventListener&&m.removeEventListener("DOMContentLoaded",Q,!1);la();return!0};La=function(){"complete"===m.readyState&&(Q(),m.detachEvent("onreadystatechange",La));return!0};Fa=function(){ja=!0;Q();x.remove(h,"load",Fa)};Na();x.add(h,"focus",ka);x.add(h,"load",T);x.add(h,"load",Fa);m.addEventListener?m.addEventListener("DOMContentLoaded",
Q,!1):m.attachEvent?m.attachEvent("onreadystatechange",La):(D("onload",!1),U({type:"NO_DOM2_EVENTS",fatal:!0}))}if(!h||!h.document)throw Error("SoundManager requires a browser with window and document objects.");var W=null;h.SM2_DEFER!==g&&SM2_DEFER||(W=new K);"object"===typeof module&&module&&"object"===typeof module.exports?(module.exports.SoundManager=K,module.exports.soundManager=W):"function"===typeof define&&define.amd&&define(function(){return{constructor:K,getInstance:function(g){!h.soundManager&&
g instanceof Function&&(g=g(K),g instanceof K&&(h.soundManager=g));return h.soundManager}}});h.SoundManager=K;h.soundManager=W})(window);﻿/*jslint plusplus: true, white: true, nomen: true */
/*global console, document, navigator, soundManager, window */
(function(window) {
/**
* SoundManager 2: "Bar UI" player
* Copyright (c) 2014, Scott Schiller. All rights reserved.
* http://www.schillmania.com/projects/soundmanager2/
* Code provided under BSD license.
* http://schillmania.com/projects/soundmanager2/license.txt
*/
"use strict";
var Player,
players = [],
playerSelector = '.sm2-bar-ui',
playerOptions,
utils;
/**
* Slightly hackish: event callbacks.
* Override globally by setting window.sm2BarPlayers.on = {}, or individually by window.sm2BarPlayers[0].on = {} etc.
*/
players.on = {
/*
play: function(player) {
console.log('playing', player);
},
finish: function(player) {
console.log('finish', player);
},
pause: function(player) {
console.log('pause', player);
},
error: function(player) {
console.log('error', player);
}
end: function(player) {
console.log('end', player);
}
*/
};
playerOptions = {
stopOtherSounds: true,
excludeClass: 'sm2-exclude'
};
soundManager.setup({
html5PollingInterval: 50,
flashVersion: 9
});
soundManager.onready(function() {
var nodes, i, j;
nodes = utils.dom.getAll(playerSelector);
if (nodes && nodes.length) {
for (i=0, j=nodes.length; i<j; i++) {
players.push(new Player(nodes[i]));
}
}
});
/**
* player bits
*/
Player = function(playerNode) {
var css, dom, extras, playlistController, soundObject, actions, actionData, defaultItem, defaultVolume, firstOpen, exports;
css = {
disabled: 'disabled',
selected: 'selected',
active: 'active',
legacy: 'legacy',
noVolume: 'no-volume',
playlistOpen: 'playlist-open'
};
dom = {
o: null,
playlist: null,
playlistTarget: null,
playlistContainer: null,
time: null,
player: null,
progress: null,
progressTrack: null,
progressBar: null,
duration: null,
volume: null
};
extras = {
loadFailedCharacter: '<span title="Failed to load/play." class="load-error">✖</span>'
};
function stopOtherSounds() {
if (playerOptions.stopOtherSounds) {
soundManager.stopAll();
}
}
function callback(method) {
if (method) {
if (exports.on && exports.on[method]) {
exports.on[method](exports);
} else if (players.on[method]) {
players.on[method](exports);
}
}
}
function getTime(msec, useString) {
var nSec = Math.floor(msec/1000),
hh = Math.floor(nSec/3600),
min = Math.floor(nSec/60) - Math.floor(hh * 60),
sec = Math.floor(nSec -(hh*3600) -(min*60));
return (useString ? ((hh ? hh + ':' : '') + (hh && min < 10 ? '0' + min : min) + ':' + ( sec < 10 ? '0' + sec : sec ) ) : { 'min': min, 'sec': sec });
}
function setTitle(item) {
var links = item.getElementsByTagName('a');
if (links.length) {
item = links[0];
}
dom.playlistTarget.innerHTML = '<ul class="sm2-playlist-bd"><li>' + item.innerHTML.replace(extras.loadFailedCharacter, '') + '</li></ul>';
if (dom.playlistTarget.getElementsByTagName('li')[0].scrollWidth > dom.playlistTarget.offsetWidth) {
dom.playlistTarget.innerHTML = '<ul class="sm2-playlist-bd"><li><marquee>' + item.innerHTML + '</marquee></li></ul>';
}
}
function makeSound(url) {
var sound = soundManager.createSound({
url: url,
volume: defaultVolume,
whileplaying: function() {
var progressMaxLeft = 100,
left,
width;
left = Math.min(progressMaxLeft, Math.max(0, (progressMaxLeft * (this.position / this.durationEstimate)))) + '%';
width = Math.min(100, Math.max(0, (100 * this.position / this.durationEstimate))) + '%';
if (this.duration) {
dom.progress.style.left = left;
dom.progressBar.style.width = width;
dom.time.innerHTML = getTime(this.position, true);
}
},
onbufferchange: function(isBuffering) {
if (isBuffering) {
utils.css.add(dom.o, 'buffering');
} else {
utils.css.remove(dom.o, 'buffering');
}
},
onplay: function() {
utils.css.swap(dom.o, 'paused', 'playing');
callback('play');
},
onpause: function() {
utils.css.swap(dom.o, 'playing', 'paused');
callback('pause');
},
onresume: function() {
utils.css.swap(dom.o, 'paused', 'playing');
},
whileloading: function() {
if (!this.isHTML5) {
dom.duration.innerHTML = getTime(this.durationEstimate, true);
}
},
onload: function(ok) {
if (ok) {
dom.duration.innerHTML = getTime(this.duration, true);
} else if (this._iO && this._iO.onerror) {
this._iO.onerror();
}
},
onerror: function() {
var item, element, html;
item = playlistController.getItem();
if (item) {
if (extras.loadFailedCharacter) {
dom.playlistTarget.innerHTML = dom.playlistTarget.innerHTML.replace('<li>' ,'<li>' + extras.loadFailedCharacter + ' ');
if (playlistController.data.playlist && playlistController.data.playlist[playlistController.data.selectedIndex]) {
element = playlistController.data.playlist[playlistController.data.selectedIndex].getElementsByTagName('a')[0];
html = element.innerHTML;
if (html.indexOf(extras.loadFailedCharacter) === -1) {
element.innerHTML = extras.loadFailedCharacter + ' ' + html;
}
}
}
}
callback('error');
if (navigator.userAgent.match(/mobile/i)) {
actions.next();
} else {
if (playlistController.data.timer) {
window.clearTimeout(playlistController.data.timer);
}
playlistController.data.timer = window.setTimeout(actions.next, 2000);
}
},
onstop: function() {
utils.css.remove(dom.o, 'playing');
},
onfinish: function() {
var lastIndex, item;
utils.css.remove(dom.o, 'playing');
dom.progress.style.left = '0%';
lastIndex = playlistController.data.selectedIndex;
callback('finish');
item = playlistController.getNext();
if (item && playlistController.data.selectedIndex !== lastIndex) {
playlistController.select(item);
setTitle(item);
stopOtherSounds();
this.play({
url: playlistController.getURL()
});
} else {
callback('end');
}
}
});
return sound;
}
function playLink(link) {
if (soundManager.canPlayURL(link.href)) {
if (playlistController.data.timer) {
window.clearTimeout(playlistController.data.timer);
playlistController.data.timer = null;
}
if (!soundObject) {
soundObject = makeSound(link.href);
}
soundObject.stop();
playlistController.select(link.parentNode);
setTitle(link.parentNode);
dom.progress.style.left = '0px';
dom.progressBar.style.width = '0px';
stopOtherSounds();
soundObject.play({
url: link.href,
position: 0
});
}
}
function PlaylistController() {
var data;
data = {
playlist: [],
selectedIndex: 0,
loopMode: false,
timer: null
};
function getPlaylist() {
return data.playlist;
}
function getItem(offset) {
var list,
item;
if (data.selectedIndex === null) {
return offset;
}
list = getPlaylist();
offset = (offset !== undefined ? offset : data.selectedIndex);
offset = Math.max(0, Math.min(offset, list.length));
item = list[offset];
return item;
}
function findOffsetFromItem(item) {
var list,
i,
j,
offset;
offset = -1;
list = getPlaylist();
if (list) {
for (i=0, j=list.length; i<j; i++) {
if (list[i] === item) {
offset = i;
break;
}
}
}
return offset;
}
function getNext() {
if (data.selectedIndex !== null) {
data.selectedIndex++;
}
if (data.playlist.length > 1) {
if (data.selectedIndex >= data.playlist.length) {
if (data.loopMode) {
data.selectedIndex = 0;
} else {
data.selectedIndex--;
}
}
} else {
data.selectedIndex = null;
}
return getItem();
}
function getPrevious() {
data.selectedIndex--;
if (data.selectedIndex < 0) {
if (data.loopMode) {
data.selectedIndex = data.playlist.length - 1;
} else {
data.selectedIndex++;
}
}
return getItem();
}
function resetLastSelected() {
var items,
i, j;
items = utils.dom.getAll(dom.playlist, '.' + css.selected);
for (i=0, j=items.length; i<j; i++) {
utils.css.remove(items[i], css.selected);
}
}
function select(item) {
var offset,
itemTop,
itemBottom,
containerHeight,
scrollTop,
itemPadding,
liElement;
resetLastSelected();
if (item) {
liElement = utils.dom.ancestor('li', item);
utils.css.add(liElement, css.selected);
itemTop = item.offsetTop;
itemBottom = itemTop + item.offsetHeight;
containerHeight = dom.playlistContainer.offsetHeight;
scrollTop = dom.playlist.scrollTop;
itemPadding = 8;
if (itemBottom > containerHeight + scrollTop) {
dom.playlist.scrollTop = itemBottom - containerHeight + itemPadding;
} else if (itemTop < scrollTop) {
dom.playlist.scrollTop = item.offsetTop - itemPadding;
}
}
offset = findOffsetFromItem(item);
data.selectedIndex = offset;
}
function playItemByOffset(offset) {
var item;
offset = (offset || 0);
item = getItem(offset);
if (item) {
playLink(item.getElementsByTagName('a')[0]);
}
}
function getURL() {
var item, url;
item = getItem();
if (item) {
url = item.getElementsByTagName('a')[0].href;
}
return url;
}
function refreshDOM() {
if (!dom.playlist) {
if (window.console && console.warn) {
console.warn('refreshDOM(): playlist node not found?');
}
return false;
}
data.playlist = dom.playlist.getElementsByTagName('li');
}
function initDOM() {
dom.playlistTarget = utils.dom.get(dom.o, '.sm2-playlist-target');
dom.playlistContainer = utils.dom.get(dom.o, '.sm2-playlist-drawer');
dom.playlist = utils.dom.get(dom.o, '.sm2-playlist-bd');
}
function init() {
defaultVolume = soundManager.defaultOptions.volume;
initDOM();
refreshDOM();
if (utils.css.has(dom.o, css.playlistOpen)) {
window.setTimeout(function() {
actions.menu(true);
}, 1);
}
}
init();
return {
data: data,
refresh: refreshDOM,
getNext: getNext,
getPrevious: getPrevious,
getItem: getItem,
getURL: getURL,
playItemByOffset: playItemByOffset,
select: select
};
}
function isRightClick(e) {
if (e && ((e.which && e.which === 2) || (e.which === undefined && e.button !== 1))) {
return true;
}
}
function getActionData(target) {
if (!target) {
return false;
}
actionData.volume.x = utils.position.getOffX(target);
actionData.volume.y = utils.position.getOffY(target);
actionData.volume.width = target.offsetWidth;
actionData.volume.height = target.offsetHeight;
actionData.volume.backgroundSize = parseInt(utils.style.get(target, 'background-size'), 10);
if (window.navigator.userAgent.match(/msie|trident/i)) {
actionData.volume.backgroundSize = (actionData.volume.backgroundSize / actionData.volume.width) * 100;
}
}
function handleMouseDown(e) {
var links,
target;
target = e.target || e.srcElement;
if (isRightClick(e)) {
return true;
}
if (target.nodeName.toLowerCase() !== 'a') {
links = target.getElementsByTagName('a');
if (links && links.length) {
target = target.getElementsByTagName('a')[0];
}
}
if (utils.css.has(target, 'sm2-volume-control')) {
getActionData(target);
utils.events.add(document, 'mousemove', actions.adjustVolume);
utils.events.add(document, 'mouseup', actions.releaseVolume);
return actions.adjustVolume(e);
}
}
function handleClick(e) {
var evt,
target,
offset,
targetNodeName,
methodName,
href,
handled;
evt = (e || window.event);
target = evt.target || evt.srcElement;
if (target && target.nodeName) {
targetNodeName = target.nodeName.toLowerCase();
if (targetNodeName !== 'a') {
if (target.parentNode) {
do {
target = target.parentNode;
targetNodeName = target.nodeName.toLowerCase();
} while (targetNodeName !== 'a' && target.parentNode);
if (!target) {
return false;
}
}
}
if (targetNodeName === 'a') {
href = target.href;
if (soundManager.canPlayURL(href)) {
if (!utils.css.has(target, playerOptions.excludeClass)) {
playLink(target);
handled = true;
}
} else {
offset = target.href.lastIndexOf('#');
if (offset !== -1) {
methodName = target.href.substr(offset+1);
if (methodName && actions[methodName]) {
handled = true;
actions[methodName](e);
}
}
}
if (handled) {
return utils.events.preventDefault(evt);
}
}
}
}
function handleMouse(e) {
var target, barX, barWidth, x, newPosition, sound;
target = dom.progressTrack;
barX = utils.position.getOffX(target);
barWidth = target.offsetWidth;
x = (e.clientX - barX);
newPosition = (x / barWidth);
sound = soundObject;
if (sound && sound.duration) {
sound.setPosition(sound.duration * newPosition);
if (sound._iO && sound._iO.whileplaying) {
sound._iO.whileplaying.apply(sound);
}
}
if (e.preventDefault) {
e.preventDefault();
}
return false;
}
function releaseMouse(e) {
utils.events.remove(document, 'mousemove', handleMouse);
utils.css.remove(dom.o, 'grabbing');
utils.events.remove(document, 'mouseup', releaseMouse);
utils.events.preventDefault(e);
return false;
}
function init() {
if (!playerNode) {
console.warn('init(): No playerNode element?');
}
dom.o = playerNode;
if (window.navigator.userAgent.match(/msie [678]/i)) {
utils.css.add(dom.o, css.legacy);
}
if (window.navigator.userAgent.match(/mobile/i)) {
utils.css.add(dom.o, css.noVolume);
}
dom.progress = utils.dom.get(dom.o, '.sm2-progress-ball');
dom.progressTrack = utils.dom.get(dom.o, '.sm2-progress-track');
dom.progressBar = utils.dom.get(dom.o, '.sm2-progress-bar');
dom.volume = utils.dom.get(dom.o, 'a.sm2-volume-control');
if (dom.volume) {
getActionData(dom.volume);
}
dom.duration = utils.dom.get(dom.o, '.sm2-inline-duration');
dom.time = utils.dom.get(dom.o, '.sm2-inline-time');
playlistController = new PlaylistController();
defaultItem = playlistController.getItem(0);
playlistController.select(defaultItem);
if (defaultItem) {
setTitle(defaultItem);
}
utils.events.add(dom.o, 'mousedown', handleMouseDown);
utils.events.add(dom.o, 'click', handleClick);
utils.events.add(dom.progressTrack, 'mousedown', function(e) {
if (isRightClick(e)) {
return true;
}
utils.css.add(dom.o, 'grabbing');
utils.events.add(document, 'mousemove', handleMouse);
utils.events.add(document, 'mouseup', releaseMouse);
return handleMouse(e);
});
}
actionData = {
volume: {
x: 0,
y: 0,
width: 0,
height: 0,
backgroundSize: 0
}
};
actions = {
play: function(offsetOrEvent) {
/**
* This is an overloaded function that takes mouse/touch events or offset-based item indices.
* Remember, "auto-play" will not work on mobile devices unless this function is called immediately from a touch or click event.
* If you have the link but not the offset, you can also pass a fake event object with a target of an <a> inside the playlist - e.g. { target: someMP3Link }
*/
var target,
href,
e;
if (offsetOrEvent !== undefined && !isNaN(offsetOrEvent)) {
return playlistController.playItemByOffset(offsetOrEvent);
}
e = offsetOrEvent;
if (e && e.target) {
target = e.target || e.srcElement;
href = target.href;
}
if (!href || href.indexOf('#') !== -1) {
href = dom.playlist.getElementsByTagName('a')[0].href;
}
if (!soundObject) {
soundObject = makeSound(href);
}
if (!soundObject.playState) {
stopOtherSounds();
}
soundObject.togglePause();
if (soundObject.paused && playlistController.data.timer) {
window.clearTimeout(playlistController.data.timer);
playlistController.data.timer = null;
}
},
pause: function() {
if (soundObject && soundObject.readyState) {
soundObject.pause();
}
},
resume: function() {
if (soundObject && soundObject.readyState) {
soundObject.resume();
}
},
stop: function() {
return actions.pause();
},
next: function(/* e */) {
var item, lastIndex;
if (playlistController.data.timer) {
window.clearTimeout(playlistController.data.timer);
playlistController.data.timer = null;
}
lastIndex = playlistController.data.selectedIndex;
item = playlistController.getNext(true);
if (item && playlistController.data.selectedIndex !== lastIndex) {
playLink(item.getElementsByTagName('a')[0]);
}
},
prev: function(/* e */) {
var item, lastIndex;
lastIndex = playlistController.data.selectedIndex;
item = playlistController.getPrevious();
if (item && playlistController.data.selectedIndex !== lastIndex) {
playLink(item.getElementsByTagName('a')[0]);
}
},
shuffle: function(e) {
var target = (e ? e.target || e.srcElement : utils.dom.get(dom.o, '.shuffle'));
if (target && !utils.css.has(target, css.disabled)) {
utils.css.toggle(target.parentNode, css.active);
playlistController.data.shuffleMode = !playlistController.data.shuffleMode;
}
},
repeat: function(e) {
var target = (e ? e.target || e.srcElement : utils.dom.get(dom.o, '.repeat'));
if (target && !utils.css.has(target, css.disabled)) {
utils.css.toggle(target.parentNode, css.active);
playlistController.data.loopMode = !playlistController.data.loopMode;
}
},
menu: function(ignoreToggle) {
var isOpen;
isOpen = utils.css.has(dom.o, css.playlistOpen);
if (playlistController && !playlistController.data.selectedIndex && !firstOpen) {
dom.playlist.scrollTop = 0;
firstOpen = true;
}
if (typeof ignoreToggle !== 'boolean' || !ignoreToggle) {
if (!isOpen) {
dom.playlistContainer.style.height = '0px';
}
isOpen = utils.css.toggle(dom.o, css.playlistOpen);
}
dom.playlistContainer.style.height = (isOpen ? dom.playlistContainer.scrollHeight : 0) + 'px';
},
adjustVolume: function(e) {
/**
* NOTE: this is the mousemove() event handler version.
* Use setVolume(50), etc., to assign volume directly.
*/
var backgroundMargin,
pixelMargin,
target,
value,
volume;
value = 0;
target = dom.volume;
if (e === undefined) {
return false;
}
if (!e || e.clientX === undefined) {
if (arguments.length && window.console && window.console.warn) {
console.warn('Bar UI: call setVolume(' + e + ') instead of adjustVolume(' + e + ').');
}
return actions.setVolume.apply(this, arguments);
}
backgroundMargin = (100 - actionData.volume.backgroundSize) / 2;
value = Math.max(0, Math.min(1, (e.clientX - actionData.volume.x) / actionData.volume.width));
target.style.clip = 'rect(0px, ' + (actionData.volume.width * value) + 'px, ' + actionData.volume.height + 'px, ' + (actionData.volume.width * (backgroundMargin/100)) + 'px)';
pixelMargin = ((backgroundMargin/100) * actionData.volume.width);
volume = Math.max(0, Math.min(1, ((e.clientX - actionData.volume.x) - pixelMargin) / (actionData.volume.width - (pixelMargin*2)))) * 100;
if (soundObject) {
soundObject.setVolume(volume);
}
defaultVolume = volume;
return utils.events.preventDefault(e);
},
releaseVolume: function(/* e */) {
utils.events.remove(document, 'mousemove', actions.adjustVolume);
utils.events.remove(document, 'mouseup', actions.releaseVolume);
},
setVolume: function(volume) {
var backgroundSize,
backgroundMargin,
backgroundOffset,
target,
from,
to;
if (volume === undefined || isNaN(volume)) {
return;
}
if (dom.volume) {
target = dom.volume;
backgroundSize = actionData.volume.backgroundSize;
backgroundMargin = (100 - backgroundSize) / 2;
backgroundOffset = actionData.volume.width * (backgroundMargin/100);
from = backgroundOffset;
to = from + ((actionData.volume.width - (backgroundOffset*2)) * (volume/100));
target.style.clip = 'rect(0px, ' + to + 'px, ' + actionData.volume.height + 'px, ' + from + 'px)';
}
if (soundObject) {
soundObject.setVolume(volume);
}
defaultVolume = volume;
}
};
init();
exports = {
on: null,
actions: actions,
dom: dom,
playlistController: playlistController
};
return exports;
};
utils = {
array: (function() {
function compare(property) {
var result;
return function(a, b) {
if (a[property] < b[property]) {
result = -1;
} else if (a[property] > b[property]) {
result = 1;
} else {
result = 0;
}
return result;
};
}
function shuffle(array) {
var i, j, temp;
for (i = array.length - 1; i > 0; i--) {
j = Math.floor(Math.random() * (i+1));
temp = array[i];
array[i] = array[j];
array[j] = temp;
}
return array;
}
return {
compare: compare,
shuffle: shuffle
};
}()),
css: (function() {
function hasClass(o, cStr) {
return (o.className !== undefined ? new RegExp('(^|\\s)' + cStr + '(\\s|$)').test(o.className) : false);
}
function addClass(o, cStr) {
if (!o || !cStr || hasClass(o, cStr)) {
return false; // safety net
}
o.className = (o.className ? o.className + ' ' : '') + cStr;
}
function removeClass(o, cStr) {
if (!o || !cStr || !hasClass(o, cStr)) {
return false;
}
o.className = o.className.replace(new RegExp('( ' + cStr + ')|(' + cStr + ')', 'g'), '');
}
function swapClass(o, cStr1, cStr2) {
var tmpClass = {
className: o.className
};
removeClass(tmpClass, cStr1);
addClass(tmpClass, cStr2);
o.className = tmpClass.className;
}
function toggleClass(o, cStr) {
var found,
method;
found = hasClass(o, cStr);
method = (found ? removeClass : addClass);
method(o, cStr);
return !found;
}
return {
has: hasClass,
add: addClass,
remove: removeClass,
swap: swapClass,
toggle: toggleClass
};
}()),
dom: (function() {
function getAll(param1, param2) {
var node,
selector,
results;
if (arguments.length === 1) {
node = document.documentElement;
selector = param1;
} else {
node = param1;
selector = param2;
}
if (node && node.querySelectorAll) {
results = node.querySelectorAll(selector);
}
return results;
}
function get(/* parentNode, selector */) {
var results = getAll.apply(this, arguments);
if (results && results.length) {
return results[results.length-1];
}
return results && results.length === 0 ? null : results;
}
function ancestor(nodeName, element, checkCurrent) {
var result;
if (!element || !nodeName) {
return element;
}
nodeName = nodeName.toUpperCase();
if (checkCurrent && element && element.nodeName === nodeName) {
return element;
}
while (element && element.nodeName !== nodeName && element.parentNode) {
element = element.parentNode;
}
return (element && element.nodeName === nodeName ? element : null);
}
return {
ancestor: ancestor,
get: get,
getAll: getAll
};
}()),
position: (function() {
function getOffX(o) {
var curleft = 0;
if (o.offsetParent) {
while (o.offsetParent) {
curleft += o.offsetLeft;
o = o.offsetParent;
}
} else if (o.x) {
curleft += o.x;
}
return curleft;
}
function getOffY(o) {
var curtop = 0;
if (o.offsetParent) {
while (o.offsetParent) {
curtop += o.offsetTop;
o = o.offsetParent;
}
} else if (o.y) {
curtop += o.y;
}
return curtop;
}
return {
getOffX: getOffX,
getOffY: getOffY
};
}()),
style: (function() {
function get(node, styleProp) {
var value;
if (node.currentStyle) {
value = node.currentStyle[styleProp];
} else if (window.getComputedStyle) {
value = document.defaultView.getComputedStyle(node, null).getPropertyValue(styleProp);
}
return value;
}
return {
get: get
};
}()),
events: (function() {
var add, remove, preventDefault;
add = function(o, evtName, evtHandler) {
var eventObject = {
detach: function() {
return remove(o, evtName, evtHandler);
}
};
if (window.addEventListener) {
o.addEventListener(evtName, evtHandler, false);
} else {
o.attachEvent('on' + evtName, evtHandler);
}
return eventObject;
};
remove = (window.removeEventListener !== undefined ? function(o, evtName, evtHandler) {
return o.removeEventListener(evtName, evtHandler, false);
} : function(o, evtName, evtHandler) {
return o.detachEvent('on' + evtName, evtHandler);
});
preventDefault = function(e) {
if (e.preventDefault) {
e.preventDefault();
} else {
e.returnValue = false;
e.cancelBubble = true;
}
return false;
};
return {
add: add,
preventDefault: preventDefault,
remove: remove
};
}()),
features: (function() {
var getAnimationFrame,
localAnimationFrame,
localFeatures,
prop,
styles,
testDiv,
transform;
testDiv = document.createElement('div');
/**
* hat tip: paul irish
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
* https://gist.github.com/838785
*/
localAnimationFrame = (window.requestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.oRequestAnimationFrame
|| window.msRequestAnimationFrame
|| null);
getAnimationFrame = localAnimationFrame ? function() {
return localAnimationFrame.apply(window, arguments);
} : null;
function has(prop) {
var result = testDiv.style[prop];
return (result !== undefined ? prop : null);
}
localFeatures = {
transform: {
ie: has('-ms-transform'),
moz: has('MozTransform'),
opera: has('OTransform'),
webkit: has('webkitTransform'),
w3: has('transform'),
prop: null // the normalized property value
},
rotate: {
has3D: false,
prop: null
},
getAnimationFrame: getAnimationFrame
};
localFeatures.transform.prop = (
localFeatures.transform.w3 ||
localFeatures.transform.moz ||
localFeatures.transform.webkit ||
localFeatures.transform.ie ||
localFeatures.transform.opera
);
function attempt(style) {
try {
testDiv.style[transform] = style;
} catch(e) {
return false;
}
return !!testDiv.style[transform];
}
if (localFeatures.transform.prop) {
transform = localFeatures.transform.prop;
styles = {
css_2d: 'rotate(0deg)',
css_3d: 'rotate3d(0,0,0,0deg)'
};
if (attempt(styles.css_3d)) {
localFeatures.rotate.has3D = true;
prop = 'rotate3d';
} else if (attempt(styles.css_2d)) {
prop = 'rotate';
}
localFeatures.rotate.prop = prop;
}
testDiv = null;
return localFeatures;
}())
};
window.sm2BarPlayers = players;
window.sm2BarPlayerOptions = playerOptions;
window.SM2BarPlayer = Player;
}(window));/*!
* jQuery Validation Plugin v1.14.0
*
* http://jqueryvalidation.org/
*
* Copyright (c) 2015 Jörn Zaefferer
* Released under the MIT license
*/
(function( factory ) {
if ( typeof define === "function" && define.amd ) {
define( ["jquery"], factory );
} else {
factory( jQuery );
}
}(function( $ ) {
$.extend($.fn, {
validate: function( options ) {
if ( !this.length ) {
if ( options && options.debug && window.console ) {
console.warn( "Nothing selected, can't validate, returning nothing." );
}
return;
}
var validator = $.data( this[ 0 ], "validator" );
if ( validator ) {
return validator;
}
this.attr( "novalidate", "novalidate" );
validator = new $.validator( options, this[ 0 ] );
$.data( this[ 0 ], "validator", validator );
if ( validator.settings.onsubmit ) {
this.on( "click.validate", ":submit", function( event ) {
if ( validator.settings.submitHandler ) {
validator.submitButton = event.target;
}
if ( $( this ).hasClass( "cancel" ) ) {
validator.cancelSubmit = true;
}
if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
validator.cancelSubmit = true;
}
});
this.on( "submit.validate", function( event ) {
if ( validator.settings.debug ) {
event.preventDefault();
}
function handle() {
var hidden, result;
if ( validator.settings.submitHandler ) {
if ( validator.submitButton ) {
hidden = $( "<input type='hidden'/>" )
.attr( "name", validator.submitButton.name )
.val( $( validator.submitButton ).val() )
.appendTo( validator.currentForm );
}
result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
if ( validator.submitButton ) {
hidden.remove();
}
if ( result !== undefined ) {
return result;
}
return false;
}
return true;
}
if ( validator.cancelSubmit ) {
validator.cancelSubmit = false;
return handle();
}
if ( validator.form() ) {
if ( validator.pendingRequest ) {
validator.formSubmitted = true;
return false;
}
return handle();
} else {
validator.focusInvalid();
return false;
}
});
}
return validator;
},
valid: function() {
var valid, validator, errorList;
if ( $( this[ 0 ] ).is( "form" ) ) {
valid = this.validate().form();
} else {
errorList = [];
valid = true;
validator = $( this[ 0 ].form ).validate();
this.each( function() {
valid = validator.element( this ) && valid;
errorList = errorList.concat( validator.errorList );
});
validator.errorList = errorList;
}
return valid;
},
rules: function( command, argument ) {
var element = this[ 0 ],
settings, staticRules, existingRules, data, param, filtered;
if ( command ) {
settings = $.data( element.form, "validator" ).settings;
staticRules = settings.rules;
existingRules = $.validator.staticRules( element );
switch ( command ) {
case "add":
$.extend( existingRules, $.validator.normalizeRule( argument ) );
delete existingRules.messages;
staticRules[ element.name ] = existingRules;
if ( argument.messages ) {
settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
}
break;
case "remove":
if ( !argument ) {
delete staticRules[ element.name ];
return existingRules;
}
filtered = {};
$.each( argument.split( /\s/ ), function( index, method ) {
filtered[ method ] = existingRules[ method ];
delete existingRules[ method ];
if ( method === "required" ) {
$( element ).removeAttr( "aria-required" );
}
});
return filtered;
}
}
data = $.validator.normalizeRules(
$.extend(
{},
$.validator.classRules( element ),
$.validator.attributeRules( element ),
$.validator.dataRules( element ),
$.validator.staticRules( element )
), element );
if ( data.required ) {
param = data.required;
delete data.required;
data = $.extend( { required: param }, data );
$( element ).attr( "aria-required", "true" );
}
if ( data.remote ) {
param = data.remote;
delete data.remote;
data = $.extend( data, { remote: param });
}
return data;
}
});
$.extend( $.expr[ ":" ], {
blank: function( a ) {
return !$.trim( "" + $( a ).val() );
},
filled: function( a ) {
return !!$.trim( "" + $( a ).val() );
},
unchecked: function( a ) {
return !$( a ).prop( "checked" );
}
});
$.validator = function( options, form ) {
this.settings = $.extend( true, {}, $.validator.defaults, options );
this.currentForm = form;
this.init();
};
$.validator.format = function( source, params ) {
if ( arguments.length === 1 ) {
return function() {
var args = $.makeArray( arguments );
args.unshift( source );
return $.validator.format.apply( this, args );
};
}
if ( arguments.length > 2 && params.constructor !== Array  ) {
params = $.makeArray( arguments ).slice( 1 );
}
if ( params.constructor !== Array ) {
params = [ params ];
}
$.each( params, function( i, n ) {
source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
return n;
});
});
return source;
};
$.extend( $.validator, {
defaults: {
messages: {},
groups: {},
rules: {},
errorClass: "error",
validClass: "valid",
errorElement: "label",
focusCleanup: false,
focusInvalid: true,
errorContainer: $( [] ),
errorLabelContainer: $( [] ),
onsubmit: true,
ignore: ":hidden",
ignoreTitle: false,
onfocusin: function( element ) {
this.lastActive = element;
if ( this.settings.focusCleanup ) {
if ( this.settings.unhighlight ) {
this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
}
this.hideThese( this.errorsFor( element ) );
}
},
onfocusout: function( element ) {
if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
this.element( element );
}
},
onkeyup: function( element, event ) {
var excludedKeys = [
16, 17, 18, 20, 35, 36, 37,
38, 39, 40, 45, 144, 225
];
if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
return;
} else if ( element.name in this.submitted || element === this.lastElement ) {
this.element( element );
}
},
onclick: function( element ) {
if ( element.name in this.submitted ) {
this.element( element );
} else if ( element.parentNode.name in this.submitted ) {
this.element( element.parentNode );
}
},
highlight: function( element, errorClass, validClass ) {
if ( element.type === "radio" ) {
this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
} else {
$( element ).addClass( errorClass ).removeClass( validClass );
}
},
unhighlight: function( element, errorClass, validClass ) {
if ( element.type === "radio" ) {
this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
} else {
$( element ).removeClass( errorClass ).addClass( validClass );
}
}
},
setDefaults: function( settings ) {
$.extend( $.validator.defaults, settings );
},
messages: {
required: "This field is required.",
remote: "Please fix this field.",
email: "Please enter a valid email address.",
url: "Please enter a valid URL.",
date: "Please enter a valid date.",
dateISO: "Please enter a valid date ( ISO ).",
number: "Please enter a valid number.",
digits: "Please enter only digits.",
creditcard: "Please enter a valid credit card number.",
equalTo: "Please enter the same value again.",
maxlength: $.validator.format( "Please enter no more than {0} characters." ),
minlength: $.validator.format( "Please enter at least {0} characters." ),
rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
range: $.validator.format( "Please enter a value between {0} and {1}." ),
max: $.validator.format( "Please enter a value less than or equal to {0}." ),
min: $.validator.format( "Please enter a value greater than or equal to {0}." )
},
autoCreateRanges: false,
prototype: {
init: function() {
this.labelContainer = $( this.settings.errorLabelContainer );
this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
this.submitted = {};
this.valueCache = {};
this.pendingRequest = 0;
this.pending = {};
this.invalid = {};
this.reset();
var groups = ( this.groups = {} ),
rules;
$.each( this.settings.groups, function( key, value ) {
if ( typeof value === "string" ) {
value = value.split( /\s/ );
}
$.each( value, function( index, name ) {
groups[ name ] = key;
});
});
rules = this.settings.rules;
$.each( rules, function( key, value ) {
rules[ key ] = $.validator.normalizeRule( value );
});
function delegate( event ) {
var validator = $.data( this.form, "validator" ),
eventType = "on" + event.type.replace( /^validate/, "" ),
settings = validator.settings;
if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
settings[ eventType ].call( validator, this, event );
}
}
$( this.currentForm )
.on( "focusin.validate focusout.validate keyup.validate",
":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
"[type='radio'], [type='checkbox']", delegate)
.on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);
if ( this.settings.invalidHandler ) {
$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
}
$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
},
form: function() {
this.checkForm();
$.extend( this.submitted, this.errorMap );
this.invalid = $.extend({}, this.errorMap );
if ( !this.valid() ) {
$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
}
this.showErrors();
return this.valid();
},
checkForm: function() {
this.prepareForm();
for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
this.check( elements[ i ] );
}
return this.valid();
},
element: function( element ) {
var cleanElement = this.clean( element ),
checkElement = this.validationTargetFor( cleanElement ),
result = true;
this.lastElement = checkElement;
if ( checkElement === undefined ) {
delete this.invalid[ cleanElement.name ];
} else {
this.prepareElement( checkElement );
this.currentElements = $( checkElement );
result = this.check( checkElement ) !== false;
if ( result ) {
delete this.invalid[ checkElement.name ];
} else {
this.invalid[ checkElement.name ] = true;
}
}
$( element ).attr( "aria-invalid", !result );
if ( !this.numberOfInvalids() ) {
this.toHide = this.toHide.add( this.containers );
}
this.showErrors();
return result;
},
showErrors: function( errors ) {
if ( errors ) {
$.extend( this.errorMap, errors );
this.errorList = [];
for ( var name in errors ) {
this.errorList.push({
message: errors[ name ],
element: this.findByName( name )[ 0 ]
});
}
this.successList = $.grep( this.successList, function( element ) {
return !( element.name in errors );
});
}
if ( this.settings.showErrors ) {
this.settings.showErrors.call( this, this.errorMap, this.errorList );
} else {
this.defaultShowErrors();
}
},
resetForm: function() {
if ( $.fn.resetForm ) {
$( this.currentForm ).resetForm();
}
this.submitted = {};
this.lastElement = null;
this.prepareForm();
this.hideErrors();
var i, elements = this.elements()
.removeData( "previousValue" )
.removeAttr( "aria-invalid" );
if ( this.settings.unhighlight ) {
for ( i = 0; elements[ i ]; i++ ) {
this.settings.unhighlight.call( this, elements[ i ],
this.settings.errorClass, "" );
}
} else {
elements.removeClass( this.settings.errorClass );
}
},
numberOfInvalids: function() {
return this.objectLength( this.invalid );
},
objectLength: function( obj ) {
/* jshint unused: false */
var count = 0,
i;
for ( i in obj ) {
count++;
}
return count;
},
hideErrors: function() {
this.hideThese( this.toHide );
},
hideThese: function( errors ) {
errors.not( this.containers ).text( "" );
this.addWrapper( errors ).hide();
},
valid: function() {
return this.size() === 0;
},
size: function() {
return this.errorList.length;
},
focusInvalid: function() {
if ( this.settings.focusInvalid ) {
try {
$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
.filter( ":visible" )
.focus()
.trigger( "focusin" );
} catch ( e ) {
}
}
},
findLastActive: function() {
var lastActive = this.lastActive;
return lastActive && $.grep( this.errorList, function( n ) {
return n.element.name === lastActive.name;
}).length === 1 && lastActive;
},
elements: function() {
var validator = this,
rulesCache = {};
return $( this.currentForm )
.find( "input, select, textarea" )
.not( ":submit, :reset, :image, :disabled" )
.not( this.settings.ignore )
.filter( function() {
if ( !this.name && validator.settings.debug && window.console ) {
console.error( "%o has no name assigned", this );
}
if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
return false;
}
rulesCache[ this.name ] = true;
return true;
});
},
clean: function( selector ) {
return $( selector )[ 0 ];
},
errors: function() {
var errorClass = this.settings.errorClass.split( " " ).join( "." );
return $( this.settings.errorElement + "." + errorClass, this.errorContext );
},
reset: function() {
this.successList = [];
this.errorList = [];
this.errorMap = {};
this.toShow = $( [] );
this.toHide = $( [] );
this.currentElements = $( [] );
},
prepareForm: function() {
this.reset();
this.toHide = this.errors().add( this.containers );
},
prepareElement: function( element ) {
this.reset();
this.toHide = this.errorsFor( element );
},
elementValue: function( element ) {
var val,
$element = $( element ),
type = element.type;
if ( type === "radio" || type === "checkbox" ) {
return this.findByName( element.name ).filter(":checked").val();
} else if ( type === "number" && typeof element.validity !== "undefined" ) {
return element.validity.badInput ? false : $element.val();
}
val = $element.val();
if ( typeof val === "string" ) {
return val.replace(/\r/g, "" );
}
return val;
},
check: function( element ) {
element = this.validationTargetFor( this.clean( element ) );
var rules = $( element ).rules(),
rulesCount = $.map( rules, function( n, i ) {
return i;
}).length,
dependencyMismatch = false,
val = this.elementValue( element ),
result, method, rule;
for ( method in rules ) {
rule = { method: method, parameters: rules[ method ] };
try {
result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
if ( result === "dependency-mismatch" && rulesCount === 1 ) {
dependencyMismatch = true;
continue;
}
dependencyMismatch = false;
if ( result === "pending" ) {
this.toHide = this.toHide.not( this.errorsFor( element ) );
return;
}
if ( !result ) {
this.formatAndAdd( element, rule );
return false;
}
} catch ( e ) {
if ( this.settings.debug && window.console ) {
console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
}
if ( e instanceof TypeError ) {
e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
}
throw e;
}
}
if ( dependencyMismatch ) {
return;
}
if ( this.objectLength( rules ) ) {
this.successList.push( element );
}
return true;
},
customDataMessage: function( element, method ) {
return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
},
customMessage: function( name, method ) {
var m = this.settings.messages[ name ];
return m && ( m.constructor === String ? m : m[ method ]);
},
findDefined: function() {
for ( var i = 0; i < arguments.length; i++) {
if ( arguments[ i ] !== undefined ) {
return arguments[ i ];
}
}
return undefined;
},
defaultMessage: function( element, method ) {
return this.findDefined(
this.customMessage( element.name, method ),
this.customDataMessage( element, method ),
!this.settings.ignoreTitle && element.title || undefined,
$.validator.messages[ method ],
"<strong>Warning: No message defined for " + element.name + "</strong>"
);
},
formatAndAdd: function( element, rule ) {
var message = this.defaultMessage( element, rule.method ),
theregex = /\$?\{(\d+)\}/g;
if ( typeof message === "function" ) {
message = message.call( this, rule.parameters, element );
} else if ( theregex.test( message ) ) {
message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
}
this.errorList.push({
message: message,
element: element,
method: rule.method
});
this.errorMap[ element.name ] = message;
this.submitted[ element.name ] = message;
},
addWrapper: function( toToggle ) {
if ( this.settings.wrapper ) {
toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
}
return toToggle;
},
defaultShowErrors: function() {
var i, elements, error;
for ( i = 0; this.errorList[ i ]; i++ ) {
error = this.errorList[ i ];
if ( this.settings.highlight ) {
this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
}
this.showLabel( error.element, error.message );
}
if ( this.errorList.length ) {
this.toShow = this.toShow.add( this.containers );
}
if ( this.settings.success ) {
for ( i = 0; this.successList[ i ]; i++ ) {
this.showLabel( this.successList[ i ] );
}
}
if ( this.settings.unhighlight ) {
for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
}
}
this.toHide = this.toHide.not( this.toShow );
this.hideErrors();
this.addWrapper( this.toShow ).show();
},
validElements: function() {
return this.currentElements.not( this.invalidElements() );
},
invalidElements: function() {
return $( this.errorList ).map(function() {
return this.element;
});
},
showLabel: function( element, message ) {
var place, group, errorID,
error = this.errorsFor( element ),
elementID = this.idOrName( element ),
describedBy = $( element ).attr( "aria-describedby" );
if ( error.length ) {
error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
error.html( message );
} else {
error = $( "<" + this.settings.errorElement + ">" )
.attr( "id", elementID + "-error" )
.addClass( this.settings.errorClass )
.html( message || "" );
place = error;
if ( this.settings.wrapper ) {
place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
}
if ( this.labelContainer.length ) {
this.labelContainer.append( place );
} else if ( this.settings.errorPlacement ) {
this.settings.errorPlacement( place, $( element ) );
} else {
place.insertAfter( element );
}
if ( error.is( "label" ) ) {
error.attr( "for", elementID );
} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
if ( !describedBy ) {
describedBy = errorID;
} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
describedBy += " " + errorID;
}
$( element ).attr( "aria-describedby", describedBy );
group = this.groups[ element.name ];
if ( group ) {
$.each( this.groups, function( name, testgroup ) {
if ( testgroup === group ) {
$( "[name='" + name + "']", this.currentForm )
.attr( "aria-describedby", error.attr( "id" ) );
}
});
}
}
}
if ( !message && this.settings.success ) {
error.text( "" );
if ( typeof this.settings.success === "string" ) {
error.addClass( this.settings.success );
} else {
this.settings.success( error, element );
}
}
this.toShow = this.toShow.add( error );
},
errorsFor: function( element ) {
var name = this.idOrName( element ),
describer = $( element ).attr( "aria-describedby" ),
selector = "label[for='" + name + "'], label[for='" + name + "'] *";
if ( describer ) {
selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
}
return this
.errors()
.filter( selector );
},
idOrName: function( element ) {
return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
},
validationTargetFor: function( element ) {
if ( this.checkable( element ) ) {
element = this.findByName( element.name );
}
return $( element ).not( this.settings.ignore )[ 0 ];
},
checkable: function( element ) {
return ( /radio|checkbox/i ).test( element.type );
},
findByName: function( name ) {
return $( this.currentForm ).find( "[name='" + name + "']" );
},
getLength: function( value, element ) {
switch ( element.nodeName.toLowerCase() ) {
case "select":
return $( "option:selected", element ).length;
case "input":
if ( this.checkable( element ) ) {
return this.findByName( element.name ).filter( ":checked" ).length;
}
}
return value.length;
},
depend: function( param, element ) {
return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
},
dependTypes: {
"boolean": function( param ) {
return param;
},
"string": function( param, element ) {
return !!$( param, element.form ).length;
},
"function": function( param, element ) {
return param( element );
}
},
optional: function( element ) {
var val = this.elementValue( element );
return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
},
startRequest: function( element ) {
if ( !this.pending[ element.name ] ) {
this.pendingRequest++;
this.pending[ element.name ] = true;
}
},
stopRequest: function( element, valid ) {
this.pendingRequest--;
if ( this.pendingRequest < 0 ) {
this.pendingRequest = 0;
}
delete this.pending[ element.name ];
if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
$( this.currentForm ).submit();
this.formSubmitted = false;
} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
this.formSubmitted = false;
}
},
previousValue: function( element ) {
return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
old: null,
valid: true,
message: this.defaultMessage( element, "remote" )
});
},
destroy: function() {
this.resetForm();
$( this.currentForm )
.off( ".validate" )
.removeData( "validator" );
}
},
classRuleSettings: {
required: { required: true },
email: { email: true },
url: { url: true },
date: { date: true },
dateISO: { dateISO: true },
number: { number: true },
digits: { digits: true },
creditcard: { creditcard: true }
},
addClassRules: function( className, rules ) {
if ( className.constructor === String ) {
this.classRuleSettings[ className ] = rules;
} else {
$.extend( this.classRuleSettings, className );
}
},
classRules: function( element ) {
var rules = {},
classes = $( element ).attr( "class" );
if ( classes ) {
$.each( classes.split( " " ), function() {
if ( this in $.validator.classRuleSettings ) {
$.extend( rules, $.validator.classRuleSettings[ this ]);
}
});
}
return rules;
},
normalizeAttributeRule: function( rules, type, method, value ) {
if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
value = Number( value );
if ( isNaN( value ) ) {
value = undefined;
}
}
if ( value || value === 0 ) {
rules[ method ] = value;
} else if ( type === method && type !== "range" ) {
rules[ method ] = true;
}
},
attributeRules: function( element ) {
var rules = {},
$element = $( element ),
type = element.getAttribute( "type" ),
method, value;
for ( method in $.validator.methods ) {
if ( method === "required" ) {
value = element.getAttribute( method );
if ( value === "" ) {
value = true;
}
value = !!value;
} else {
value = $element.attr( method );
}
this.normalizeAttributeRule( rules, type, method, value );
}
if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
delete rules.maxlength;
}
return rules;
},
dataRules: function( element ) {
var rules = {},
$element = $( element ),
type = element.getAttribute( "type" ),
method, value;
for ( method in $.validator.methods ) {
value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
this.normalizeAttributeRule( rules, type, method, value );
}
return rules;
},
staticRules: function( element ) {
var rules = {},
validator = $.data( element.form, "validator" );
if ( validator.settings.rules ) {
rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
}
return rules;
},
normalizeRules: function( rules, element ) {
$.each( rules, function( prop, val ) {
if ( val === false ) {
delete rules[ prop ];
return;
}
if ( val.param || val.depends ) {
var keepRule = true;
switch ( typeof val.depends ) {
case "string":
keepRule = !!$( val.depends, element.form ).length;
break;
case "function":
keepRule = val.depends.call( element, element );
break;
}
if ( keepRule ) {
rules[ prop ] = val.param !== undefined ? val.param : true;
} else {
delete rules[ prop ];
}
}
});
$.each( rules, function( rule, parameter ) {
rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
});
$.each([ "minlength", "maxlength" ], function() {
if ( rules[ this ] ) {
rules[ this ] = Number( rules[ this ] );
}
});
$.each([ "rangelength", "range" ], function() {
var parts;
if ( rules[ this ] ) {
if ( $.isArray( rules[ this ] ) ) {
rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
} else if ( typeof rules[ this ] === "string" ) {
parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
}
}
});
if ( $.validator.autoCreateRanges ) {
if ( rules.min != null && rules.max != null ) {
rules.range = [ rules.min, rules.max ];
delete rules.min;
delete rules.max;
}
if ( rules.minlength != null && rules.maxlength != null ) {
rules.rangelength = [ rules.minlength, rules.maxlength ];
delete rules.minlength;
delete rules.maxlength;
}
}
return rules;
},
normalizeRule: function( data ) {
if ( typeof data === "string" ) {
var transformed = {};
$.each( data.split( /\s/ ), function() {
transformed[ this ] = true;
});
data = transformed;
}
return data;
},
addMethod: function( name, method, message ) {
$.validator.methods[ name ] = method;
$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
if ( method.length < 3 ) {
$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
}
},
methods: {
required: function( value, element, param ) {
if ( !this.depend( param, element ) ) {
return "dependency-mismatch";
}
if ( element.nodeName.toLowerCase() === "select" ) {
var val = $( element ).val();
return val && val.length > 0;
}
if ( this.checkable( element ) ) {
return this.getLength( value, element ) > 0;
}
return value.length > 0;
},
email: function( value, element ) {
return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
},
url: function( value, element ) {
return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
},
date: function( value, element ) {
return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
},
dateISO: function( value, element ) {
return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
},
number: function( value, element ) {
return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
},
digits: function( value, element ) {
return this.optional( element ) || /^\d+$/.test( value );
},
creditcard: function( value, element ) {
if ( this.optional( element ) ) {
return "dependency-mismatch";
}
if ( /[^0-9 \-]+/.test( value ) ) {
return false;
}
var nCheck = 0,
nDigit = 0,
bEven = false,
n, cDigit;
value = value.replace( /\D/g, "" );
if ( value.length < 13 || value.length > 19 ) {
return false;
}
for ( n = value.length - 1; n >= 0; n--) {
cDigit = value.charAt( n );
nDigit = parseInt( cDigit, 10 );
if ( bEven ) {
if ( ( nDigit *= 2 ) > 9 ) {
nDigit -= 9;
}
}
nCheck += nDigit;
bEven = !bEven;
}
return ( nCheck % 10 ) === 0;
},
minlength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || length >= param;
},
maxlength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || length <= param;
},
rangelength: function( value, element, param ) {
var length = $.isArray( value ) ? value.length : this.getLength( value, element );
return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
},
min: function( value, element, param ) {
return this.optional( element ) || value >= param;
},
max: function( value, element, param ) {
return this.optional( element ) || value <= param;
},
range: function( value, element, param ) {
return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
},
equalTo: function( value, element, param ) {
var target = $( param );
if ( this.settings.onfocusout ) {
target.off( ".validate-equalTo" ).on( "blur.validate-equalTo", function() {
$( element ).valid();
});
}
return value === target.val();
},
remote: function( value, element, param ) {
if ( this.optional( element ) ) {
return "dependency-mismatch";
}
var previous = this.previousValue( element ),
validator, data;
if (!this.settings.messages[ element.name ] ) {
this.settings.messages[ element.name ] = {};
}
previous.originalMessage = this.settings.messages[ element.name ].remote;
this.settings.messages[ element.name ].remote = previous.message;
param = typeof param === "string" && { url: param } || param;
if ( previous.old === value ) {
return previous.valid;
}
previous.old = value;
validator = this;
this.startRequest( element );
data = {};
data[ element.name ] = value;
$.ajax( $.extend( true, {
mode: "abort",
port: "validate" + element.name,
dataType: "json",
data: data,
context: validator.currentForm,
success: function( response ) {
var valid = response === true || response === "true",
errors, message, submitted;
validator.settings.messages[ element.name ].remote = previous.originalMessage;
if ( valid ) {
submitted = validator.formSubmitted;
validator.prepareElement( element );
validator.formSubmitted = submitted;
validator.successList.push( element );
delete validator.invalid[ element.name ];
validator.showErrors();
} else {
errors = {};
message = response || validator.defaultMessage( element, "remote" );
errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
validator.invalid[ element.name ] = true;
validator.showErrors( errors );
}
previous.valid = valid;
validator.stopRequest( element, valid );
}
}, param ) );
return "pending";
}
}
});
var pendingRequests = {},
ajax;
if ( $.ajaxPrefilter ) {
$.ajaxPrefilter(function( settings, _, xhr ) {
var port = settings.port;
if ( settings.mode === "abort" ) {
if ( pendingRequests[port] ) {
pendingRequests[port].abort();
}
pendingRequests[port] = xhr;
}
});
} else {
ajax = $.ajax;
$.ajax = function( settings ) {
var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
port = ( "port" in settings ? settings : $.ajaxSettings ).port;
if ( mode === "abort" ) {
if ( pendingRequests[port] ) {
pendingRequests[port].abort();
}
pendingRequests[port] = ajax.apply(this, arguments);
return pendingRequests[port];
}
return ajax.apply(this, arguments);
};
}
}));// Magnific Popup v1.0.1 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(x("b",d[0],!1,!0),x("a",d[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),n.container.append(d.add(f))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){r.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g=a(this),h;if(c){var i,j,k,l,m,n;g.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,r.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0];if(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)l=!0,d()}).on("touchend"+f,function(a){d();if(l||n>1)return;h=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){h=!1},b),e()})})}g.on("click"+f,function(){h||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&r.off("touchmove"+f+" touchend"+f)}}(),A()})/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 * 
 * SITE123 Note - We edit this file, search for `SITE123` to see changes.
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position,
          opacity: this.opacity   // SITE123 - Fix opacity when Parallax isn't active
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position,
          opacity: this.opacity   // SITE123 - Fix opacity when Parallax isn't active 
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');

    // SITE123 - We add this to detect when the Parallax is active
    $('html').addClass('parallax-active');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      backgroundColor: this.backgroundcolor
    }).attr('id',this.idele);

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    //Add opacity to the image
    this.$slider.css('opacity',this.opacity);

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    opacity:   1,
    backgroundcolor:   '#ffffff',
    idele:   '',
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 1; //We changed 2 to 1 so only the header will be fixed (without bottom)
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));
/*!
	Zoom 1.7.18
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);if (typeof menuScrollOffset === 'undefined') {
var menuScrollOffset = 0;
}
/**
* Detecting Mobile Devices with JavaScript
*/
var isMobile = {
Android: function() {
return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};
var whatScreen = {
any: function() {
var screenWidth = $(window).width();
if (screenWidth<=544) {
return 'mobile';
}
if (screenWidth>544 && screenWidth<=767) {
return 'tablet';
}
if (screenWidth>768) {
return 'desktop';
}
}
};
/**
* The function refresh some plugins related to DOM changes.
* In some cases the document height is changing and every time its
* changed we must Refresh some plugins that based on the it. To do
* so we fake a Mutation Observer using an Interval. We try to use
* the browsers MutationObserver object but we can not use it, Firefox
* trow an infinity loop to the `function( mutations, observer )`
* callback function when we used `attributes=true` and `attributeFilter`
* with `style`. For now we only need the Mutation Observer for the
* document height so every time it change we fix the necessary plugins.
*/
function MutationObserverHandler() {
$( document ).on( 's123.page.ready', function( event ) {
clearInterval(window.S123_MutationObserver_Interval);
window.S123_MutationObserver_Interval = setInterval( function() {
if ( document.S123_MutationObserver_Height !== $(document).height() ) {
$(document).trigger('s123.page.ready.refreshParallaxImages');
$(document).trigger('s123.page.ready.refreshAOS');
document.S123_MutationObserver_Height = $(document).height();
}
}, 250);
});
/**
* We can not use this code because FireFox issue, please read the function
* documentations for more informations.
*/
/*
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
if( !MutationObserver || $(selector).length === 0 ) return;
$( document ).on( 's123.page.ready', function( event ) {
var observer = 'S123_observer_' + selector;
var options = {
childList: true,
subtree: true,
attributes: true,
attributeFilter: ['height','style'],
attributeOldValue: true
}
if ( window[observer] ) {
window[observer].disconnect();
window[observer] = null;
}
window[observer] = new MutationObserver( function( mutations, observer ) {
console.dir(mutations);
clearTimeout(window[observer+'_delay'] );
window[observer+'_delay']  = setTimeout(function(){
callback();
}, 250);
});
window[observer].observe($(selector).get(0),options);
});
*/
}
/**
* The function Render & Refresh the Parallax object. In some cases the document
* height is changing and every time its changed we must Refresh the
* Parallax to position the image in the correct place.
*/
function RefreshParallaxImages() {
$( document ).on( 's123.page.ready.refreshParallaxImages', function( event ) {
var parallaxWindows = $('.parallax-window');
parallaxWindows.parallax('render');
parallaxWindows.parallax('refresh');
setTimeout(function() {
jQuery(window).trigger('resize').trigger('scroll');
},1000);
});
}
/**
* The function Destroy the Parallax object and it will reinitialize
* when we call to its `.parallax('refresh')` function. We need to
* use it when we remove a Parallax section tag because its related
* mirror still stays on the body. e.g. When we refresh the preview
* using Ajax from the wizard.
*/
function DestroyParallaxImages() {
$('.parallax-window').parallax('destroy');
}
/**
* The function refresh the AOS (animate on scroll) plugin.
* In some cases the document height is changing and every
* time its changed we must Refresh the AOS to recalculate
* all offsets and positions of elements.
* Documentation : https://github.com/michalsnik/aos
*/
function RefreshAOS() {
$( document ).on( 's123.page.ready.refreshAOS', function( event ) {
AOS.refresh();
});
}
/**
* The function initialize the Top Section.
*/
function TopSectionInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
jQuery('#websitePopupHomeVideo, .promoVideoPopup .iconsCircle').on('click',function(e) {
e.preventDefault();
e.stopPropagation();
var iframeUrl = $(this).attr('href');
buildPopup('playVideo','','',iframeUrl,true,false,true,'');
});
jQuery('.youtubeReplace').on('click',function() {
var $this 			= $(this);
var videoURL 		= $this.data('video');
var customStyle 	= $this.find('img').attr('style') ? $this.find('img').attr('style') : '';
var width 			= $this.find('img').width();
var height 			= $this.find('img').height();
$this.replaceWith('<div class="video-wrapper"><iframe style="'+customStyle+'width:'+width+'px;height:'+height+'px;" type="text/html" src="'+videoURL+'" frameborder="0" allowfullscreen></iframe></div>');
});
if (isMobile.any()) {
jQuery('.youtubeReplace').each(function() {
var $this 			= $(this);
var videoURL 		= $this.data('video');
var customStyle 	= $this.find('img').attr('style') ? $this.find('img').attr('style') : '';
var width 			= $this.find('img').width();
var height 			= $this.find('img').height();
videoURL = videoURL.replace('autoplay','disable-autoplay');
$this.replaceWith('<div class="video-wrapper"><iframe style="'+customStyle+'width:'+width+'px;height:'+height+'px;" type="text/html" src="'+videoURL+'" frameborder="0" allowfullscreen></iframe></div>');
});
}
});
}
/**
* The function initialize the Counters Module.
*/
function CountersModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Counters Module Initialize
* Source: /files/js/module.counters.js
* Lines: 199-214
*/
if ($.isFunction($.fn['themePluginCounter'])) {
$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCounter(opts);
});
}
});
}
/**
* The function initialize the Carousel Module.
*/
function CarouselModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
/**
* Carousel Module Initialize
* Source: /files/js/module.carousel.js
* Lines: 143-153
*/
if ($.isFunction($.fn['themePluginCarousel'])) {
$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
var $this = $(this),
opts;
var pluginOptions = $this.data('plugin-options');
if (pluginOptions)
opts = pluginOptions;
$this.themePluginCarousel(opts);
});
}
});
}
/**
* The function initialize the Songs Module.
*/
function SongsModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
soundManager.reboot();
});
}
/**
* The function initialize the contact us form on homepage.
*/
function ContactFormHomeInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('#contactUsFormHome').length !== 0 ) {
var $contactUsFormHome = $('#contactUsFormHome');
$contactUsFormHome.validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/include/contactO.php",
data: $form.serialize(),
success: function( data ) {
var dataObj = jQuery.parseJSON(data);
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: 'Thank you!<iframe src="/versions/'+$('#versionNUM').val()+'/include/contactSentO.php?w='+$('#w').val()+'&websiteID='+dataObj.websiteID+'" style="width:100%;height:30px;" frameborder="0"></iframe>',
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
}
});
}
/**
* The function initialize the Mailing Module.
*/
function MailingModuleInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('.widget_subscribe_form').length !== 0 ) {
var $widget_subscribe_form = $('.widget_subscribe_form');
$widget_subscribe_form.each( function( index ) {
/**
* jQuery Validation Plugin Initial
* Documentation : http://jqueryvalidation.org/documentation/
*/
$(this).validate({
errorElement: 'div',
errorClass: 'help-block',
focusInvalid: true,
ignore: "",
highlight: function (e) {
$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
},
success: function (e) {
$(e).closest('.form-group').removeClass('has-error');
$(e).remove();
},
errorPlacement: function (error, element) {
error.appendTo(element.closest('.form-group'));
},
submitHandler: function( form ) {
var $form = $(form);
$form.find('button:submit').prop('disabled', true);
$.ajax({
type: 'POST',
url: '/versions/'+$('#versionNUM').val()+'/include/subscribe.php',
data: $form.serialize(),
success: function(data) {
$form.trigger("reset");
bootbox.alert({
title: translations.sent,
message: translations.ConfirmMailingSubscrive,
className: 'contactUsConfirm',
backdrop: true
});
$form.find('button:submit').prop('disabled', false);
}
});
return false;
}
});
});
}
});
}
function OpenSearchWindow(closeLocation) {
var searchInput = '<div class="searchInput" style="display:none;">';
searchInput += '<form id="searchPopup" class="searchBox">';
searchInput += '<div class="form-group">';
searchInput += '<div class="input-group">';
searchInput += '<input type="text" name="widget-search-form-keyword" class="widget-search-form-keyword form-control input-lg" placeholder="'+translations.enterYourQuery+'" aria-required="true" autocomplete="off">';
searchInput += '<span class="input-group-btn">';
searchInput += '<button class="btn btn-lg btn-primary" type="submit"><i class="fa fa-search"></i></button>';
searchInput += '</span>';
searchInput += '</div>';
searchInput += '</div>';
searchInput += '<input type="hidden" name="w" value="'+$('#w').val()+'">';
searchInput += '<input type="hidden" name="websiteID" value="'+$('#websiteID').val()+'">';
searchInput += '</form>';
searchInput += '</div>';
searchInput += '<div class="result" style="display:none;">';
searchInput += '</div>';
buildPopup('popupFloatDivSearch','',searchInput,'',true,false,true,closeLocation);
setTimeout(function() {
var screenHeight = $('#popupFloatDivSearch .page').outerHeight(true);
var searchHeight = $('#popupFloatDivSearch .searchInput').outerHeight(true);
$('#popupFloatDivSearch .result').height(screenHeight-searchHeight);
$('#popupFloatDivSearch .searchInput').show();
$('#popupFloatDivSearch .result').show();
if (!is_touch_device()) {
$('#searchPopup .widget-search-form-keyword').focus();
}
},150);
$('#searchPopup').submit(function(event) {
var $form = $(this);
var $input = $form.find('input[name="widget-search-form-keyword"]');
event.preventDefault();
$form.find('button:submit').prop('disabled',true);
$input.val($.trim($input.val()));
if ( $input.val().length === 0 ) {
bootbox.alert({
message: translations.searchInputValidation,
className: 'bootbox-search-input-validation'
}).on("hidden.bs.modal", function() {
$form.find('button:submit').prop('disabled',false);
$input.focus();
});
return;
}
OpenSearchWindowSearchAjax($form);
});
}
function OpenSearchWindowSearchAjax($form) {
$.ajax({
type: 'POST',
url: '/versions/'+$('#versionNUM').val()+'/include/search.php',
data: $form.serialize(),
beforeSend: function() {
$('#popupFloatDivSearch .result').html('LOADING...');
},
success: function(data) {
$('#popupFloatDivSearch .result').html(data);
$( document ).trigger( 's123.page.ready.data-model' );
},
complete: function(data) {
$form.find('button:submit').prop('disabled', false);
/**
* Close the keyboard on mobile devices.
* http://stackoverflow.com/questions/5937339/ipad-safari-make-keyboard-disappear.
*/
if ( is_touch_device() ) {
document.activeElement.blur();
$form.find('input[name="widget-search-form-keyword"]').blur();
}
}
});
}
/**
* The function initialize the Search Module.
*/
function SearchModuleInitialize() {
$( document ).on( 's123.page.ready.search', function( event ) {
if ( $('.widget_search').length !== 0 ) {
$('.widget_search').each(function() {
var $widget_search = $(this);
$widget_search.submit(function(event) {
var $form = $(this);
event.preventDefault();
OpenSearchWindow('');
OpenSearchWindowSearchAjax($form);
});
});
}
});
}
/**
* The function initialize the Modules Data Model.
* We use this model to show more data for some modules, when
* the user click on a `modules-data-model` link, its open the model
* dialog and show him the extra data.
*/
function ModulesDataModelInitialize() {
$( document ).on( 's123.page.ready.data-model', function( event ) {
$('a[data-rel="popupScreen"]').off('click.popupScreen').on('click.popupScreen',function(event) {
event.preventDefault();
var $this 	= $(this);
var href 	= $this.attr('href');
buildPopup('pagePopupWinID','','',href,true,true,false,'');
});
});
}
/**
* The function initialize the Homepage Video Setting.
*/
function HomepageVideoSettingInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
if ( $('#homepage_full_screen_3_party_video').length !== 0 ) {
var $videoIframe = $('#homepage_full_screen_3_party_video');
if ( $videoIframe[0].src.indexOf("youtube.com") > -1 ) {
(function () {
var script = document.createElement('script');
script.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
var player;
window.onYouTubePlayerAPIReady = function() {
player = new YT.Player('homepage_full_screen_3_party_video', {
playerVars: { 'autoplay': 1, 'controls': 0,'autohide':1,'wmode':'opaque','loop':1,'modestbranding':1,'rel':0,'showinfo':0 },
events: {
'onReady': onPlayerReady}
});
}
/**
* Callback function - The API will call this function when the video player is ready.
*/
function onPlayerReady(event) {
event.target.mute();
}
})();
} else if ( $videoIframe[0].src.indexOf("vimeo.com") > -1 ) {
(function () {
var script = document.createElement('script');
script.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
script.onload = function( script ) {
var player = $f($videoIframe[0]);
player.api('setVolume', 0);
};
firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
})();
}
}
});
}
/**
* The function initialize the Go-To-Top Button.
*/
function GoToTopButtonInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
$(window).scroll(function() {
var gotoTop = $('#gotoTop');
var top = 150;
if ( $(window).scrollTop() >= top ) {
gotoTop.show(200);
} else {
gotoTop.hide(200);
}
});
});
}
/**
* Active all popup in the page
*/
function ActivePopupInPage() {
$( document ).on( 's123.page.ready', function( event ) {
ActivePopupActionButtonsInPage();
});
}
function ActivePopupActionButtonsInPage() {
$('[data-toggle="search_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
OpenSearchWindow(closeLocation);
});
$('[data-toggle="social_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
if (findBootstrapEnvironment()=='xs') {
var isMobile = 'mobile';
} else {
var isMobile = '';
}
var content = $('#header-social-content').html();
/*
content += '<div class="socialBox">';
if ($('#facebook_url').val()!='') {
content += '<div class="insideBox '+ isMobile +'"><iframe src="https://www.facebook.com/plugins/page.php?href='+encodeURIComponent($('#facebook_url').val())+'&tabs=timeline&width=320&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="320" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>';
}
if ($('#twitter_url').val()!='' && findBootstrapEnvironment()!='xs') {
content += '<div class="insideBox"><a class="twitter-timeline" data-height="400" href="'+$('#twitter_url').val()+'">Tweets by</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>';
}
content += '<div>';
*/
buildPopup('popupFloatDivSearch','',content,'',true,true,true,closeLocation);
});
$('[data-toggle="phone_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
buildPopup('popupFloatDivSearch','',$('#header-phone-content').html(),'',true,true,true,closeLocation);
});
$('[data-toggle="address_menuCallActionIcons"]').off('click').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
buildPopup('popupFloatDivSearch','',$('#header-address').html(),'',true,true,true,closeLocation);
});
}
/**
* The function initialize the Site123 ad.
*/
function Site123AdButtonInitialize() {
$( document ).on( 's123.page.ready', function( event ) {
$(window).scroll(function() {
var showSmallAdOnScroll = $('#showSmallAdOnScroll');
var top = 150;
if ( $(window).scrollTop() >= top ) {
showSmallAdOnScroll.show(200);
} else {
showSmallAdOnScroll.hide(200);
}
});
});
}
/**
* Active the lazy image load
*/
function ActiveLazyImageLoad() {
$( document ).on( 's123.page.ready', function( event ) {
var $lazyImages = $('img.lazyload, .bgLazyload');
$lazyImages.lazyload();
});
$( document ).on( "s123.page.load", function( event ) {
$('img.lazyload').lazyload();
});
}
/**
* //Set heights of different elements so everything will fit to everything
*/
function SetHeightToEle() {
$( document ).on( 's123.page.ready', function( event ) {
$('.inside_page .s123-modules-container').css('min-height',$(window).height()-150);
$('.inside_page .s123-page-container').css('min-height',$(window).height()-150);
if (whatScreen.any()=='tablet') {
$('#top-menu').css('max-height',$(window).height()-$('.navbar-header').outerHeight(true)-50);
}
});
}
/**
* The function scroll the user to the first section when
* he click on the first button in the homepage.
*/
function MoveFirstSection(sectionNUM) {
var $pages = $('#s123ModulesContainer > section');
if ( $pages.length === 0 ) return;
if ( !sectionNUM ) sectionNUM = 1;
/**
* Sometimes the user choose to scroll to a page, and then hide it from
* homepage, and if it was the last page the scroll isn't working. We like
* to prevent such cases so we scroll the user to the last page instead.
*/
if ( sectionNUM > $pages.length ) sectionNUM = $pages.length;
/**
* Fix Section Number - At the previews version of this function we used
* the next selector to get the pages `$("section")`. The selector return
* all the website sections (include the homepage), and on the wizard we
* start the section counting from `1` related to this selector. Now we fix
* the selector and choose only the website pages, so we decrease the homepage
* section for not taking actions on existing user. Basically we need to stop
* scrolling users related to section number, and change the homepage to works
* like to promos, there we scroll to pages related to the page id.
*/
sectionNUM -= 1;
/**
* Scroll Offset - Some layouts has some padding that we need to scroll up
* to it, and on mobile it will be always 50 because we have the same layout.
*/
var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : 50;
$('html, body').stop().animate({
scrollTop: ($pages.eq(sectionNUM).offset().top - offset)
}, 1250, 'easeInOutExpo');
}
function MoveFirstSectionOrRedirect( url ) {
var $pages = $('#s123ModulesContainer > section');
/**
* Scroll Offset - Some layouts has some padding that we need to scroll up
* to it, and on mobile it will be always 50 because we have the same layout.
*/
var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : 50;
if ( $pages.length !== 0 ) {
$('html, body').stop().animate({
scrollTop: ($pages.eq(0).offset().top - offset)
}, 1250, 'easeInOutExpo');
} else {
if ( url ) location.href = url;
}
}
/**
* The function scroll the user from a module to another module.
*
* @param {string} fromModuleID - Source module (module that we scroll from it).
* @param {string} toModuleID - Destination module (module that we scroll to it).
*/
function ScrollToModule( fromModuleID, toModuleID ) {
var offset = findBootstrapEnvironment()!='xs' ? menuScrollOffset : 50;
var $scrollTo = $('#section-' + toModuleID);
if ( $scrollTo.length === 0 && fromModuleID!='' ) $scrollTo = $('#section-' + fromModuleID).next('section');
if ($('html.inside_page').length>0) {
if ($('#w').val()!='') {
location.href = '/?w='+$('#w').val()+'#section-'+toModuleID;
} else {
location.href = '/#section-'+toModuleID;
}
} else {
if ( $scrollTo.length !== 0 ) {
$('html, body').stop().animate({
scrollTop: ($scrollTo.offset().top - offset)
}, 1250, 'easeInOutExpo');
}
}
}
var dropdownClickFlag = 0; //Tell us if the user click on dropdown menu so we will not close it with the DOCUMENT event
function activeDropDownMenus() {
$( document ).on( 's123.page.ready', function( event ) {
activeDropDownMenusAction();
});
}
function activeDropDownMenusAction() {
$('.dropdown-submenu > a').click(function(event) {
event.preventDefault();
});
$('.navPages li').find('a').off('mouseenter.hideHoverMenu');
$('.navPages').find('.dropdown-submenu').off('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu').on('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu',function(e) {
var $this = $(this).find('> a');
var eventType = e.type;
if (eventType=='mouseenter') {
activeDropDownMenusAction_open(e,$this);
}
if (eventType=='mouseover') {
$this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen','true');
}
if (eventType=='click') {
if (dropdownClickFlag==0) {
activeDropDownMenusAction_open(e,$this);
} else {
RemoveAllDropDownMenus();
}
}
if (eventType=='mouseout') {
$this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen','false');
setTimeout(function(){
if ($this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen')=='false') {
$this.parent('.dropdown-submenu').removeClass('active').removeClass('open');
}
}, 2000);
}
});
$('.navPages > li').not('.dropdown-submenu').find(' > a').off('mouseenter.hideHoverMenu').on('mouseenter.hideHoverMenu',function(e) {
$('.dropdown-submenu').removeClass('active').removeClass('open').removeClass('activePath');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
});
$(document).off('click.subMenu').on('click.subMenu',function(e) {
if (dropdownClickFlag==0 && $('.dropdown-submenu.open').length>0) {
RemoveAllDropDownMenus();
}
});
$('#popupFloatDivMenu .navPagesPopup').find('.dropdown-submenu > a').off('click.subMenu').on('click.subMenu',function(e) {
e.preventDefault();
e.stopPropagation();
var $this = $(this);
var eventType = e.type;
if (eventType=='click') {
if ($this.parent('.dropdown-submenu.active').length>0) {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
} else {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
$this.parent('.dropdown-submenu').addClass('active').addClass('open');
}
}
});
}
function RemoveAllDropDownMenus() {
$('.dropdown-submenu').removeClass('active').removeClass('open');
$('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
}
function activeDropDownMenusAction_open(e,$this) {
dropdownClickFlag = 1;
$this.parent('.dropdown-submenu').addClass('active').addClass('open');
$this.parents('.dropdown-submenu').each(function() {
var $this = $(this);
$this.addClass('activePath');
});
$('.dropdown-submenu').not('.activePath').removeClass('active').removeClass('open').removeClass('activePath');
$('.dropdown-submenu.activePath').removeClass('activePath');
setTimeout(function() {
dropdownClickFlag = 0;
},1000);
}
/**
* The function Trigger the Site123 page ready custom event.
*/
function TriggerS123PageReady() {
$( document ).trigger( 's123.page.ready' );
}
/**
* The function Trigger the Site123 page load custom event.
*/
function TriggerS123PageLoad() {
$( document ).trigger( 's123.page.load' );
}
var layoutMenuPositionTXT;
var layoutMenuPositionOpenMenuTXT;
jQuery(function($) {
TopSectionInitialize();
CountersModuleInitialize();
CarouselModuleInitialize();
SongsModuleInitialize();
ContactFormHomeInitialize();
MailingModuleInitialize();
JobsModuleInitialize();
PromoModuleInitialize();
PromoOldV1ModuleInitialize();
ActivePopupInPage();
SearchModuleInitialize();
ModulesDataModelInitialize();
HomepageVideoSettingInitialize();
GoToTopButtonInitialize();
Site123AdButtonInitialize();
ActiveLazyImageLoad();
SoundManagerButtons();
ActiveOrderPopup();
SetHeightToEle();
layoutMenuPositionTXT 			= $('#layoutMenuPositionTXT').val();
layoutMenuPositionOpenMenuTXT 	= ChangeDirection(layoutMenuPositionTXT);
if (layoutMenuPositionTXT=='left' || layoutMenuPositionTXT=='right') {
FixMenuTopPosition_SideMenu();
}
if (layoutMenuPositionTXT=='top' || layoutMenuPositionTXT=='bottom') {
FixMenuTopPosition_TopMenu();
}
activeDropDownMenus();
ActiveLanguageButton();
PageScrollByClick();
RefreshScrollSpy();
openDivMenuOnMobileClick();
RefreshParallaxImages();
RefreshAOS();
MutationObserverHandler();
OpenModuleManagment();
TriggerS123PageReady();
jqueryValidatorTranslatedMessages();
});
$(window).load(function () {
TriggerS123PageLoad();
});
/**
* AOS Initial - Animate On Scroll
* Note: AOS is a UMD module so we initial it outside of the ready or load events.
* Documentation : https://github.com/michalsnik/aos
*/
AOS.init({
offset: 20,
duration: 200,
delay: 0
});
/**
* The function blocking URL masking for users with a `Free Package`.
* it's mean that the user with a free package can't open his website inside
* a iFrame.
*/
function BlockUrlMasking() {
if ( !$.isNumeric($('#w').val()) && packageNUM < '2' ) {
if ( window.location != window.parent.location ) {
window.top.location = 'http://'+domain+'.'+subDomainUrl;
}
}
}
function ChangeDirection(position) {
switch (position) {
case 'right':
return 'left';
break;
case 'left':
return 'right';
break;
case 'top':
return 'bottom';
break;
case 'bottom':
return 'top';
break;
}
}
/**
* The function handle all the add-to-cart buttons and active them for adding
* the selected product to the cart.
*/
function ActiveOrderPopup() {
$( document ).on( 's123.page.ready', function( event ) {
$('.orderButtonPopup').off('click').on('click',function( event ) {
var $this = $(this);
if ( !atcValidator() ) return;
$.ajax({
type: "POST",
url: "/versions/"+$('#versionNUM').val()+"/wizard/orders/front/addToCart.php",
data: {
w: $('#w').val(),
websiteID: $('#websiteID').val(),
uniquePageID: $this.data('unique-page'),
moduleID: $this.data('module'),
productOptions: $('#productOptions').length !== 0 ? $('#productOptions').html() : '',
customText: $('#customText').length !== 0 ? $('#customText').html() : '',
cartType: '1'
},
success: function( data ) {
if (window.frameElement && window.frameElement.id=='websitePreviewIframe') { //we make sure we don't in the interface
buildPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&cartType=1&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
} else {
parent.buildPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&cartType=1&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
}
$('#sideCartButton').show();
}
});
});
$('.orderDonateButtonPopup').off('click').on('click',function( event ) {
var $this = $(this);
if (window.frameElement && window.frameElement.id=='websitePreviewIframe') { //we make sure we don't in the interface
buildPopup('popupCart',translations.ChooseTheAmountDonate,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/donateScreen.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&uniquePageID='+$this.data('unique-page')+'&moduleID='+$this.data('module')+'',true,false,true,'');
} else {
parent.buildPopup('popupCart',translations.ChooseTheAmountDonate,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/donateScreen.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&uniquePageID='+$this.data('unique-page')+'&moduleID='+$this.data('module')+'',true,false,true,'');
}
});
$('.orderOpenCart').off('click').on('click',function( event ) {
var $this = $(this);
if (window.frameElement && window.frameElement.id=='websitePreviewIframe') { //we make sure we don't in the interface
buildPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&cartType=1&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
} else {
parent.buildPopup('popupCart',translations.cart,'','/versions/'+$('#versionNUM').val()+'/wizard/orders/front/showCart.php?w='+$('#w').val()+'&websiteID='+$('#websiteID').val()+'&cartType=1&tranW='+websiteLanguageCountryFullCode+'',true,false,true,'');
}
});
});
/**
* The function check if the product have fields that need to validation
* before adding them to cart, if so the function alert the user and return
* false, otherwise it return true.
*/
function atcValidator() {
var $ct = $("#product-custom-text");
if ( $ct.length !== 0 && $ct.data('mandatory') ) {
var $ct_fieldTitle = $('#ct_fieldTitle');
if ( $ct_fieldTitle.val().length === 0 ) {
$ct_fieldTitle.popover({
container: 'body',
content: translations.productvalidatorPopover,
trigger: 'manual',
template: '<div class="popover product-validator-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
placement: function(popover, input) {
return isMobile.any() ? 'auto' : ($('html').attr('dir') === 'rtl' ? 'left' : 'right');
}
});
$ct_fieldTitle.popover('show').one('input', function(e) {
$(this).popover('hide');
});
$ct_fieldTitle.focus();
return false;
}
}
return true;
}
}
function ReduseMenuSizeWhenWeDontHavePlace() {
ReduseMenuSizeWhenWeDontHavePlace_Action($('#top-menu .navPages'),'header',8);
ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'),'footer',4);
FixMenuTopPosition_TopMenu();
ShowMenuAfterReduseSize('header');
ShowMenuAfterReduseSize('footer');
}
function ReduseMenuSizeWhenWeDontHavePlace_Action($nav,$place,$padding) {
if (findBootstrapEnvironment()!='xs' && CheckMenuWidthSpace($place) && $nav.find('>li>a').length>1) {
$nav.find('>li>a').css('padding-right',$padding+'px');
$nav.find('>li>a').css('padding-left',$padding+'px');
if (CheckMenuWidthSpace($place)) {
if ($nav.find('.extra-nav-more').length==0) {
var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a href="#" aria-haspopup="true" aria-expanded="true">'+translations.more.toLowerCase()+'';
if ($place=='footer') {
x += ' <span class="fa fa-caret-up"></span></a> <ul class="site-dropdown-menu dropdown-side-open-up';
} else {
x += ' <span class="fa fa-caret-down"></span></a> <ul class="site-dropdown-menu';
}
x += '"></ul></li>';
$nav.append(x);
}
var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
if ($newLIpage.hasClass('dropdown-submenu')==true) {
$newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-left');
if ($place=='header') {
if ( $('html').attr('dir') == 'rtl' ) {
$newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-left');
} else {
$newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
}
}
if ($place=='footer') {
$newLIpage.find('.site-dropdown-menu').removeClass('dropdown-side-open-up');
$newLIpage.find('.fa-caret-up').removeClass('fa-caret-up').addClass('fa-caret-'+layoutMenuPositionOpenMenuTXT+'');
}
}
if ($nav.find('.extra-nav-more').length==0) {
$nav.find(".extra-nav-more").detach().prependTo($nav);
}
ReduseMenuSizeWhenWeDontHavePlace_Action($nav,$place,$padding);
}
}
}
function CheckMenuWidthSpace($place) {
if ($place=='header') {
switch($('#layoutNUM').val()) {
case '2':
if ($('#mainNav .container').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '5':
if ($('.body').outerWidth(false)-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '13':
case '27':
if ($('#mainNav .container').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '19':
case '21':
case '22':
$('#centerLogo19').remove();
$('#top-menu').css({'padding-right':'0','padding-left':'0'});
if ($('#mainNav .container-fluid').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#mainNav .navActions').outerWidth(true)+120) {
return true;
} else {
return false;
}
break;
case '28':
$('#centerLogo19').remove();
$('#top-menu').css({'padding-right':'0','padding-left':'0'});
if ($('#mainNav .container').width()-50<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#mainNav .navActions').outerWidth(true)+120) {
return true;
} else {
return false;
}
break;
default:
if (GetTopMenuWidthByIsContainer()<$('.navbar-header').outerWidth(true)+$('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true)) {
return true;
} else {
return false;
}
}
}
if ($place=='footer') {
switch($('#footer_layout').val()) {
case '2':
if ($('.global_footer .part1').outerWidth(true)-100<$('.global_footer .nav').outerWidth(true)) {
return true;
} else {
return false;
}
break;
case '1':
case '3':
case '4':
if ($('.global_footer .side2').outerWidth(true)-100<$('.global_footer .nav').outerWidth(true)) {
return true;
} else {
return false;
}
}
}
}
function GetTopMenuWidthByIsContainer() {
if ($('#mainNav .container').length>0) {
return $('#mainNav .container').width()-50;
} else {
return $(window).outerWidth(true)-50;
}
}
function ReduseMenuSizeWhenWeDontHavePlaceHeight() {
ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
FixMenuTopPosition_SideMenu();
ShowMenuAfterReduseSize('');
ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'),'footer',4);
FixMenuTopPosition_TopMenu();
ShowMenuAfterReduseSize('footer');
}
function ReduseMenuSizeWhenWeDontHavePlaceHeight_action() {
var $nav = $('#top-menu .navPages');
if (findBootstrapEnvironment()!='xs' && CheckMenuWidthSpaceHeight() && $nav.find('>li>a').length>1) {
$nav.find('>li>a').css('padding-top','5px');
$nav.find('>li>a').css('padding-bottom','5px');
if (CheckMenuWidthSpaceHeight()) {
if ($nav.find('.extra-nav-more').length==0) {
var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a href="#" aria-haspopup="true" aria-expanded="true">';
if ( $('html').attr('dir') == 'rtl' ) {
if (layoutMenuPositionOpenMenuTXT=='right') {
x += '<span class="fa fa-caret-'+layoutMenuPositionOpenMenuTXT+'"></span> ';
x += translations.more.toLowerCase();
} else {
x += translations.more.toLowerCase();
x += ' <span class="fa fa-caret-'+layoutMenuPositionOpenMenuTXT+'"></span>';
}
} else {
if (layoutMenuPositionOpenMenuTXT=='right') {
x += translations.more.toLowerCase();
x += ' <span class="fa fa-caret-'+layoutMenuPositionOpenMenuTXT+'"></span>';
} else {
x += '<span class="fa fa-caret-'+layoutMenuPositionOpenMenuTXT+'"></span> ';
x += translations.more.toLowerCase();
}
}
x += '</a> <ul class="site-dropdown-menu dropdown-side-open-'+layoutMenuPositionOpenMenuTXT+'"></ul></li>';
$nav.append(x);
}
var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
if ($newLIpage.hasClass('dropdown-submenu')==true) {
$newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-'+layoutMenuPositionOpenMenuTXT+'');
}
if ($nav.find('.extra-nav-more').length==0) {
$nav.find('.extra-nav-more').detach().prependTo($nav);
}
ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
}
}
}
function CheckMenuWidthSpaceHeight() {
switch($('#layoutNUM').val()) {
case '3':
case '7':
case '11':
case '12':
if ($(window).outerHeight(true)-20<$('.sidebar-brand').outerHeight(true)+$('#top-menu .navPages').outerHeight(true)+$('#top-menu .navActions').outerHeight(true)+$('#top-menu .headerSocial').outerHeight(true)) {
return true;
} else {
return false;
}
break;
default:
if ($(window).outerHeight(true)-20<$('.header-logo').outerHeight(true)+$('#top-menu .navPages').outerHeight(true)+$('#top-menu .navActions').outerHeight(true)+$('#top-menu .headerSocial').outerHeight(true)) {
return true;
} else {
return false;
}
}
}
function ShowMenuAfterReduseSize($place) {
if ($('#layoutNUM').val()=='19' || $('#layoutNUM').val()=='21' || $('#layoutNUM').val()=='22' || $('#layoutNUM').val()=='28') {
$('#centerLogo19').remove();
$('#top-menu').css({'padding-right':'0','padding-left':'0'});
var menuWidth = ($('#top-menu .navPages').outerWidth(true)+$('#top-menu .navActions').outerWidth(true))/2;
var sumLIofMenu = 0;
var saveLIplace = 1;
var extraPaddingFromSideOne = 0;
$('#top-menu .navPages > li').each(function() {
var $this = $(this);
sumLIofMenu += $this.outerWidth(true);
if (sumLIofMenu>=menuWidth) {
extraPaddingFromSideOne = sumLIofMenu-menuWidth;
return false;
}
saveLIplace++;
});
if ($('#top-menu .navPages > li').eq(saveLIplace-1).outerWidth(true)*0.6<=(extraPaddingFromSideOne)) {
saveLIplace = saveLIplace-1;
}
if ($('#top-menu .navPages > li').eq(saveLIplace-1).length>0) {
$('<li id="centerLogo19">'+$('.navbar-header').html()+'</li>').insertAfter($('#top-menu .navPages > li').eq(saveLIplace-1));
} else {
$('#top-menu .navPages').append('<li id="centerLogo19">'+$('.navbar-header').html()+'</li>');
}
$('#centerLogo19 a').attr('data-href',$('#centerLogo19 a').attr('href')).attr('href','');
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
ShowMenuAfterReduseSize_finishCalc();
}
if ($place=='' || $place=='header') {
$('#top-menu .navPages, #top-menu .navActions, #top-menu .headerSocial').css({
'position':'static',
'top':'auto',
'left':'auto'
});
}
if ($place=='footer') {
$('.global_footer .nav').css({
'position':'static',
'top':'auto',
'left':'auto'
});
}
activeDropDownMenusAction();
}
function ShowMenuAfterReduseSize_finishCalc() {
var screenCenterPoint 		= $(window).outerWidth(true)/2;
var logoLeftPXforCenter 	= Math.round(screenCenterPoint-($('#centerLogo19').outerWidth(true)/2));
var logoExistingLeftPX 		= Math.round($('#centerLogo19').offset().left);
if (logoLeftPXforCenter>logoExistingLeftPX) {
var result = (logoLeftPXforCenter-logoExistingLeftPX);
var existingPadding = parseInt($('#top-menu').css('padding-left'),10);
result = result+existingPadding;
$('#top-menu').css('padding-left',(result)+'px');
} else {
var result = (logoExistingLeftPX-logoLeftPXforCenter);
var existingPadding = parseInt($('#top-menu').css('padding-right'),10);
result = result+existingPadding;
$('#top-menu').css('padding-right',(result)+'px');
}
}
function SoundManagerButtons() {
$('.play-pause').click(function() {
var $this = $(this);
if ($this.find('i').hasClass('fa-play')) {
$this.find('i').removeClass('fa-play').addClass('fa-pause');
} else {
$this.find('i').removeClass('fa-pause').addClass('fa-play');
}
})
}
function FixMenuTopPosition_SideMenu() {
$('.navPages .dropdown-submenu > a').on('click mouseenter', function(e) {
$this = $(this).parent().find('.site-dropdown-menu');
if ($this.length>0) {
setTimeout(function() {
var rect = $this[0].getBoundingClientRect();
if (rect.top + rect.height > window.innerHeight && rect.height<window.innerHeight) {
$this.css('top',parseInt($this.css('top'), 10) - (rect.top + rect.height - window.innerHeight));
}
},100);
}
});
};
function FixMenuTopPosition_TopMenu() {
$('.navPages .dropdown-submenu > a, .global_footer .nav .dropdown-submenu > a').on('click mouseenter', function(e) {
$this = $(this).parent().find('.site-dropdown-menu');
if ($this.length>0) {
setTimeout(function() {
if ($this.length>0) {
var rect = $this[0].getBoundingClientRect();
if (rect.top + rect.height > window.innerHeight && rect.height<window.innerHeight) {
$this.css({
'bottom':'100%',
'top':'auto'
});
} else {
if (rect.top<0 || rect.bottom<0) {
$this.css({
'top':'100%',
'bottom':'auto'
});
}
}
if ( $('html').attr('dir') != 'rtl' ) {
if (rect.right>window.innerWidth && rect.width<window.innerWidth) {
$this.css({
'left':'auto',
'right':'0'
});
}
} else {
if (rect.left<0 && rect.width<window.innerWidth) {
$this.css({
'right':'auto',
'left':'0'
});
}
}
}
},100);
}
});
}
function openDivMenuOnMobileClick() {
$('.header-menu-wrapper a').click(function() {
var $this = $(this);
var closeLocation = $this.data('closeLocation');
openDivMenuOnMobileClickAction(closeLocation);
});
}
function ResetMoreButton() {
$('#top-menu .navPages, #top-menu .navActions, #top-menu .headerSocial, .global_footer .nav').css({
'position':'absolute',
'top':'-9999px',
'left':'-9999px'
});
$('#top-menu .navPages .extra-nav-more > ul > li').each(function() {
var $this = $(this);
$this.appendTo($('#top-menu .navPages'));
});
$('#top-menu .navPages .extra-nav-more').remove()
$('footer .navPages .extra-nav-more > ul > li').each(function() {
var $this = $(this);
$this.appendTo($('footer .navPages'));
});
$('footer .navPages .extra-nav-more').remove();
ReduseMenuSizeWhenWeDontHavePlace();
}
function openDivMenuOnMobileClickAction(closeLocation) {
var pageList = '<ul class="navPagesPopup">'+$('#top-menu-mobile > ul').clone().html()+'</ul>';
var actionButtons = '<div class="navPagesPopupActionButtons">';
actionButtons += '<div class="navPagesPopupActionButtons_part1">';
if ($('.header-phone-wrapper').length>0) {
actionButtons += $('.header-phone-wrapper').clone().html();
}
if ($('.header-address-wrapper').length>0) {
actionButtons += $('.header-address-wrapper').clone().html();
}
if ($('.header-social-wrapper').length>0 && $('.header-social-wrapper.hidden').length==0) {
actionButtons += $('.header-social-wrapper').clone().html();
}
if ($('.header-search-wrapper').length>0) {
actionButtons += $('.header-search-wrapper').clone().html();
}
if ($('.website-languages-menu a').length>0) {
actionButtons += $('.website-languages-menu').clone().html();
}
actionButtons += '</div>';
if ($('.action-button-wrapper').length>0) {
actionButtons += '<div class="navPagesPopupActionButtons_part2">';
$('.action-button-wrapper').each(function() {
var $this = $(this);
actionButtons += $this.clone().html();
})
actionButtons += '</div>';
}
actionButtons += '</div>';
buildPopup('popupFloatDivMenu','',pageList+actionButtons,'',true,true,true,closeLocation);
setTimeout(function() {
var navHeight 		= $('#popupFloatDivMenu .navPagesPopup').outerHeight(true)+100; //We add another 100px so the menu will be more taller to make some space and to make some space when the user have categories
var actionHeight 	= $('.navPagesPopupActionButtons').outerHeight(true);
var screenHeight 	= $('#popupFloatDivMenu .page').outerHeight(true);
if (navHeight+actionHeight>screenHeight) {
$('#popupFloatDivMenu .navPagesPopup').height(screenHeight-actionHeight-15);
} else {
$('#popupFloatDivMenu .navPagesPopup').height(navHeight-15);
}
$('#popupFloatDivMenu .navPagesPopup .dropdown-submenu > a').prepend('<i class="fa fa-plus catMobileIcon"></i> ');
$('#popupFloatDivMenu .navPagesPopup .caret').remove();
$('#popupFloatDivMenu .navPagesPopup .fa-caret-right').remove();
$('#popupFloatDivMenu .navPagesPopup .fa-caret-left').remove();
},150);
activeDropDownMenusAction();
$('#popupFloatDivMenu .navPagesPopup li').not('.dropdown-submenu').find('a').click(function() {
buildPopup_CloseAction('popupFloatDivMenu');
});
$('#popupFloatDivMenu .navPagesPopupActionButtons_part2 a').click(function() {
buildPopup_CloseAction('popupFloatDivMenu');
});
ActivePopupActionButtonsInPage();
$(document).trigger('s123.page.ready.pageScrollByClick');
ActiveLanguageButton();
}
function ActiveLanguageButton() {
$('.website-languages-menu-link').click(function() {
openDivMenuOnLanguageClickAction();
});
}
function openDivMenuOnLanguageClickAction() {
var content = '<ul class="languagesList navPagesPopup">';
$.each(languageList, function( index, language ) {
if (language['countryCode'] && language['countryCode']!='') {
content += '<li><a href="'+language['url']+'"><img src="/files/vendor/flag-icon-css-master/flags/1x1/'+language['countryCode']+'.svg" style="width:20px;height:14px;">&nbsp;'+language['name']+'</a></li>';
} else {
content += '<li><a href="'+language['url']+'">'+language['name']+'</a></li>';
}
});
content += '</ul>';
buildPopup('popupFloatDivMenuLanguages','',content,'',true,true,true,'');
}
function PageScrollByClick() {
$( document ).on( 's123.page.ready.pageScrollByClick', function( event ) {
var offset = findBootstrapEnvironment()!='xs' ? menuScrollOffset : 50;
$('a.page-scroll').off('click.scrollEvent').on('click.scrollEvent',function(event) {
var $anchor = $(this);
$('html, body').stop().animate({
scrollTop: ($($anchor.attr('href')).offset().top - offset)
}, 1250, 'easeInOutExpo');
event.preventDefault();
});
});
}
/**
* The function refresh the Bootstrap Scrollspy. The Scrollspy is the
* object that responsible on Highlighting the top navigation bar as
* scrolling occurs. In some cases we need to refresh the it because
* changes we made in the DOM via Ajax. e.g. changing the pages places.
* Note: We initialize it on the layouts JS files.
* Documentation: http://v4-alpha.getbootstrap.com/components/scrollspy/
*/
function RefreshScrollSpy() {
$( document ).on( 's123.page.ready.refreshScrollSpy', function( event ) {
$('body').scrollspy('refresh');
});
};
function findBootstrapEnvironment() {
var envs = ['xs', 'sm', 'md', 'lg'];
var $el = $('<div>');
$el.appendTo($('body'));
for (var i = envs.length - 1; i >= 0; i--) {
var env = envs[i];
$el.addClass('hidden-'+env);
if ($el.is(':hidden')) {
$el.remove();
return env;
}
}
}
function buildPopup(popID,title,content,iframeURL,closeEsc,closeEnter,oneColor,closeLocation) {
if ( $('#'+popID).length !== 0 ) return;
/*
window.onhashchange = function() {
if ($('#'+popID).length>0 && window.location.hash.substr(1)!=popID) {
buildPopup_CloseAction(popID);
}
}
*/
var header = '';
if (popID!='pagePopupWinID') {
if (title!='') {
header = '<div class="popupHeader">';
} else {
header = '<div class="popupHeader emptyHeader">';
}
header += '<div class="title">'+title+'&nbsp;</div>';
header += '<div class="popupCloseButton '+closeLocation+'"><i class="fa fa-close fa-3x"></i></div>';
header += '</div>';
}
if (iframeURL!='') {
var iClass = '';
if ( iframeURL.indexOf("youtube.com") > -1 ) {
iClass 	= 'videoSize';
}
if ( iframeURL.indexOf("vimeo.com") > -1 ) {
iClass 	= 'videoSize';
}
content = '<iframe id="'+popID+'_iFrame" src="'+iframeURL+'" class="iframe '+iClass+'"></iframe>';
}
if (popID=='pagePopupWinID') {
var x = '<div id="'+popID+'_cover" class="coverWebsiteWithOpacity">';
x += '<div class="popupCloseButton '+closeLocation+'">';
x += '<i class="fa fa-close fa-3x"></i>';
x += '</div>';
x += '</div>';
} else {
var x = '<div id="'+popID+'_cover" class="coverWebsiteWithOpacity"></div>';
}
x += '<div id="'+popID+'" class="popupWin container';
if (oneColor==true) {
x += ' oneColor';
}
x += '">';
x += '<div class="content">';
x += ''+header+'';
x += '<div class="page">'+content+'</div>';
x += '</div>';
x += '</div>';
$('body').append(x);
$('body').addClass('popupWinScroll');
$('#'+popID).find('.page').css({ overflow: 'hidden' });
$('#'+popID).slideDown("fast",function() {
$('#'+popID).css('display','flex');
if (iframeURL=='') {
$('#'+popID).find('.page').css({ overflow: 'auto' });
}
});
$('#'+popID).find('.popupCloseButton').click(function() {
buildPopup_CloseAction(popID);
});
$('#'+popID+'_cover').click(function() {
buildPopup_CloseAction(popID);
});
if (iframeURL!='') {
$('#'+popID+'_iFrame').on("load",function() {
setTimeout(function() {
var screenHeight 	= $('#pagePopupWinID .page').outerHeight(true);
$('#pagePopupWinID_iFrame').height(screenHeight);
if (!is_touch_device()) {
$('#'+popID).find('.page').css({ overflow: 'hidden' });
} else {
$('#'+popID).find('.page').css({ overflow: 'auto' });
}
},300);
});
}
$(document).keyup(function(e) {
if (closeEsc==true && e.keyCode === 27) {
buildPopup_CloseAction(popID);
}
/*
if (closeEnter==true && e.keyCode === 13) {
buildPopup_CloseAction(popID);
}
*/
});
}
function is_touch_device() {
return 'ontouchstart' in window        // works on most browsers
|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};
function buildPopup_CloseAction( popID ) {
var $popup = $('#'+popID);
var $popup_cover = $('#'+popID+'_cover');
$popup.find('.page').css({
overflow: 'hidden'
});
$popup.slideUp("fast",function() {
if ( $('.popupWin').length === 1 ) $('body').removeClass('popupWinScroll');
$popup.add($popup_cover).remove();
});
}
function buildPopup_CloseAllPopupsInPage() {
if ($('.popupWin').length>0) {
$('.popupWin').each(function() {
var popID = $(this).attr('id');
buildPopup_CloseAction(popID);
});
}
}
/**
* The function extend the jQuery validator Translated messages.
*
* according to this answer:
* `http://stackoverflow.com/questions/2457032/jquery-validation-change-default-error-message`
*/
function jqueryValidatorTranslatedMessages() {
jQuery.extend(jQuery.validator.messages, {
required: translations.jqueryValidMsgRequire,
remote: translations.jqueryValidMsgRemote,
email: translations.jqueryValidMsgEmail,
url: translations.jqueryValidMsgUrl,
date: translations.jqueryValidMsgDate,
dateISO: translations.jqueryValidMsgDateISO,
number: translations.jqueryValidMsgNumber,
digits: translations.jqueryValidMsgDigits,
creditcard: translations.jqueryValidMsgCreditcard,
equalTo: translations.jqueryValidMsgEqualTo,
accept: translations.jqueryValidMsgAccept,
maxlength: jQuery.validator.format(translations.jqueryValidMsgMaxlength),
minlength: jQuery.validator.format(translations.jqueryValidMsgMinlength),
rangelength: jQuery.validator.format(translations.jqueryValidMsgRangelength),
range: jQuery.validator.format(translations.jqueryValidMsgRange),
max: jQuery.validator.format(translations.jqueryValidMsgMax),
min: jQuery.validator.format(translations.jqueryValidMsgMin)
});
}
function OpenModuleManagment() {
$( document ).on( 's123.page.ready', function( event ) {
if ( typeof window.top.OpenModuleManagmentWizard === 'undefined'
|| !$.isFunction(window.top.OpenModuleManagmentWizard) ) return;
var $previewManageButton = $('.previewManageButton');
$previewManageButton.each( function( index ) {
var $pmb = $(this);
$pmb.find('> a').off('click.p_m_buttons');
switch ( $pmb.data('type') ) {
case 'homepage':
var homepage_goal = window.top.$('#homepage_goal').val();
$pmb.find(' > a').hide();
if ( window.top.homepageModulesArr[homepage_goal]['tool_text'] == '1' ) {
$pmb.find('[data-action="edit"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse2');
})
.css({ display: 'flex' });
}
if (window.top.homepageModulesArr[homepage_goal]['tool_background'] == '1' ) {
$pmb.find('[data-action="image"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse8');
})
.css({ display: 'flex' });
}
if (window.top.homepageModulesArr[homepage_goal]['tool_buttons'] == '1' ) {
$pmb.find('[data-action="buttons"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse3');
})
.css({ display: 'flex' });
}
if (window.top.homepageModulesArr[homepage_goal]['tool_video'] == '1' ) {
$pmb.find('[data-action="video"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse4');
})
.css({ display: 'flex' });
}
if (window.top.homepageModulesArr[homepage_goal]['tool_form'] == '1' ) {
$pmb.find('[data-action="form"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse5');
})
.css({ display: 'flex' });
}
$pmb.find('[data-action="layouts"]')
.on('click.p_m_buttons',function( event ) {
event.preventDefault();
expandWizardHomepage('#homepageCollapse7');
})
.css({ display: 'flex' });
break;
default:
$pmb.find('a.edit').on('click.p_m_buttons',function() {
event.preventDefault();
var $this 			= $(this);
var moduleID 		= $this.data('module-id');
var moduleTypeNUM 	= $this.data('module-type');
var itemID 			= $this.data('item-id');
if ( itemID == '' ) {
window.top.OpenWizardTab('pagesTab',true);
window.top.$('.moduleSortList .modulesEditButton[data-moduleid="'+moduleID+'"]').trigger('click');
} else {
window.top.OpenModuleManagmentWizard(moduleID,moduleTypeNUM,itemID);
}
});
$pmb.find('a.design').on('click.p_m_buttons',function() {
event.preventDefault();
var $this 			= $(this);
var moduleID 		= $this.data('module-id');
window.top.OpenWizardTab('pagesTab',true);
setTimeout(function() {
window.top.$('.moduleSortList .designModuleButton[data-module-id="'+moduleID+'"]').trigger('click');
},300);
});
}
/**
* Bootstrap Tooltip Initialize
* Documentation: https://v4-alpha.getbootstrap.com/components/tooltips/
*/
$pmb.find('> a').tooltip({
container: 'body',
placement: $('html').attr('dir') === 'rtl' ? 'right' : 'left'
});
});
$previewManageButton.css({ display: 'flex' });
/**
* The function open expand the sent accordion in the
* management wizard accordion.
*/
function expandWizardHomepage( accordionId ) {
var $accordion = window.top.$(accordionId);
window.top.OpenWizardTab('homepageTab',true);
if ( $accordion.hasClass('in') ) {
$accordion.closest('.panel').addClass('p-m-b-wizard-accordion-flash');
setTimeout(function() {
$accordion.closest('.panel').removeClass('p-m-b-wizard-accordion-flash');
},500);
return;
}
window.top.$('[href="'+accordionId+'"]').trigger('click');
}
});
}