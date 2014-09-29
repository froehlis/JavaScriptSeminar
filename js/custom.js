/**
 * 
 */

$(document).ready(function() {

	// test data
	var books = [ {
		title : "jQuery",
		author : "Steyer, Ralph",
		price : 20.00,
		id : 1
	}, {
		title : "JavaScript",
		author : "Steyer, Ralph",
		price : 30.00,
		id : 2
	}, {
		title : "jQuery Mobile",
		author : "Dierenfeldt, Marco",
		price : 18,
		id : 3
	}, {
		title : "JavaScript & jQuery",
		author : "Duckett, Jon",
		price : 26,
		id : 4
	}, {
		title : "Single-Page Web-Apps",
		author : "Spindler, Heiko",
		price : 26,
		id : 5
	}, {
		title : "jQuery",
		author : "Bongers, Frank",
		price : 25,
		id : 5
	} ];

	/*
	 * functions for advantages
	 */
	// check checkboxes
	$("#checkButton").click(function() {
		//$(".advCheckbox").prop("checked", true);
		$("input:checkbox.advCheckbox").prop("checked",true);
		$("html,body").animate({
			scrollTop : $("#formInsertion").offset().top
		}, 800);
	});

	/*
	 * Books - create and manipulate
	 */

	// init
	// show all books
	for (var i = 0; i < books.length; i++) {
		createBook(books[i], $("#books"));
	}

	// create single book and append it to appendTo
	function createBook(book, appendTo) {
		if (book && appendTo) {
			var newBook = $("<div></div>");
			newBook.addClass("book");
			//create data attribute with bookId
			newBook.attr("data-bookid", book.id);

			// create content for book:
			newBook.append($("<div>PICTURE</div>").addClass("picture"));
			newBook.append("<p><b>" + book.title + "</b></p>");
			newBook.append("<p>" + book.author + "</p>");
			newBook.append("<p>Price: " + book.price + "€</p>");

			//append the new book to the given container "appendTo"
			appendTo.append(newBook);
		}
	}

	// show all books
	$("#showBooks").click(function() {
		// remove all displayed books
		$("#books .book").remove();

		/* createBooks(); */
		for (var i = 0; i < books.length; i++) {
			createBook(books[i], $("#books"));
		}

		// make it draggable
		$("#booksCreateManipulate .book").draggable({
			helper : "clone"
		});
	});

	// show sorted list of books (sorted by price)
	$("#sortByPrice").click(function() {
		// remove all displayed books
		$("#books .book").remove();

		// sort them
		var sortedBooks = books.slice().sort(function(a, b) {
			return a.price - b.price
		});

		// display them again
		for (var i = 0; i < sortedBooks.length; i++) {
			createBook(sortedBooks[i], $("#books"));
		}
		
		// make it draggable
		$("#booksCreateManipulate .book").draggable({
			helper : "clone"
		});
	});

	// show sorted list of books (sorted by author)
	$("#sortByAuthor").click(function() {
		// remove all displayed books
		$("#books .book").remove();

		// sort them
		var sortedBooks = books.slice().sort(function(a, b) {
			if (a.author < b.author) {
				return -1;
			} else if (a.author > b.author) {
				return 1;
			} else {
				return 0;
			}
		});

		// display them again
		for (var i = 0; i < sortedBooks.length; i++) {
			createBook(sortedBooks[i], $("#books"));
		}
		
		// make it draggable
		$("#booksCreateManipulate .book").draggable({
			helper : "clone"
		});
	});

	/*
	 * area 2 different methods to add content
	 */
	function createBooksHTML(appendTo) {
		var newBookHTML = "";
		for (var i = 0; i < 1000; i++) {
			// get next book:
			var currBook = books[i % books.length];

			// create and append it
			newBookHTML += "<div class=\"book\"><div class=\"picture\">PICTURE</div><p><b>" + currBook.title + "</b></p><p>" + currBook.author + "</p><p>Price: " + currBook.price + "€</p></div>";
		}
		if (appendTo) {
			appendTo.html(newBookHTML);
		}
	}

	function createBooksNormal(appendTo) {
		for (var i = 0; i < 1000; i++) {
			// get next book:
			var currBook = books[i % books.length];

			// create and append it
			createBook(currBook, appendTo);
		}
	}

	$("#createBooksNormal").click(function() {
		// where to append
		var appendTo = $(this).parent().children(".books");
		// remove all books
		$(appendTo).children(".book").remove();

		// take time and create
		var startTime = new Date();
		createBooksNormal(appendTo);
		alert("time in ms: " + (new Date() - startTime));
	});

	$("#createBooksHTML").click(function() {
		// where to append
		var appendTo = $(this).parent().children(".books");
		// remove all books
		$(appendTo).children(".book").remove();

		// take time and create
		var startTime = new Date();
		createBooksHTML(appendTo);
		alert("time in ms: " + (new Date() - startTime));
	});

	$("#removeBooks").click(function() {
		// where to append
		var appendTo = $(this).parent().children(".books");
		// remove all books
		$(appendTo).children(".book").remove();
	});

	// show sorted list of books (sorted by author)
	$("#testTheme").click(function() {
		// get containers / items which have the class theme-* and put their
		// classes into 'classes'
		var elements = $("[class|='theme']");

		elements.each(function(index, element) {
			var classes = $(element).attr("class").split(" ").filter(function(c) {
				return c.indexOf("theme-") === 0;
			});

			$(element).removeClass(classes.join(" "));
			$(element).addClass("theme-xy");
		});
	});

	// theme switcher:
	$("#themeSelector").change(function() {
		// get all elements with class theme-*
		var elements = $("[class*='theme-']");
		// get value of selected option of #themeSelector
		var selectedOption = $("#themeSelector option:selected").val();

		if (selectedOption && elements) {
			// iterate over all elements
			elements.each(function(index, element) {
				// and look over each class of current element if it is a
				// theme-* class
				var classes = $(element).attr("class").split(" ").filter(function(c) {
					return c.indexOf("theme-") > -1;
				});
				// remove all theme-* classes of current element
				$(element).removeClass(classes.join(" "));
				// add selected one
				$(element).addClass(selectedOption);
			});
		}
	});

	
	//jQueryUI draggable + droppable
	$("#booksCreateManipulate .book").draggable({
		helper : "clone"
	});
	$("#watchlist .dropbox").droppable({
		activeClass : "ui-state-default",
		hoverClass : "ui-state-hover",
		accept : "#booksCreateManipulate .book",
		drop : function(event, ui) {
			//search for duplicates:
			var bookId = $(ui.draggable).data("bookid");
			var contain = false;
			$(this).children().each(function(index, item) {
				var currBookId = $(item).children().last().data("bookid");
				if (currBookId === bookId) {
					contain = true;
				}
			})

			if (!contain) {
				//no duplicate:
				$(this).children().last().before($("<div class=\"book\"></div>").append((ui.draggable).clone()));
			} else {
				//duplicate
				// alert ("no duplicates allowed");
			}
		}
	});

});