(this["webpackJsonppathfinder-character-sheet"]=this["webpackJsonppathfinder-character-sheet"]||[]).push([[0],{15:function(e,a,t){e.exports=t(30)},20:function(e,a,t){},26:function(e,a,t){},27:function(e,a,t){},28:function(e,a,t){},29:function(e,a,t){},30:function(e,a,t){"use strict";t.r(a);var n={};t.r(n),t.d(n,"setCharacterName",(function(){return k})),t.d(n,"setCharacterClass",(function(){return N})),t.d(n,"setCharacterRace",(function(){return L})),t.d(n,"setCharacterAlignment",(function(){return D})),t.d(n,"setCharacterLevel",(function(){return S})),t.d(n,"setCharacterDeity",(function(){return j})),t.d(n,"setCharacterSizeCategory",(function(){return M})),t.d(n,"setCharacterGender",(function(){return H})),t.d(n,"setCharacterAge",(function(){return U})),t.d(n,"setCharacterHomeland",(function(){return I})),t.d(n,"setCharacterHeight",(function(){return P})),t.d(n,"setCharacterWeight",(function(){return w})),t.d(n,"setCharacterHair",(function(){return G})),t.d(n,"setCharacterEyes",(function(){return B})),t.d(n,"setPlayerName",(function(){return x})),t.d(n,"setCampaign",(function(){return W}));var l={};t.r(l),t.d(l,"setSkillRanks",(function(){return ce})),t.d(l,"setSkillMiscMod",(function(){return se})),t.d(l,"setIsSkillClassSkill",(function(){return oe}));var i,r,c=t(0),s=t.n(c),o=t(8),u=t.n(o),d=(t(20),t(4)),m=t(7),E=t(14),y=t(1);!function(e){e[e.SMALL=-1]="SMALL",e[e.MEDIUM=0]="MEDIUM",e[e.LARGE=1]="LARGE"}(i||(i={})),function(e){e[e.MALE=0]="MALE",e[e.FEMALE=1]="FEMALE",e[e.OTHER=2]="OTHER"}(r||(r={}));var A,b={level:0,characterName:"",sizeCategory:i.MEDIUM},h=t(5),p=t(6),C=function(e){return Math.floor(e/2)-5},v={charisma:{score:10,temporaryAdjustment:0},constitution:{score:10,temporaryAdjustment:0},dexterity:{score:10,temporaryAdjustment:0},intelligence:{score:10,temporaryAdjustment:0},strength:{score:10,temporaryAdjustment:0},wisdom:{score:10,temporaryAdjustment:0}},T={acrobatics:{baseAbility:"dexterity",isTrainedOnly:!1},appraise:{baseAbility:"intelligence",isTrainedOnly:!1},bluff:{baseAbility:"charisma",isTrainedOnly:!1},climb:{baseAbility:"strength",isTrainedOnly:!1},craft:{baseAbility:"intelligence",isTrainedOnly:!1},diplomacy:{baseAbility:"charisma",isTrainedOnly:!1},disableDevice:{baseAbility:"dexterity",isTrainedOnly:!0},disguise:{baseAbility:"charisma",isTrainedOnly:!1},escapeArtist:{baseAbility:"dexterity",isTrainedOnly:!1},fly:{baseAbility:"dexterity",isTrainedOnly:!1},handleAnimal:{baseAbility:"charisma",isTrainedOnly:!0},heal:{baseAbility:"wisdom",isTrainedOnly:!1},intimidate:{baseAbility:"charisma",isTrainedOnly:!1},knowledgeArcana:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeDungeoneering:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeEngineering:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeGeography:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeHistory:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeLocal:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeNature:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeNobility:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgePlanes:{baseAbility:"intelligence",isTrainedOnly:!0},knowledgeReligion:{baseAbility:"intelligence",isTrainedOnly:!0},linguistics:{baseAbility:"intelligence",isTrainedOnly:!0},perception:{baseAbility:"wisdom",isTrainedOnly:!1},perform:{baseAbility:"charisma",isTrainedOnly:!1},profession:{baseAbility:"wisdom",isTrainedOnly:!0},ride:{baseAbility:"dexterity",isTrainedOnly:!1},senseMotive:{baseAbility:"wisdom",isTrainedOnly:!1},sleightOfHand:{baseAbility:"dexterity",isTrainedOnly:!0},spellcraft:{baseAbility:"intelligence",isTrainedOnly:!0},stealth:{baseAbility:"dexterity",isTrainedOnly:!1},survival:{baseAbility:"wisdom",isTrainedOnly:!1},swim:{baseAbility:"strength",isTrainedOnly:!1},useMagicDevice:{baseAbility:"charisma",isTrainedOnly:!0}},g=function(e){e.totalBonus=e.abilityModifier+e.ranks+e.miscModifier+(e.isClassSkill&&e.ranks>=1?3:0)},f=function(e){var a={};return Object.keys(T).forEach((function(t){var n=T[t].baseAbility;a[t]={name:t,isClassSkill:!1,abilityModifier:e[n],miscModifier:0,ranks:0,totalBonus:e[n]},g(a[t])})),a},O=function(e,a){var t=Object(y.a)({},e);return Object.entries(e).forEach((function(e){var n=Object(p.a)(e,2),l=n[0],i=n[1],r=T[l].baseAbility;t[l]=Object(y.a)({},i,{abilityModifier:a[r]}),g(t[l])})),t},R=function(e,a,t){var n,l=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!e)return f(t);if(l)return O(e,t);switch(null===a||void 0===a?void 0:a.type){case"UPDATE_SKILL_MISC_MODIFIER":n=Object(y.a)({},e[null===a||void 0===a?void 0:a.payload.skillName],{miscModifier:null===a||void 0===a?void 0:a.payload.miscModifier});break;case"UPDATE_SKILL_RANKS":(null===a||void 0===a?void 0:a.payload.ranks)<0?console.warn("Ranks must be >= 0"):n=Object(y.a)({},e[null===a||void 0===a?void 0:a.payload.skillName],{ranks:null===a||void 0===a?void 0:a.payload.ranks});break;case"UPDATE_SKILL_IS_CLASS_SKILL":n=Object(y.a)({},e[null===a||void 0===a?void 0:a.payload.skillName],{isClassSkill:null===a||void 0===a?void 0:a.payload.isClassSkill})}return n&&a?(g(n),Object(y.a)({},e,Object(h.a)({},null===a||void 0===a?void 0:a.payload.skillName,n))):e},_=Object(m.createStore)((function(e,a){var t,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,a=arguments.length>1?arguments[1]:void 0;switch(null===a||void 0===a?void 0:a.type){case"UPDATE_CHARACTER_NAME":return Object(y.a)({},e,{characterName:a.payload});case"UPDATE_CAMPAIGN":return Object(y.a)({},e,{campaign:a.payload});case"UPDATE_CHARACTER_AGE":return Object(y.a)({},e,{age:a.payload});case"UPDATE_CHARACTER_ALIGNMENT":return Object(y.a)({},e,{alignment:a.payload});case"UPDATE_CHARACTER_CLASS":return Object(y.a)({},e,{className:a.payload});case"UPDATE_CHARACTER_DEITY":return Object(y.a)({},e,{deity:a.payload});case"UPDATE_CHARACTER_EYES":return Object(y.a)({},e,{eyes:a.payload});case"UPDATE_CHARACTER_GENDER":return Object(y.a)({},e,{gender:a.payload});case"UPDATE_CHARACTER_HAIR":return Object(y.a)({},e,{hair:a.payload});case"UPDATE_CHARACTER_HEIGHT":return Object(y.a)({},e,{height:a.payload});case"UPDATE_CHARACTER_HOMELAND":return Object(y.a)({},e,{homeland:a.payload});case"UPDATE_CHARACTER_LEVEL":return Object(y.a)({},e,{level:a.payload});case"UPDATE_CHARACTER_RACE":return Object(y.a)({},e,{race:a.payload});case"UPDATE_CHARACTER_SIZE_CATEGORY":return Object(y.a)({},e,{sizeCategory:a.payload});case"UPDATE_CHARACTER_WEIGHT":return Object(y.a)({},e,{weight:a.payload});case"UPDATE_PLAYER_NAME":return Object(y.a)({},e,{playerName:a.payload});default:return e}}(null===e||void 0===e?void 0:e.characterMetaData,a),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,a=arguments.length>1?arguments[1]:void 0;switch(null===a||void 0===a?void 0:a.type){case"SET_ABILITY_SCORE":return Object(y.a)({},e,Object(h.a)({},a.ability,Object(y.a)({},e[a.ability],{score:a.score||0,modifier:C(a.score)})));case"SET_ABILITY_TEMP_ADJUSTMENT":return Object(y.a)({},e,Object(h.a)({},a.ability,Object(y.a)({},e[a.ability],{temporaryAdjustment:a.adjustment||0})));default:return e}}(null===e||void 0===e?void 0:e.abilities,a),i=(t=l,Object.entries(t).reduce((function(e,a){var t=Object(p.a)(a,2),n=t[0],l=t[1];return e[n]=C(l.score+l.temporaryAdjustment),e}),{}));return{characterMetaData:n,abilities:l,skills:R(null===e||void 0===e?void 0:e.skills,a,i,l!==(null===e||void 0===e?void 0:e.abilities))}}),Object(E.devToolsEnhancer)({})),k=function(e){return{type:"UPDATE_CHARACTER_NAME",payload:e}},N=function(e){return{type:"UPDATE_CHARACTER_CLASS",payload:e}},L=function(e){return{type:"UPDATE_CHARACTER_RACE",payload:e}},D=function(e){return{type:"UPDATE_CHARACTER_ALIGNMENT",payload:e}},S=function(e){return{type:"UPDATE_CHARACTER_LEVEL",payload:e}},j=function(e){return{type:"UPDATE_CHARACTER_DEITY",payload:e}},M=function(e){return{type:"UPDATE_CHARACTER_SIZE_CATEGORY",payload:e}},H=function(e){return{type:"UPDATE_CHARACTER_GENDER",payload:e}},U=function(e){return{type:"UPDATE_CHARACTER_AGE",payload:e}},I=function(e){return{type:"UPDATE_CHARACTER_HOMELAND",payload:e}},P=function(e){return{type:"UPDATE_CHARACTER_HEIGHT",payload:e}},w=function(e){return{type:"UPDATE_CHARACTER_WEIGHT",payload:e}},G=function(e){return{type:"UPDATE_CHARACTER_HAIR",payload:e}},B=function(e){return{type:"UPDATE_CHARACTER_EYES",payload:e}},x=function(e){return{type:"UPDATE_PLAYER_NAME",payload:e}},W=function(e){return{type:"UPDATE_CAMPAIGN",payload:e}},Y=t(2),z=t.n(Y);t(26);!function(e){e.wrapper="metadata-select-wrapper",e.select="metadata-select"}(A||(A={}));var K,F,q=function(e){var a=e.value,t=e.onChange,n=e.id,l=e.label,i=e.options,r=e.testIds,c=void 0===r?A:r;return s.a.createElement("div",{className:"metadata-input-block ".concat(n),"data-testid":c.wrapper},s.a.createElement("select",{onChange:function(e){var a=e.currentTarget.selectedIndex,n=i[a];t(n.value)},id:n,value:a,"data-testid":c.select},i.map((function(e,a){var t=e.label,n=e.value;return s.a.createElement("option",{label:t,value:void 0===n?"":n,key:a})}))),s.a.createElement("label",{htmlFor:n},l))};!function(e){e[e.GOOD=0]="GOOD",e[e.NEUTRAL=1]="NEUTRAL",e[e.BAD=2]="BAD"}(K||(K={})),function(e){e[e.LAW=0]="LAW",e[e.NEUTRAL=1]="NEUTRAL",e[e.CHAOS=2]="CHAOS"}(F||(F={}));K.NEUTRAL,F.NEUTRAL;var J,V=[{label:void 0,value:void 0},{label:"Male",value:r.MALE},{label:"Female",value:r.FEMALE},{label:"Other",value:r.OTHER}];!function(e){e.wrapper="gender-input-wrapper",e.select="gender-input-select"}(J||(J={}));var Z,$=[{label:"Small",value:i.SMALL},{label:"Medium",value:i.MEDIUM},{label:"large",value:i.LARGE}];!function(e){e.wrapper="size-category-input-wrapper",e.select="size-category-input-select"}(Z||(Z={}));var Q,X=[{label:void 0,value:void 0},{label:"LG",value:{ethics:F.LAW,morality:K.GOOD}},{label:"LN",value:{ethics:F.LAW,morality:K.NEUTRAL}},{label:"LB",value:{ethics:F.LAW,morality:K.BAD}},{label:"NG",value:{ethics:F.NEUTRAL,morality:K.GOOD}},{label:"N",value:{ethics:F.NEUTRAL,morality:K.NEUTRAL}},{label:"NB",value:{ethics:F.NEUTRAL,morality:K.BAD}},{label:"CG",value:{ethics:F.CHAOS,morality:K.GOOD}},{label:"CN",value:{ethics:F.CHAOS,morality:K.NEUTRAL}},{label:"CB",value:{ethics:F.CHAOS,morality:K.BAD}}];!function(e){e.wrapper="alignment-input-wrapper",e.select="alignment-input-select"}(Q||(Q={}));z.a.string,z.a.func.isRequired,z.a.string.isRequired,z.a.string;var ee=function(e){var a=e.value,t=e.onChange,n=e.id,l=e.label;return s.a.createElement("div",{className:"metadata-input-block ".concat(n)},s.a.createElement("input",{value:null!==a&&void 0!==a?a:"",onChange:t,id:n}),s.a.createElement("label",{htmlFor:n},l))},ae=(z.a.number,z.a.func.isRequired,z.a.string.isRequired,z.a.string,function(e){var a=e.value,t=e.onChange,n=e.id,l=e.label;return s.a.createElement("div",{className:"metadata-input-block ".concat(n)},s.a.createElement("input",{value:null!==a&&void 0!==a?a:void 0,onChange:t,id:n,type:"number"}),s.a.createElement("label",{htmlFor:n},l))}),te=n,ne=Object(d.b)((function(e){return e.characterMetaData}),te)((function(e){var a=e.characterName,t=e.setCharacterName,n=e.playerName,l=e.setPlayerName,i=e.deity,r=e.setCharacterDeity,o=e.homeland,u=e.setCharacterHomeland,d=e.race,m=e.setCharacterRace,E=e.hair,y=e.setCharacterHair,A=e.eyes,b=e.setCharacterEyes,h=e.level,p=e.setCharacterLevel,C=e.className,v=e.setCharacterClass,T=e.campaign,g=e.setCampaign,f=e.age,O=e.setCharacterAge,R=e.height,_=e.setCharacterHeight,k=e.weight,N=e.setCharacterWeight,L=e.alignment,D=e.setCharacterAlignment,S=e.sizeCategory,j=e.setCharacterSizeCategory,M=e.gender,H=e.setCharacterGender,U=Object(c.useCallback)((function(e){return Object(c.useCallback)((function(a){return e(a.target.value)}),[e])}),[]),I=Object(c.useCallback)((function(e){return Object(c.useCallback)((function(a){var t=parseInt(a.target.value);e(Number.isNaN(t)?void 0:t)}),[e])}),[]);return s.a.createElement("div",{className:"character-meta-data"},s.a.createElement(ee,{id:"character-name",value:a,label:"Charakter Name",onChange:U(t)}),s.a.createElement(q,{onChange:D,options:X,id:"alignment",label:"Alignment",value:L,testIds:Q}),s.a.createElement(ee,{id:"player-name",value:n,label:"Player",onChange:U(l)}),s.a.createElement(ee,{id:"class-name",value:C,label:"Character Class",onChange:U(v)}),s.a.createElement(ae,{id:"level",value:h,label:"Level",onChange:I(p)}),s.a.createElement(ee,{id:"deity",value:i,label:"Deity",onChange:U(r)}),s.a.createElement(q,{testIds:Z,onChange:j,options:$,id:"size-category",value:S,label:"Size Category"}),s.a.createElement(q,{testIds:J,onChange:H,options:V,id:"gender",value:M,label:"Gender"}),s.a.createElement(ee,{id:"campaign",value:T,label:"Campaign",onChange:U(g)}),s.a.createElement(ee,{id:"homeland",value:o,label:"Homeland",onChange:U(u)}),s.a.createElement(ee,{id:"race",value:d,label:"Race",onChange:U(m)}),s.a.createElement(ee,{id:"hair",value:E,label:"Hair",onChange:U(y)}),s.a.createElement(ee,{id:"eyes",value:A,label:"Eyes",onChange:U(b)}),s.a.createElement(ae,{id:"age",value:f,label:"Age",onChange:I(O)}),s.a.createElement(ae,{id:"height",value:R,label:"Height",onChange:I(_)}),s.a.createElement(ae,{id:"weight",value:k,label:"Weight",onChange:I(N)}))})),le=(t(27),z.a.string,z.a.object,function(){var e,a,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{className:"",style:{}};return s.a.createElement("div",{className:"inverted-rounded-corners ".concat(null!==(e=t.className)&&void 0!==e?e:""),style:Object(y.a)({},null!==(a=t.style)&&void 0!==a?a:{})},t.children)}),ie={setAbilityScore:function(e,a){return{type:"SET_ABILITY_SCORE",ability:e,score:a}},setAbilityTempAdjustment:function(e,a){return{type:"SET_ABILITY_TEMP_ADJUSTMENT",ability:e,adjustment:a}}},re=Object(d.b)((function(e){return{abilities:e.abilities}}),ie)((function(e){var a=e.abilities,t=e.setAbilityScore,n=e.setAbilityTempAdjustment,l=function(e){return function(a){t(e,parseInt(a.target.value))}},i=function(e){return function(a){n(e,parseInt(a.target.value))}},r=Object.keys(a).map((function(e){var t=a[e];return s.a.createElement("tr",{key:e},s.a.createElement("td",null,s.a.createElement(le,{style:{fontSize:"1em"}},e)),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:t.score,onChange:l(e)})),s.a.createElement("td",null,C(t.score)),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:t.temporaryAdjustment||"",onChange:i(e)})),s.a.createElement("td",null,t.temporaryAdjustment?C(t.score+t.temporaryAdjustment):""))}));return s.a.createElement("table",null,s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("td",null,"Ability Name"),s.a.createElement("td",null,"Score"),s.a.createElement("td",null,"Mod"),s.a.createElement("td",null,"Temp adjustment"),s.a.createElement("td",null,"Temp mod"))),s.a.createElement("tbody",null,r))})),ce=function(e,a){return{type:"UPDATE_SKILL_RANKS",payload:{skillName:e,ranks:a}}},se=function(e,a){return{type:"UPDATE_SKILL_MISC_MODIFIER",payload:{skillName:e,miscModifier:a}}},oe=function(e,a){return{type:"UPDATE_SKILL_IS_CLASS_SKILL",payload:{skillName:e,isClassSkill:a}}},ue=(t(28),t(29),z.a.bool,z.a.string,z.a.func,function(e){var a;return s.a.createElement("input",{className:"styled-checkbox ".concat(e.className),type:"checkbox",checked:null!==(a=e.checked)&&void 0!==a&&a,onChange:e.onChange})});ue.defaultProps={checked:!1,className:"",onChange:function(){}};var de=l,me=Object(d.b)((function(e){return{skills:e.skills}}),de)((function(e){var a=e.skills,t=e.setIsSkillClassSkill,n=e.setSkillMiscMod,l=e.setSkillRanks,i=function(e){return function(a){l(e,parseInt(a.target.value))}},r=function(e){return function(a){n(e,parseInt(a.target.value))}};return s.a.createElement("div",{className:"skills"},s.a.createElement("table",null,s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Skill Names"),s.a.createElement("th",null,"Total Bonus"),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Ability Mod."),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Ranks"),s.a.createElement("th",null," "," "),s.a.createElement("th",null,"Misc. Mod."))),s.a.createElement("tbody",null,Object.entries(a).map((function(e,a){var n=Object(p.a)(e,2),l=n[0],c=n[1],o=T[l],u=o.baseAbility,d=o.isTrainedOnly;return s.a.createElement("tr",{key:a},s.a.createElement("td",null,s.a.createElement(ue,{checked:c.isClassSkill,onChange:function(){return t(l,!c.isClassSkill)}})),s.a.createElement("td",null,l,d?"*":""),s.a.createElement("td",null,c.totalBonus),s.a.createElement("td",null,"=",u),s.a.createElement("td",null,c.abilityModifier),s.a.createElement("td",null,"+"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:c.ranks,onChange:i(l)})),s.a.createElement("td",null,"+"),s.a.createElement("td",null,s.a.createElement("input",{type:"number",value:c.miscModifier,onChange:r(l)})))})),s.a.createElement("tr",{className:"legend"},s.a.createElement("td",null,s.a.createElement(ue,{checked:!0})),s.a.createElement("td",null,"Class Skill \xa0 \xa0 * Trained Only")))))})),Ee=function(){return s.a.createElement("div",null,s.a.createElement("img",{className:"pathfinder-logo",alt:"Pathfinder logo",src:"./pathfinderDE-logo.png"}),s.a.createElement(ne,null),s.a.createElement(re,null),s.a.createElement(me,null))},ye=function(){return s.a.createElement(d.a,{store:_},s.a.createElement(Ee,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(s.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[15,1,2]]]);
//# sourceMappingURL=main.5c87b4cc.chunk.js.map