# Content and copy

What the interface says: voice, labels, messages, terms, and how numbers, dates and plurals are written.

Not covered here: where a message sits, how long it lasts, and its severity.

**When rules conflict.** Accessibility minimums come first; a more specific rule wins over a general one; where two files disagree, the one whose subject it is wins. A rule or sentence that starts "By default" is a default a project may override, recording why in its `CHANGES.md`; defaults in 06 may only be made stricter, and every other rule is strict ([precedence](README.md#precedence)).

**Terms used here**
- **System banner, notice, toast:** a system banner is a full-width message below the header about a condition affecting the whole product; a notice is about one page, section or element and sits with what it's about ([1.60](01-screen-composition.md)); a toast briefly confirms something the person just did, and never carries an error.
- **Shared device:** one device used by several people in turn, who sign in at the device.

---

## 1. Voice and tone
7.1. **The product speaks with one voice everywhere.** Its tone changes with the person's situation: plainer, more direct and more instructive as stakes or stress rise, and lighter only on success.
7.2. **Errors, warnings and anything to do with safety are plain, specific and serious.** No humour, no interjections ("Oops"), no exclamation marks.
7.3. **Warnings and destructive actions state the consequence calmly.** They inform without alarming, never play the risk down, and never steer the person's choice.
7.4. **Success copy confirms the outcome and gets out of the way.** Messages people see often are the shortest and plainest.
7.5. **By default, the product doesn't refer to itself as "we" or "I".** It states what happened ("Couldn't load devices"), not who did it. An AI assistant may say "I" about its own work. A product that already speaks as "we" keeps doing so consistently.
7.6. **Interface copy usually leaves out "please" and "sorry".** In an instruction, "please" adds length without meaning, and "sorry" doesn't help anyone fix anything. "Sorry" is right when the product caused a serious failure or lost someone's work. "Please" fits a real request, such as asking someone to wait for a device.
7.7. **Errors, warnings and instructions prefer spelled-out negatives ("cannot", "do not"),** so "not" isn't missed at a glance. Positive contractions ("it's", "you'll") are fine elsewhere.
7.8. **No idioms, humour or culture-specific references.** The product is read in many languages and under pressure.

## 2. Case and punctuation
7.9. **Interface text uses sentence case by default:** titles, headings, labels, buttons, menu items, tabs and notifications. Only the first word and proper nouns are capitalised. A native iOS or macOS product may follow the platform's title case for buttons, alerts and notification titles, consistently. ALL CAPS is never used for emphasis.
7.10. **Buttons, labels, options, headings, list items that aren't sentences, and accessible names have no full stop.** Full sentences in body text, errors, dialogs and tooltips end with one.
7.11. **A field label has no colon after it.**
7.12. **Copy doesn't use exclamation marks, and uses words rather than symbols ("and", not "&").** "For example" and "such as" are preferred to "e.g." and "i.e.". The short forms are acceptable in tables, hints and other tight spaces, as long as one product uses one form.
7.13. **An ellipsis on a label means "in progress"** ("Saving…"), or that a menu item opens a further step before acting ("Export as…"). It's used for nothing else.
7.14. **A question keeps its question mark,** including in titles.
7.15. **Ranges use "to" in sentences ("8 to 10 devices").** An en dash is used only in tables and tight spaces.

## 3. Actions and links
7.16. **A button label starts with a verb and names exactly what happens, in one to three words.** Articles are dropped, as in "Deploy profile", "Send report" and "Add printer". It never says "OK", "Yes", "Submit" or "Click here".
7.17. **The same action has the same label everywhere it appears.** That includes the text that refers to it, so "Upload image" in a card matches "Upload image" on the button.
7.18. **The product uses one verb per outcome. This set is the starting point:**
    - **Create** makes something new.
    - **Add** puts an existing thing into a set.
    - **Remove** takes it out of the set without deleting it.
    - **Delete** destroys it.
    - **Cancel** abandons a task.
    - **Close** dismisses a view.
    - **Done** finishes a review or flow.
    - **Save** keeps changes.
    - **Apply** puts settings into effect.
    - **Edit** opens something for change.

    A product that already uses a different, consistent set keeps it. The rule is one verb per outcome, not these exact words.
7.19. **In a stepped flow, the forward button is "Next".** The first step's button can be "Start". On the step before the review it reads "Review", and on the review it names the finishing action ("Deploy", "Create rule").
7.20. **While an action runs, its label may change to the in-progress form of the same verb** ("Deploying…").
7.21. **An icon-only control's accessible name describes the action, not the picture** ("Close", not "X"; "Search devices", not "Magnifier"). It never includes the word "button".
7.22. **Link text names its destination and makes sense on its own,** with the key word first. "Learn more" alone and "click here" are never used. Two links that go to different places never share the same text.
7.23. **Instructions use input-neutral verbs: "select", "choose", "enter".** "Click" is never used, because people tap, click, press keys and scan.

## 4. Titles and headings
7.24. **A title names the place, the object or the situation in a few front-loaded words.** It never says only "Error", and it never shows a code.
7.25. **A title describes; the body or button says what to do.** The body never repeats the title.
7.26. **A screen that asks one question uses that question as its heading.** A screen that asks several uses a statement. A section name may sit above the heading as a small caption in `--type-label-small`, in sentence case; Zebra has no separate eyebrow style.
7.27. **Headings form an outline and never skip a level for styling.**

## 5. Fields
7.28. **A field label is one to three words and says what goes in the field.**
7.29. **A hint is one short sentence, with no full stop and no link.** It's only there for help most people need, and it sits outside the field, always visible. Format examples ("For example, ZT411-10022") go in the hint, never only in placeholder text.
7.30. **A setting's label says what it does when it's on.** Any explanation describes the on state only.
7.31. **Optional fields are marked "(optional)" in the label when they're the minority. Required fields are marked "(required)" when they are.** Asterisks alone are never used.
7.32. **A field filled by scanning is labelled for what it holds ("Serial number"), not how it's filled.** Its hint says it can be scanned or typed.

## 6. Errors
7.33. **Every error says what happened, then what to do, in one or two sentences.** If the cause is unknown, it says so plainly and still gives a next step. It never guesses.
7.34. **An error tells the person how to fix it, rather than stating the rule they broke.** "Enter a serial number with 12 characters", not "Invalid serial number".
7.35. **Error copy never uses "invalid", "illegal", "forbidden", "error occurred", "failed to", "you forgot" or "this field is required".** Codes and technical detail stay out of the message. If support needs a reference, it goes on a separate line.
7.36. **Field errors follow one pattern across the product:**
    - **Empty:** "Enter [the thing]" or "Select [the thing]".
    - **Too long:** "[Thing] must be N characters or less".
    - **Wrong format:** "Enter [thing] in the format [example]".
    - **Out of range:** "[Thing] must be between A and B".
    - **Conflict:** "[Thing] is already used by [where]".
7.37. **The same words appear at the field and in the error summary.**
7.38. **The most likely fix comes first.** Contacting support or an administrator comes second.
7.39. **A device or hardware error names the device, what it's doing, and the physical fix.** For example: "ZT411 at Line 3 is out of labels. Load labels, then select Retry."
7.40. **Errors that aren't about input say what's blocked and who can unblock it.** That covers no permission, not eligible and service unavailable, for example: "Only tenant owners can change billing. Ask an owner to change it."

## 7. Empty states
7.41. **Every empty area says why it's empty and what to do next.** The next step is a button where one exists.
7.42. **Each kind of empty has its own wording:**
    - **First use:** what this area is for, plus the create action.
    - **No results:** names the search or filter that found nothing, plus a way to clear it.
    - **All done:** acknowledges the finished work.
    - **Can't show:** why, and who can help.
7.43. **Empty-state titles are short, in sentence case, with no punctuation unless they ask a question.** The body is one or two sentences. The action is one or two words, starting with a verb.

## 8. Confirmations
7.44. **A confirmation's title asks about this specific action** ("Delete 3 printers?"). It never says "Are you sure?" or "Warning".
7.45. **The body names the object and the consequence with specifics** (names, counts, who's affected) and says whether it can be undone.
7.46. **The confirm button repeats the action verb ("Delete printers"), and the other button is "Cancel".** The body doesn't explain the buttons.
7.47. **For the rarest and most dangerous actions, the person types the object's name or a stated word to confirm.**

## 9. Success and outcomes
7.48. **A success message names the action and the object in the simple past ("Profile deployed", "3 files added").** It never says "Success!" or "successfully".
7.49. **If something was created, the message offers a way to view it.** If it can be undone, it says how. A next step is offered only if one exists.
7.50. **A partial outcome leads with what worked, then what didn't, by count** ("18 of 20 devices updated. 2 failed."). It links to the failures.
7.51. **The words for each status are fixed across the product, and each one says what it means in plain language** ("Offline", "Updating", "Needs attention"). The same status always has the same word. A status that needs action names the action in its detail.

## 10. Terms
7.52. **One word for one concept, everywhere.** Synonyms are never used for variety, and one word is never used for two things. Terms are kept in a product glossary that design, engineering and translation all use.
7.53. **The product uses the words its users use, not internal feature names.** A branded name, if one has to appear, is accompanied by what it does.
7.54. **Abbreviations are avoided.** One that the users genuinely say every day (SKU, MAC) is fine. Any other is spelled out on first use.
7.55. **One perspective per screen.** Possessives ("my", "your") are used sparingly and never mixed on one screen.

## 11. Numbers, dates, units
7.56. **Dates, times, numbers, currency and units are formatted from the person's locale, never written into the text.** Order, separators, 12- or 24-hour time and grouping all come from the formatter.
7.57. **Numbers are usually shown as numerals, including below 10,** because numerals scan faster. A number is spelled out where it isn't a count ("one of these") or where it starts a sentence.
7.58. **A date that people in different regions may read uses the month name and a four-digit year.** It never uses an all-numeric date that could be read two ways, and never ordinals ("2nd").
7.59. **A time that people in other time zones could see names its zone.**
7.60. **By default, relative time ("5 min ago") is used for recent events, up to about a day.** After that, the date and time are shown. Where people compare times or need them exactly (schedules, shifts, logs), exact times are used from the start. Relative time always has the exact timestamp available on focus or hover. Audit and history records always show exact times.
7.61. **"Last updated" or "Last synced" copy appears wherever data may be stale.** It names the time, and says "Not synced" plainly when that's the case.
7.62. **Durations use the locale's short units ("2 h 15 min").**
7.63. **Plurals use the language's plural forms, never "(s)" or a hard-coded "s".** A zero case gets its own wording where that reads naturally ("No devices online").
7.64. **Units follow the number, with a space ("3 cm", "42 °C").** Abbreviated thousands ("8K") appear only where space is too tight for the full number.
7.65. **A negative uses a minus sign, not a hyphen.** A plus sign shows only where the direction of change matters.
7.66. **Currency uses the locale's symbol.** Where several currencies appear together, the currency code is shown.
7.67. **Values that are missing show what kind of missing:** "Not set", "Unknown" or "Not applicable". A blank or a dash is never used to mean all three.

## 12. Writing for translation
7.68. **Every message is one complete, translatable sentence with named placeholders.** Sentences are never built by joining fragments, and the same fragment is never reused in different places.
7.69. **Where a value is inserted, label and value are preferred over a sentence ("Battery: 42%").**
7.70. **Each translated string comes with context and its length limit.** Translators see where the string appears and how much room it has.
7.71. **Copy is written expecting short text to double or triple in translation.** No text is placed inside images.
7.72. **Sentences are short and active, in subject-verb-object order.** They keep "that" and helper verbs, and never use directions like "above" or "on the right".

## 13. Reading level and frontline use
7.73. **Copy aims for a reading age of about 9 to 12.** Specialist products keep the technical terms their users really use (7.53, 7.103) and keep the sentences around those terms plain. Sentences usually stay under about 20 words.
7.74. **The key point comes first, in every sentence and every message.**
7.75. **The smaller the screen and the more someone is on the move, the fewer the words.** A wearable message is a few words. A handheld message is one line where it can be.
7.76. **Instructions for a physical step name the physical thing and the action, in order** ("Press and hold the feed button for 5 seconds"). They come before any explanation.
7.77. **A scan result says what was read and what happens next** ("Read SKU 00123. Added to bay 14."). A scan that doesn't fit says what was read and what was expected.
7.78. **Safety and duress copy is short, literal and in the imperative.** It says what is happening and the one thing to do ("Help is on the way. Stay where you are."). No softening, and no ambiguity.

## 14. AI copy
7.79. **Every piece of AI-generated content carries the AI mark wherever it appears: the `ai_stars` icon and a verb naming what the AI did ([9.20](09-ai.md)).** The mark opens a short explanation of how AI was involved. Once a person edits the content, the mark goes, and a way back to the AI version stays.
7.80. **An AI answer leads with the answer.** It doesn't open with filler or a disclaimer about itself.
7.81. **A limitation names what's missing and what it affects** ("Doesn't include devices offline for more than 7 days").
7.82. **Confidence is said in words, each word tied to what to do** ("Likely, check before deploying").
7.83. **The AI disclaimer appears once where AI is first offered, and again on any high-stakes output.** It's written as a plain sentence about checking the result, not as a tag.

## 15. Notifications and toasts
7.84. **A toast says what just happened in one line, two at most on a handheld.** It has no link. Its one action is a single verb, and "Undo" is used for reversible changes.
7.85. **A notification makes sense on its own, read later and out of context.** The title is a front-loaded headline that doesn't name the app. The body adds the detail. It holds no sensitive data in the preview. Its one or two actions describe their result.
7.86. **A notification read later never uses "today", "tomorrow" or "tonight".** It uses the weekday or the date.

## 16. Accessible copy
7.87. **Alt text gives the image's purpose in about 150 characters or fewer.** It never starts "Image of". An image that only decorates, or that repeats text right beside it, gets no alt text.
7.88. **A chart's text alternative states what the data shows.** It links to the data as a table for anything people analyse.
7.89. **Copy never relies on position, colour or shape alone** ("the green button", "the panel on the right").
7.90. **The visible label is the start of the accessible name.**

## 17. Terms a customer sets
7.91. **Where a product lets a customer rename its core objects, only the names of that customer's things can change** (site, store, location, team, associate, task). Actions, statuses, errors and system terms keep the product's words, so help, support and training still match.
7.92. **A renamed term is stored in every form the copy needs:** singular and plural, whether it takes "a" or "an", and the grammatical gender and cases each language needs. Strings take the right form; a word is never pasted into fixed text.
7.93. **Once set, a customer's term is used everywhere that object appears:** navigation, titles, messages, notifications, AI replies, exports and printed output.
7.94. **The default terms are plain and generic,** so they read correctly for customers who never rename anything.

## 18. Naming places and features
7.95. **Destinations, sections and features are named for what people do or find there, in words they already use.** Internal project names, team names and codenames never appear in the interface.
7.96. **The names in one menu are clearly different from each other.** No two overlap in meaning ("Devices" and "Device management"), and the key word comes first in each.
7.97. **A shipped name is used identically everywhere:** navigation, page title, help, notifications and support material (7.52).
7.98. **Product and brand names appear only where people need to know which product they're in,** such as when handing off between products. They're never used as labels for features.

## 19. Help and explanation
7.99. **Help next to a control answers one question:** what it does, or what to enter.
7.100. **A tooltip is one of two kinds.** A name tooltip shows an icon-only control's name, which is its accessible name (7.21). A description tooltip is one short sentence that adds something the label doesn't, and never repeats the label. Neither holds anything essential.
7.101. **A setting with a trade-off states the result for the person, not the mechanism** ("Prints sharper, but more slowly").
7.102. **Teaching copy at first use is one or two sentences about the thing in front of the person.**
7.103. **Technical terms an administrator needs (a protocol, a certificate type, a port) are kept as the standard names them, and explained once, nearby,** in plain words. They're never replaced with a vague word.

## 20. Asking for access
7.104. **A permission request says what will be used, how and why, in terms of the person's task,** in one active sentence ("The camera is used to scan barcodes and labels"). It never says "for a better experience". A screen shown before the system's own request uses "Continue", never "Allow".
7.105. **Consent copy names each use separately (recording, training, sharing), and says how to change it later.**
7.106. **A workplace product that records location, activity or voice says so plainly where it happens, and says who can see it.**

## 21. Waiting
7.107. **A wait longer than about ten seconds gets a rough estimate, given as "about" or a range,** and rounded up so finishing early is the pleasant surprise. A count of steps or items is preferred to a percentage.
7.108. **A long device operation says what not to do while it runs** ("Keep the printer on and connected").
7.109. **When an estimate turns out wrong, the copy changes rather than counting past zero** ("Taking longer than usual").

## 22. Text on the device itself
7.110. **Text on a device's own small display, and on output it prints about itself (configuration and status labels), uses the same terms as the software,** with the identifying word first, within that display's character limit.
7.111. **Where software explains a device's lights or codes, it uses the product's status words and shows the device's own code beside the plain explanation,** so a person looking at both can connect them.

## 23. Grammar across languages
7.112. **Values are inserted into sentences; nouns aren't.** A message that applies to different kinds of object is a separate string for each kind, because gender and case change the words around a noun.
7.113. **A string never assumes word order, the gender of the person, or that the text reads left to right.**
7.114. **A translation that won't fit makes the layout give way, or gets a shorter translation written for it.** A translation is never cut off.

## 24. Notifications sent to devices
7.115. **The first few words of a notification carry its point, because previews cut the rest.** The title gives the context (the task, the device, the place). The body says what happened in a complete sentence. Neither repeats the product's name.
7.116. **A notification shown on a lock screen or shared device leaves out sensitive or personal details.** It still says enough to act on ("Task assigned", "Printer needs attention").
7.117. **A notification about assigned work names the task, the place and when it's due, so it can be acted on from the notification.** Its actions name their result ("Accept", "Snooze 10 min"). There's no action that only opens the app.
7.118. **The same event isn't notified again because it was ignored.** Errors go to the product's own messages, not to notifications.

## 25. Inclusive language
7.119. **Copy about people never assumes gender.** It uses "you", a role ("the associate", "the admin") or "they". "He/she" constructions aren't used.
7.120. **Terms with exclusionary or violent history are replaced:** allowlist and blocklist; primary and replica (or primary and secondary); "stopped responding" rather than "hung". Where a standard fixes a term an administrator must recognise, the standard's term is kept, and explained once.
7.121. **Copy describes what people do, not how their bodies do it** (7.23). Disability is mentioned only when it's relevant, and then the person comes first.
7.122. **People's names are shown as they entered them.** No first-and-last order or length is assumed. On a shared device, only what identifies the current person is shown.
