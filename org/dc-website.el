(require 'ob-exp)
(require 'ox-html)
(require 'ox-publish)

(setq website-head
      (concat
       "<link rel=\"stylesheet\" href=\"./website.css\" type=\"text/css\" />\n"
       "<link href=\"https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500\" rel=\"stylesheet\">"))

(setq research-posts-head
      (concat
       "<link rel=\"stylesheet\" href=\"../research-posts.css\" type=\"text/css\" />\n"
       "<link href=\"https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500\" rel=\"stylesheet\">"))

(setq website-header-file "~/website/org/website-icons.html")
(defun website-header (arg)
  (with-temp-buffer
    (insert-file-contents website-header-file)
    (buffer-string)))

(setq website-footer-file "~/website/org/website-footer.html")
(defun website-footer (arg)
  (with-temp-buffer
    (insert-file-contents website-footer-file)
    (buffer-string)))

(setq org-html-preamble-format
      '(("en" "<p class=\"post-subtitle\"><a class=\"animate-link back\" href=\"../index.html\"> ← Back</a> |  %a | %d</p>")))

(setq org-publish-project-alist 'nil)
(setq org-publish-project-alist
      `(("website" :components ("pages" "research" "posts" "blog-static" "rss"))
	("pages"
	 :base-directory "~/website/org/"
	 :base-extension "org"
	 :recursive nil
	 :html-head ,website-head
	 :html-preamble website-header
	 :html-postamble nil
	 :author "Deepak Cherian"
	 :section-numbers nil
	 :with-toc nil
	 :html-doctype "html5"
	 :html-html5-fancy t
	 :html-head-include-scripts nil
	 :html-head-include-default-style nil
	 :html-container "section"
	 :publishing-directory "~/website/publish/"
	 :publishing-function org-html-publish-to-html)

	("research"
	 :base-directory "~/website/org/research/"
	 :base-extension "org"
	 :recursive nil
	 :html-head ,research-posts-head
	 :html-preamble t
	 ;; :html-preamble-format - how do I do this?
	 :html-postamble website-footer
	 :author "Deepak Cherian"
	 :html-doctype "html5"
	 :html-html5-fancy t
	 :section-numbers nil
	 :with-toc nil
	 :html-head-include-scripts nil
	 :html-head-include-default-style nil
	 :html-container "section"
	 :publishing-directory "~/website/publish/research/"
	 :publishing-function org-html-publish-to-html)

	("posts"
	 :base-directory "~/website/org/posts/"
	 :base-extension "org"
	 :recursive nil
	 :html-head ,research-posts-head
	 :html-preamble t
	 ;; :html-preamble-format - how do I do this?
	 :html-postamble website-footer
	 :author "Deepak Cherian"
	 :html-doctype "html5"
	 :html-html5-fancy t
	 :section-numbers nil
	 :with-toc nil
	 :html-head-include-scripts nil
	 :html-head-include-default-style nil
	 :html-container "section"
	 :publishing-directory "~/website/publish/posts/"
	 :publishing-function org-html-publish-to-html)

	("blog-static"
	 :base-directory "~/website/org/static/"
	 :base-extension "png\\|jpg\\|gif\\|pdf\\|mp4\\|js\\|html"
	 :publishing-directory "~/website/publish/static/"
	 :recursive t
	 :publishing-function org-publish-attachment)

	("rss"
	 :base-directory "~/website/org/posts/"
	 :base-extension "org"
	 :publishing-directory "~/website/publish/"
	 :recursive t
	 :publishing-function org-rss-publish-to-rss
	 :exclude ".*"
	 :include ("rss.org")

	 :with-toc nil
	 :section-numbers nil

	 :html-link-home "http://www.cherian.net/"
	 :html-link-use-abs-url t
	 :with-title t)))

(provide 'dc-website)
