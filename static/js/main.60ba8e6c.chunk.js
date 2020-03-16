(this["webpackJsonppathfinder-character-sheet"]=this["webpackJsonppathfinder-character-sheet"]||[]).push([[0],{15:function(e,t,a){e.exports=a(30)},20:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"setCharacterName",(function(){return _})),a.d(n,"setCharacterClass",(function(){return k})),a.d(n,"setCharacterRace",(function(){return N})),a.d(n,"setCharacterAlignment",(function(){return D})),a.d(n,"setCharacterLevel",(function(){return j})),a.d(n,"setCharacterDeity",(function(){return S})),a.d(n,"setCharacterSizeCategory",(function(){return L})),a.d(n,"setCharacterGender",(function(){return H})),a.d(n,"setCharacterAge",(function(){return U})),a.d(n,"setCharacterHomeland",(function(){return P})),a.d(n,"setCharacterHeight",(function(){return I})),a.d(n,"setCharacterWeight",(function(){return M})),a.d(n,"setCharacterHair",(function(){return w})),a.d(n,"setCharacterEyes",(function(){return G})),a.d(n,"setPlayerName",(function(){return B})),a.d(n,"setCampaign",(function(){return W}));var l={};a.r(l),a.d(l,"setSkillRanks",(function(){return ee})),a.d(l,"setSkillMiscMod",(function(){return te})),a.d(l,"setIsSkillClassSkill",(function(){return ae}));var i,r,c=a(0),s=a.n(c),o=a(8),u=a.n(o),d=(a(20),a(4)),m=a(7),y=a(14),A=a(1),E={level:0,characterName:""},b=a(6),h=a(5),C=function(e){return Math.floor(e/2)-5},T={charisma:{score:10,temporaryAdjustment:0},constitution:{score:10,temporaryAdjustment:0},dexterity:{score:10,temporaryAdjustment:0},intelligence:{score:10,temporaryAdjustment:0},strength:{score:10,temporaryAdjustment:0},wisdom:{score:10,temporaryAdjustment:0}},p={acrobatics:{baseAbility:"dexterity",isTrainedOnly:!1},appraise:{baseAbility:"intelligence",isTrainedOnly:!1},bluff:{baseAbility:"charisma",isTrainedOnly:!1},climb:{baseAbility:"strength",isTrainedOnly:!1},craft:{baseAbility:"intelligence",isTrainedOnly:!1},diplomacy:{baseAbility:"charisma",isTrainedOnly:!1},disableDevice:{baseAbility:"dexterity",isTrainedOnly:!0},disguise:{baseAbility:"charisma",isTrainedOnly:!1},escapeArtist:{baseAbility:"dexterity",isTrainedOnly:!1},fly:{baseAbility:"dexterity",isTrainedOnly:!1},handleAnimal:{baseAbility:"charisma",isTrainedOnly:!0},heal:{baseAbility:"wisdom",isTrainedOnly:!1},intimidate:{baseAbility:"charisma",isTrainedOnly:!1},knowledgeArcana:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeDungeoneering:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeEngineering:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeGeography:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeHistory:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeLocal:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeNature:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeNobility:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgePlanes:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeReligion:{baseAbility:"intelligence",isTrainedOnly:!0},linguistics:{baseAbility:"intelligence",isTrainedOnly:!0},perception:{baseAbility:"wisdom",isTrainedOnly:!1},perform:{baseAbility:"charisma",isTrainedOnly:!1},profession:{baseAbility:"wisdom",isTrainedOnly:!0},ride:{baseAbility:"dexterity",isTrainedOnly:!1},senseMotive:{baseAbility:"wisdom",isTrainedOnly:!1},sleightOfHand:{baseAbility:"dexterity",isTrainedOnly:!0},spellcraft:{baseAbility:"intelligence",isTrainedOnly:!0},stealth:{baseAbility:"dexterity",isTrainedOnly:!1},survival:{baseAbility:"wisdom",isTrainedOnly:!1},swim:{baseAbility:"strength",isTrainedOnly:!1},useMagicDevice:{baseAbility:"charisma",isTrainedOnly:!0}},v=function(e){e.totalBonus=e.abilityModifier+e.ranks+e.miscModifier+(e.isClassSkill&&e.ranks>=1?3:0)},f=function(e){var t={};return Object.keys(p).forEach((function(a){var n=p[a].baseAbility;t[a]={name:a,isClassSkill:!1,abilityModifier:e[n],miscModifier:0,ranks:1,totalBonus:e[n]},v(t[a])})),t},g=function(e,t){var a=Object(A.a)({},e);return Object.entries(e).forEach((function(e){var n=Object(h.a)(e,2),l=n[0],i=n[1],r=p[l].baseAbility;a[l]=Object(A.a)({},i,{abilityModifier:t[r]}),v(a[l])})),a},O=function(e,t,a){var n,l=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!e)return f(a);if(l)return g(e,a);switch(null===t||void 0===t?void 0:t.type){case"UPDATE_SKILL_MISC_MODIFIER":n=Object(A.a)({},e[null===t||void 0===t?void 0:t.payload.skillName],{miscModifier:null===t||void 0===t?void 0:t.payload.miscModifier});break;case"UPDATE_SKILL_RANKS":(null===t||void 0===t?void 0:t.payload.ranks)<0?console.warn("Ranks must be >= 0"):n=Object(A.a)({},e[null===t||void 0===t?void 0:t.payload.skillName],{ranks:null===t||void 0===t?void 0:t.payload.ranks});break;case"UPDATE_SKILL_IS_CLASS_SKILL":n=Object(A.a)({},e[null===t||void 0===t?void 0:t.payload.skillName],{isClassSkill:null===t||void 0===t?void 0:t.payload.isClassSkill})}return n&&t?(v(n),Object(A.a)({},e,Object(b.a)({},null===t||void 0===t?void 0:t.payload.skillName,n))):e},R=Object(m.createStore)((function(e,t){var a,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_CHARACTER_NAME":return Object(A.a)({},e,{characterName:t.payload});case"UPDATE_CAMPAIGN":return Object(A.a)({},e,{campaign:t.payload});case"UPDATE_CHARACTER_AGE":return Object(A.a)({},e,{age:t.payload});case"UPDATE_CHARACTER_ALIGNMENT":return Object(A.a)({},e,{alignment:t.payload});case"UPDATE_CHARACTER_CLASS":return Object(A.a)({},e,{className:t.payload});case"UPDATE_CHARACTER_DEITY":return Object(A.a)({},e,{deity:t.payload});case"UPDATE_CHARACTER_EYES":return Object(A.a)({},e,{eyes:t.payload});case"UPDATE_CHARACTER_GENDER":return Object(A.a)({},e,{gender:t.payload});case"UPDATE_CHARACTER_HAIR":return Object(A.a)({},e,{hair:t.payload});case"UPDATE_CHARACTER_HEIGHT":return Object(A.a)({},e,{height:t.payload});case"UPDATE_CHARACTER_HOMELAND":return Object(A.a)({},e,{homeland:t.payload});case"UPDATE_CHARACTER_LEVEL":return Object(A.a)({},e,{level:t.payload});case"UPDATE_CHARACTER_RACE":return Object(A.a)({},e,{race:t.payload});case"UPDATE_CHARACTER_SIZE_CATEGORY":return Object(A.a)({},e,{sizeCategory:t.payload});case"UPDATE_CHARACTER_WEIGHT":return Object(A.a)({},e,{weight:t.payload});case"UPDATE_PLAYER_NAME":return Object(A.a)({},e,{playerName:t.payload});default:return e}}(null===e||void 0===e?void 0:e.characterMetaData,t),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ABILITY_SCORE":return Object(A.a)({},e,Object(b.a)({},t.ability,Object(A.a)({},e[t.ability],{score:t.score||0,modifier:C(t.score)})));case"SET_ABILITY_TEMP_ADJUSTMENT":return Object(A.a)({},e,Object(b.a)({},t.ability,Object(A.a)({},e[t.ability],{temporaryAdjustment:t.adjustment||0})));default:return e}}(null===e||void 0===e?void 0:e.abilities,t),i=(a=l,Object.entries(a).reduce((function(e,t){var a=Object(h.a)(t,2),n=a[0],l=a[1];return e[n]=C(l.score+l.temporaryAdjustment),e}),{}));return{characterMetaData:n,abilities:l,skills:O(null===e||void 0===e?void 0:e.skills,t,i,l!==(null===e||void 0===e?void 0:e.abilities))}}),Object(y.devToolsEnhancer)({})),_=function(e){return{type:"UPDATE_CHARACTER_NAME",payload:e}},k=function(e){return{type:"UPDATE_CHARACTER_CLASS",payload:e}},N=function(e){return{type:"UPDATE_CHARACTER_RACE",payload:e}},D=function(e){return{type:"UPDATE_CHARACTER_ALIGNMENT",payload:e}},j=function(e){return{type:"UPDATE_CHARACTER_LEVEL",payload:e}},S=function(e){return{type:"UPDATE_CHARACTER_DEITY",payload:e}},L=function(e){return{type:"UPDATE_CHARACTER_SIZE_CATEGORY",payload:e}},H=function(e){return{type:"UPDATE_CHARACTER_GENDER",payload:e}},U=function(e){return{type:"UPDATE_CHARACTER_AGE",payload:e}},P=function(e){return{type:"UPDATE_CHARACTER_HOMELAND",payload:e}},I=function(e){return{type:"UPDATE_CHARACTER_HEIGHT",payload:e}},M=function(e){return{type:"UPDATE_CHARACTER_WEIGHT",payload:e}},w=function(e){return{type:"UPDATE_CHARACTER_HAIR",payload:e}},G=function(e){return{type:"UPDATE_CHARACTER_EYES",payload:e}},B=function(e){return{type:"UPDATE_PLAYER_NAME",payload:e}},W=function(e){return{type:"UPDATE_CAMPAIGN",payload:e}},Y=a(2),x=a.n(Y);a(26);!function(e){e[e.GOOD=0]="GOOD",e[e.NEUTRAL=1]="NEUTRAL",e[e.BAD=2]="BAD"}(i||(i={})),function(e){e[e.LAW=0]="LAW",e[e.NEUTRAL=1]="NEUTRAL",e[e.CHAOS=2]="CHAOS"}(r||(r={}));i.NEUTRAL,r.NEUTRAL;var K={LG:{ethics:r.LAW,morality:i.GOOD},LN:{ethics:r.LAW,morality:i.NEUTRAL},LB:{ethics:r.LAW,morality:i.BAD},NG:{ethics:r.NEUTRAL,morality:i.GOOD},N:{ethics:r.NEUTRAL,morality:i.NEUTRAL},NB:{ethics:r.NEUTRAL,morality:i.BAD},CG:{ethics:r.CHAOS,morality:i.GOOD},CN:{ethics:r.CHAOS,morality:i.NEUTRAL},CB:{ethics:r.CHAOS,morality:i.BAD}},q=(x.a.any,x.a.func.isRequired,x.a.string.isRequired,x.a.string,function(e){var t,a,n=e.value,l=e.onChange,i=e.id,r=e.label,c=null!==(t=null===(a=Object.entries(K).find((function(e){var t=Object(h.a)(e,2)[1];return(null===t||void 0===t?void 0:t.ethics)===(null===n||void 0===n?void 0:n.ethics)&&(null===t||void 0===t?void 0:t.morality)===(null===n||void 0===n?void 0:n.morality)})))||void 0===a?void 0:a[0])&&void 0!==t?t:"none";return s.a.createElement("div",{className:"metadata-input-block ".concat(i)},s.a.createElement("select",{onChange:function(e){var t=K[e.target.value];l(t)},value:c},s.a.createElement("option",{label:"",value:"none"}),Object.keys(K).map((function(e,t){return s.a.createElement("option",{label:e,value:e,key:t})}))),s.a.createElement("label",{htmlFor:i},r))}),F=n,J=Object(d.b)((function(e){return e.characterMetaData}),F),z=(x.a.string,x.a.func.isRequired,x.a.string.isRequired,x.a.string,function(e){var t=e.value,a=e.onChange,n=e.id,l=e.label;return s.a.createElement("div",{className:"metadata-input-block ".concat(n)},s.a.createElement("input",{value:null!==t&&void 0!==t?t:"",onChange:a,id:n}),s.a.createElement("label",{htmlFor:n},l))}),V=(x.a.number,x.a.func.isRequired,x.a.string.isRequired,x.a.string,function(e){var t=e.value,a=e.onChange,n=e.id,l=e.label;return s.a.createElement("div",{className:"metadata-input-block ".concat(n)},s.a.createElement("input",{value:null!==t&&void 0!==t?t:void 0,onChange:a,id:n,type:"number"}),s.a.createElement("label",{htmlFor:n},l))}),Z=J((function(e){var t=e.characterName,a=e.setCharacterName,n=e.playerName,l=e.setPlayerName,i=e.deity,r=e.setCharacterDeity,o=e.homeland,u=e.setCharacterHomeland,d=e.race,m=e.setCharacterRace,y=e.hair,A=e.setCharacterHair,E=e.eyes,b=e.setCharacterEyes,h=e.level,C=e.setCharacterLevel,T=e.className,p=e.setCharacterClass,v=e.campaign,f=e.setCampaign,g=e.age,O=e.setCharacterAge,R=e.height,_=e.setCharacterHeight,k=e.weight,N=e.setCharacterWeight,D=e.alignment,j=e.setCharacterAlignment,S=Object(c.useCallback)((function(e){return Object(c.useCallback)((function(t){return e(t.target.value)}),[e])}),[]),L=Object(c.useCallback)((function(e){return Object(c.useCallback)((function(t){var a=parseInt(t.target.value);e(Number.isNaN(a)?void 0:a)}),[e])}),[]);return s.a.createElement("div",{className:"character-meta-data"},s.a.createElement(z,{id:"character-name",value:t,label:"Charakter Name",onChange:S(a)}),s.a.createElement(q,{id:"alignment",value:D,label:"Alignment",onChange:j}),s.a.createElement(z,{id:"player-name",value:n,label:"Player",onChange:S(l)}),s.a.createElement(z,{id:"class-name",value:T,label:"Character Class",onChange:S(p)}),s.a.createElement(V,{id:"level",value:h,label:"Level",onChange:L(C)}),s.a.createElement(z,{id:"deity",value:i,label:"Deity",onChange:S(r)}),s.a.createElement(z,{id:"campaign",value:v,label:"Campaign",onChange:S(f)}),s.a.createElement(z,{id:"homeland",value:o,label:"Homeland",onChange:S(u)}),s.a.createElement(z,{id:"race",value:d,label:"Race",onChange:S(m)}),s.a.createElement(z,{id:"hair",value:y,label:"Hair",onChange:S(A)}),s.a.createElement(z,{id:"eyes",value:E,label:"Eyes",onChange:S(b)}),s.a.createElement(V,{id:"age",value:g,label:"Age",onChange:L(O)}),s.a.createElement(V,{id:"height",value:R,label:"Height",onChange:L(_)}),s.a.createElement(V,{id:"weight",value:k,label:"Weight",onChange:L(N)}))})),$=(a(27),x.a.string,x.a.object,function(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{className:"",style:{}};return s.a.createElement("div",{className:"inverted-rounded-corners ".concat(null!==(e=a.className)&&void 0!==e?e:""),style:Object(A.a)({},null!==(t=a.style)&&void 0!==t?t:{})},a.children)}),Q={setAbilityScore:function(e,t){return{type:"SET_ABILITY_SCORE",ability:e,score:t}},setAbilityTempAdjustment:function(e,t){return{type:"SET_ABILITY_TEMP_ADJUSTMENT",ability:e,adjustment:t}}},X=Object(d.b)((function(e){return{abilities:e.abilities}}),Q)((function(e){var t=e.abilities,a=e.setAbilityScore,n=e.setAbilityTempAdjustment,l=function(e){return function(t){a(e,parseInt(t.target.value))}},i=function(e){return function(t){n(e,parseInt(t.target.value))}},r=Object.keys(t).map((function(e){var a=t[e];return s.a.createElement("tr",{key:e},s.a.createElement("td",null,s.a.createElement($,{style:{fontSize:"1em"}},e)),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:a.score,onChange:l(e)})),s.a.createElement("td",null,C(a.score)),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:a.temporaryAdjustment||"",onChange:i(e)})),s.a.createElement("td",null,a.temporaryAdjustment?C(a.score+a.temporaryAdjustment):""))}));return s.a.createElement("table",null,s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("td",null,"Ability Name"),s.a.createElement("td",null,"Score"),s.a.createElement("td",null,"Mod"),s.a.createElement("td",null,"Temp adjustment"),s.a.createElement("td",null,"Temp mod"))),s.a.createElement("tbody",null,r))})),ee=function(e,t){return{type:"UPDATE_SKILL_RANKS",payload:{skillName:e,ranks:t}}},te=function(e,t){return{type:"UPDATE_SKILL_MISC_MODIFIER",payload:{skillName:e,miscModifier:t}}},ae=function(e,t){return{type:"UPDATE_SKILL_IS_CLASS_SKILL",payload:{skillName:e,isClassSkill:t}}},ne=(a(28),a(29),x.a.bool,x.a.string,x.a.func,function(e){var t;return s.a.createElement("input",{className:"styled-checkbox ".concat(e.className),type:"checkbox",checked:null!==(t=e.checked)&&void 0!==t&&t,onChange:e.onChange})});ne.defaultProps={checked:!1,className:"",onChange:function(){}};var le=l,ie=Object(d.b)((function(e){return{skills:e.skills}}),le)((function(e){var t=e.skills,a=e.setIsSkillClassSkill,n=e.setSkillMiscMod,l=e.setSkillRanks,i=function(e){return function(t){l(e,parseInt(t.target.value))}},r=function(e){return function(t){n(e,parseInt(t.target.value))}};return s.a.createElement("div",{className:"skills"},s.a.createElement("table",null,s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Skill Names"),s.a.createElement("th",null,"Total Bonus"),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Ability Mod."),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Ranks"),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Misc. Mod."))),s.a.createElement("tbody",null,Object.entries(t).map((function(e,t){var n=Object(h.a)(e,2),l=n[0],c=n[1],o=p[l],u=o.baseAbility,d=o.isTrainedOnly;return s.a.createElement("tr",{key:t},s.a.createElement("td",null,s.a.createElement(ne,{checked:c.isClassSkill,onChange:function(){return a(l,!c.isClassSkill)}})),s.a.createElement("td",null,l,d?"*":""),s.a.createElement("td",null,c.totalBonus),s.a.createElement("td",null,"=",u),s.a.createElement("td",null,c.abilityModifier),s.a.createElement("td",null,"+"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:c.ranks,onChange:i(l)})),s.a.createElement("td",null,"+"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:c.miscModifier,onChange:r(l)})))})),s.a.createElement("tr",{className:"legend"},s.a.createElement("td",null,s.a.createElement(ne,{checked:!0})),s.a.createElement("td",null,"Class Skill \xa0 \xa0 * Trained Only")))))})),re=function(){return s.a.createElement("div",null,s.a.createElement("img",{className:"pathfinder-logo",alt:"Pathfinder logo",src:"./pathfinderDE-logo.png"}),s.a.createElement(Z,null),s.a.createElement(X,null),s.a.createElement(ie,null))},ce=function(){return s.a.createElement(d.a,{store:R},s.a.createElement(re,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(s.a.createElement(ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[15,1,2]]]);
//# sourceMappingURL=main.60ba8e6c.chunk.js.map