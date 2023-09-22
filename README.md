### High drama in the professional chess world...

Hans Niemann is a prodigal and rising American chess grandmaster who, for most of his high-level career, has been mired in chess' greatest controversy of the past century. In August 2022, at the Sinquefield Cup in St. Louis, one of pro chess' most prestigious tournaments, Hans Niemann, then an obscure and lowly ranked junior, defeated World Champion Magnus Carlsen in the most herculean of upsets of this millenium. 

Carlsen, widely considered the greatest chess player of all time, a player who claims the title of having the highest ELO rating in human history, and a player who has lost fewer than 10 classical matches in the past 15 years, responded by withdrawing from the tournament the very next day - an unprecedented move that both Carlsen, known as an even-tempered and gregarious figure, had never done before in his career, and which annulled Niemann's victory over Carlsen.

Carlsen shortly thenafter, by one means or another, over the ensuing months, accused Niemann of cheating in their match, though provided no evidence. Various memes were born out of this interbellum, one, as suggested by GM Eric Hansen, had been that Niemann was using certain adult toys to receive morse-code signals of the best move on the board. As a consequent result, Niemann became estranged from the chess world and even had his Chess.com account banned, leading to his levying of a $100,000,000 lawsuit against Carlsen, Chess.com, and popular chess streamer Hikaru Nakamura, alleging inexorable harm from defamation.

A year on, and his lawsuit with Carlsen and co. quietly settled out of court, and Niemann has made an emphatic comeback to the professional chess scene, having had his Chess.com account reinstated at the conclusion of his suit.  Yet, for some, his comeback has been *too* emphatic - suspciously so.

Niemann has particularly attracted the ire of former World Chess Champion Vladimir Kramnik, having been defeated by Niemann in multiple online matches to Niemann's great unapologetic and brash delight, shown on his Twitch streams.

As a result, the declining and senior Kramnik, in Sept 2023, levied explosive allegations Niemann, pointing specifically to Niemann's superhuman Chess.com game accuracy ratings to substantiate his accusations. Just as soon as Niemann had been rehabilitating his image and turning a new leaf has he found himself mired, yet again, in chess drama.

This site, which both uses Chess.com's API to get player rating information and also scrapes accuracy ratings from Chess.com, aims to see if Kramnik's arguments hold water. The data from the APIs is cobbled into a JSON object, injected into a MongoDB Atlas cluster, and fetched via an API endpoint in the backend to be displayed by the front.