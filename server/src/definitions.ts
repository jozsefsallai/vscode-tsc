const definitions = [
  {
    key: '<AE+',
    label: '<AE+',
    detail: 'Arms Energy +',
    documentation: 'Refill all weapon ammo.',
    format: '<AE+',
    insertText: 'AE+',
    nargs: 0
  },
  {
    key: '<AM+',
    label: '<AM+',
    detail: 'ArMs +',
    documentation: 'Give weapon W (if not already acquired), and add X ammo. Use 0000 for infinite ammo.',
    format: '<AM+WWWW:XXXX',
    insertText: 'AM+${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "weapon", "number" ]
  },
  {
    key: '<AM-',
    label: '<AM-',
    detail: 'ArMs -',
    documentation: 'Remove weapon W.',
    format: '<AM-WWWW',
    insertText: 'AM-${1:0000}',
    nargs: 1,
    argtype: [ "weapon" ]
  },
  {
    key: '<AMJ',
    label: '<AMJ',
    detail: 'ArMs Jump',
    documentation: 'Jump to event X if the PC has weapon W.',
    format: '<AMJWWWW:XXXX',
    insertText: 'AMJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "weapon" ]
  },
  {
    key: '<ANP',
    label: '<ANP',
    detail: 'Animate NPc',
    documentation: 'Give all entities W scriptstate X and direction Y. Used for animation.',
    format: '<ANPWWWW:XXXX:YYYY',
    insertText: 'ANP${1:0000}:${2:0000}:${3:0000}',
    nargs: 3,
    argtype: [ "number", "number", "direction" ]
  },
  {
    key: '<BOA',
    label: '<BOA',
    detail: 'BOss Animate',
    documentation: 'Give map-boss (eg Omega) scriptstate W',
    format: '<BOAWWWW',
    insertText: 'BOA${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<BSL',
    label: '<BSL',
    detail: 'Boss Script Load',
    documentation: 'Start boss fight with entity W. Use 0000 to end the boss fight. (NPC flag 0200 must be set; should work with anything that has HP)',
    format: '<BSLWWWW',
    insertText: 'BSL${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<CAT',
    label: '<CAT',
    detail: '(C?) All Text',
    documentation: 'Instantly display text. Use before a <MSG/2/3; works until <END. Same command as <SAT.',
    format: '<CAT',
    insertText: 'CAT',
    nargs: 0
  },
  {
    key: '<CIL',
    label: '<CIL',
    detail: 'Clear ILlustration',
    documentation: 'Clear illustration (during credits).',
    format: '<CIL',
    insertText: 'CIL',
    nargs: 0
  },
  {
    key: '<CLO',
    label: '<CLO',
    detail: 'CLOse',
    documentation: 'Close message box.',
    format: '<CLO',
    insertText: 'CLO',
    nargs: 0
  },
  {
    key: '<CLR',
    label: '<CLR',
    detail: 'CLeaR',
    documentation: 'Clear message box.',
    format: '<CLR',
    insertText: 'CLR',
    nargs: 0
  },
  {
    key: '<CMP',
    label: '<CMP',
    detail: 'Change MaP tile',
    documentation: 'Change the tile at coordinates W:X to type Y. Produces smoke.',
    format: '<CMPWWWW:XXXX:YYYY',
    insertText: 'CMP${1:0000}:${2:0000}:${3:0000}',
    nargs: 3,
    argtype: [ "number", "number", "number" ]
  },
  {
    key: '<CMU',
    label: '<CMU',
    detail: 'Change MUsic',
    documentation: 'Change music to song W.',
    format: '<CMUWWWW',
    insertText: 'CMU${1:0000}',
    nargs: 1,
    argtype: [ "song" ]
  },
  {
    key: '<CNP',
    label: '<CNP',
    detail: 'Change NPc',
    documentation: 'Change all entities W to type X with direction Y.',
    format: '<CNPWWWW:XXXX:YYYY',
    insertText: 'CNP${1:0000}:${2:0000}:${3:0000}',
    nargs: 3,
    argtype: [ "number", "number", "direction" ]
  },
  {
    key: '<CPS',
    label: '<CPS',
    detail: 'Clear Prop. Sound',
    documentation: 'Stops the propeller sound.',
    format: '<CPS',
    insertText: 'CPS',
    nargs: 0
  },
  {
    key: '<CRE',
    label: '<CRE',
    detail: 'CREdits',
    documentation: 'Rolls credits.',
    format: '<CRE',
    insertText: 'CRE',
    nargs: 0
  },
  {
    key: '<CSS',
    label: '<CSS',
    detail: 'Clear Stream Sound',
    documentation: 'Stops the stream sound.',
    format: '<CSS',
    insertText: 'CSS',
    nargs: 0
  },
  {
    key: '<DNA',
    label: '<DNA',
    detail: 'Delete Npc All',
    documentation: 'Remove all entities of type W.',
    format: '<DNAWWWW',
    insertText: 'DNA${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<DNP',
    label: '<DNP',
    detail: 'Delete NPc',
    documentation: 'Remove all entities W.',
    format: '<DNPWWWW',
    insertText: 'DNP${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<ECJ',
    label: '<ECJ',
    detail: 'Event Check Jump',
    documentation: 'Jump to event X if any entities W exist.',
    format: '<ECJWWWW:XXXX',
    insertText: 'ECJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<END',
    label: '<END',
    detail: 'END',
    documentation: 'End the current scripted event.',
    format: '<END',
    insertText: 'END',
    nargs: 0
  },
  {
    key: '<EQ+',
    label: '<EQ+',
    detail: 'EQuip +',
    documentation: 'Equip item W.',
    format: '<EQ+WWWW',
    insertText: 'EQ+${1:0000}',
    nargs: 1,
    argtype: [ "equippable" ]
  },
  {
    key: '<EQ-',
    label: '<EQ-',
    detail: 'EQuip -',
    documentation: 'Dequip item W.',
    format: '<EQ-WWWW',
    insertText: 'EQ-${1:0000}',
    nargs: 1,
    argtype: [ "equippable" ]
  },
  {
    key: '<ESC',
    label: '<ESC',
    detail: 'ESCape',
    documentation: 'Quit to title screen.',
    format: '<ESC',
    insertText: 'ESC',
    nargs: 0
  },
  {
    key: '<EVE',
    label: '<EVE',
    detail: 'EVEnt',
    documentation: 'Go to event W.',
    format: '<EVEWWWW',
    insertText: 'EVE${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<FAC',
    label: '<FAC',
    detail: 'FACe',
    documentation: 'Show face W in the message box.',
    format: '<FACWWWW',
    insertText: 'FAC${1:0000}',
    nargs: 1,
    argtype: [ "face" ]
  },
  {
    key: '<FAI',
    label: '<FAI',
    detail: 'FAde In',
    documentation: 'Fade in with direction W.',
    format: '<FAIWWWW',
    insertText: 'FAI${1:0000}',
    nargs: 1,
    argtype: [ "direction" ]
  },
  {
    key: '<FAO',
    label: '<FAO',
    detail: 'FAde Out',
    documentation: 'Fade out with direction W.',
    format: '<FAOWWWW',
    insertText: 'FAO${1:0000}',
    nargs: 1,
    argtype: [ "direction" ]
  },
  {
    key: '<FL+',
    label: '<FL+',
    detail: 'FLag +',
    documentation: 'Set flag W. Using flags over 8000 is inadvisable.',
    format: '<FL+WWWW',
    insertText: 'FL+${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<FL-',
    label: '<FL-',
    detail: 'FLag -',
    documentation: 'Clear flag W.',
    format: '<FL-WWWW',
    insertText: 'FL-${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<FLA',
    label: '<FLA',
    detail: 'FLAsh',
    documentation: 'Flash the screen white.',
    format: '<FLA',
    insertText: 'FLA',
    nargs: 0
  },
  {
    key: '<FLJ',
    label: '<FLJ',
    detail: 'FLag Jump',
    documentation: 'Jump to event X if flag W is set.',
    format: '<FLJWWWW:XXXX',
    insertText: 'FLJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<FMU',
    label: '<FMU',
    detail: 'Fade MUsic',
    documentation: 'Fade the music out.',
    format: '<FMU',
    insertText: 'FMU',
    nargs: 0
  },
  {
    key: '<FOB',
    label: '<FOB',
    detail: 'Focus On Boss',
    documentation: 'Focus on boss W in X ticks. Use X > 0.',
    format: '<FOBXXXX:YYYY',
    insertText: 'FOB${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<FOM',
    label: '<FOM',
    detail: 'Focus On Me',
    documentation: 'Focus on the PC in W ticks. Use W > 0.',
    format: '<FOMXXXX',
    insertText: 'FOM${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<FON',
    label: '<FON',
    detail: 'Focus On Npc',
    documentation: 'Focus on entity W in X ticks. Use X > 0.',
    format: '<FONWWWW:XXXX',
    insertText: 'FON${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<FRE',
    label: '<FRE',
    detail: 'FREe',
    documentation: 'Free game action and the PC.',
    format: '<FRE',
    insertText: 'FRE',
    nargs: 0
  },
  {
    key: '<GIT',
    label: '<GIT',
    detail: 'Graphic ITem',
    documentation: 'Display an item or weapon icon above the message box. Add 1000 to W for items. Use 0000 to remove.',
    format: '<GITWWWW',
    insertText: 'GIT${1:0000}',
    nargs: 1,
    argtype: [ "item" ]
  },
  {
    key: '<HMC',
    label: '<HMC',
    detail: 'Hide My Character',
    documentation: 'Hide the PC.',
    format: '<HMC',
    insertText: 'HMC',
    nargs: 0
  },
  {
    key: '<INI',
    label: '<INI',
    detail: 'INItialize',
    documentation: 'Reset memory and restart game.',
    format: '<INI',
    insertText: 'INI',
    nargs: 0
  },
  {
    key: '<INP',
    label: '<INP',
    detail: '[Initialize?] NPc',
    documentation: 'Change entity W to type X with direction Y and set entity flag 100 (0x8000).',
    format: '<INPWWWW:XXXX:YYYY',
    insertText: 'INP${1:0000}:${2:0000}:${3:0000}',
    nargs: 3,
    argtype: [ "number", "number", "direction" ]
  },
  {
    key: '<IT+',
    label: '<IT+',
    detail: 'ITem +',
    documentation: 'Give item W.',
    format: '<IT+XXXX',
    insertText: 'IT+${1:0000}',
    nargs: 1,
    argtype: [ "item" ]
  },
  {
    key: '<IT-',
    label: '<IT-',
    detail: 'ITem -',
    documentation: 'Remove item W.',
    format: '<IT-XXXX',
    insertText: 'IT-${1:0000}',
    nargs: 1,
    argtype: [ "item" ]
  },
  {
    key: '<ITJ',
    label: '<ITJ',
    detail: 'ITem Jump',
    documentation: 'Jump to event X if the PC has item W.',
    format: '<ITJWWWW:XXXX',
    insertText: 'ITJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "item", "number" ]
  },
  {
    key: '<KEY',
    label: '<KEY',
    detail: 'KEY lock',
    documentation: 'Lock player controls and hide status bars until <END.',
    format: '<KEY',
    insertText: 'KEY',
    nargs: 0
  },
  {
    key: '<LDP',
    label: '<LDP',
    detail: 'LoaD Profile',
    documentation: 'Load the saved game.',
    format: '<LDP',
    insertText: 'LDP',
    nargs: 0
  },
  {
    key: '<LI+',
    label: '<LI+',
    detail: 'LIfe +',
    documentation: 'Recover W health.',
    format: '<LI+XXXX',
    insertText: 'LI+${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<ML+',
    label: '<ML+',
    detail: 'Max Life +',
    documentation: 'Increase the current and maximum health by W.',
    format: '<ML+XXXX',
    insertText: 'ML+${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<MLP',
    label: '<MLP',
    detail: 'Map/Location Picture',
    documentation: 'Display a map of the current area.',
    format: '<MLP',
    insertText: 'MLP',
    nargs: 0
  },
  {
    key: '<MM0',
    label: '<MM0',
    detail: 'My Motion 0',
    documentation: 'Halt the PC\'s forward motion.',
    format: '<MM0',
    insertText: 'MM0',
    nargs: 0
  },
  {
    key: '<MNA',
    label: '<MNA',
    detail: 'Map NAme',
    documentation: 'Display name of current map.',
    format: '<MNA',
    insertText: 'MNA',
    nargs: 0
  },
  {
    key: '<MNP',
    label: '<MNP',
    detail: 'Move NPc',
    documentation: 'Move entity W to coordinates X:Y with direction Z.',
    format: '<MNPWWWW:XXXX:YYYY:ZZZZ',
    insertText: 'MNP${1:0000}:${2:0000}:${3:0000}:${4:0000}',
    nargs: 4,
    argtype: [ "number", "number", "number", "direction" ]
  },
  {
    key: '<MOV',
    label: '<MOV',
    detail: 'MOVe',
    documentation: 'Move the PC to coordinates W:X.',
    format: '<MOVWWWW:XXXX',
    insertText: 'MOV${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<MP+',
    label: '<MP+',
    detail: 'MaP flag +',
    documentation: 'Set map flag W. Map flags cannot be unset. Highest usable flag is 127.',
    format: '<MP+WWWW',
    insertText: 'MP+${1:0000}',
    nargs: 1,
    argtype: ["number"]
  },
  {
    key: '<MPJ',
    label: '<MPJ',
    detail: 'MaP flag Jump',
    documentation: 'Jump to event W if the map flag for the current area is set.',
    format: '<MPJXXXX',
    insertText: 'MPJ${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<MS2',
    label: '<MS2',
    detail: 'MeSsage 2',
    documentation: 'Open an invisible message box at the top of screen.',
    format: '<MS2',
    insertText: 'MS2',
    nargs: 0
  },
  {
    key: '<MS3',
    label: '<MS3',
    detail: 'MeSsage 3',
    documentation: 'Open a message box at the top of screen.',
    format: '<MS3',
    insertText: 'MS3',
    nargs: 0
  },
  {
    key: '<MSG',
    label: '<MSG',
    detail: 'MeSsaGe 1',
    documentation: 'Open a message box at the bottom of the screen.',
    format: '<MSG',
    insertText: 'MSG',
    nargs: 0
  },
  {
    key: '<MYB',
    label: '<MYB',
    detail: 'MY Bump',
    documentation: 'Causes the PC to hop in the direction opposite of W. Using up or down causes the jump to be vertical.',
    format: '<MYBWWWW',
    insertText: 'MYB${1:0000}',
    nargs: 1,
    argtype: [ "direction" ]
  },
  {
    key: '<MYD',
    label: '<MYD',
    detail: 'MY Direction',
    documentation: 'Causes the PC to face direction W.',
    format: '<MYDWWWW',
    insertText: 'MYD${1:0000}',
    nargs: 1,
    argtype: [ "direction" ]
  },
  {
    key: '<NCJ',
    label: '<NCJ',
    detail: 'Npc Check Jump',
    documentation: 'Jump to event X if any entity of type W exists.',
    format: '<NCJWWWW:XXXX',
    insertText: 'NCJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<NOD',
    label: '<NOD',
    detail: '[Newline On Demand?]',
    documentation: 'Wait for player input before resuming script.',
    format: '<NOD',
    insertText: 'NOD',
    nargs: 0
  },
  {
    key: '<NUM',
    label: '<NUM',
    detail: 'NUMber',
    documentation: 'Prints the value [4a5b34+W*4] to the message box. Use 0000 to print the last used W from compatible commands (eg AM+).',
    format: '<NUMWWWW',
    insertText: 'NUM${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<PRI',
    label: '<PRI',
    detail: 'PRevent Interaction',
    documentation: 'Lock player controls and freeze game action until KEY or END.',
    format: '<PRI',
    insertText: 'PRI',
    nargs: 0
  },
  {
    key: '<PS+',
    label: '<PS+',
    detail: 'Portal Slot +',
    documentation: 'Set teleporter slot W to event X. Selecting slot W while using the teleporter menu will jump to event X.',
    format: '<PS+WWWW:XXXX',
    insertText: 'PS+${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<QUA',
    label: '<QUA',
    detail: 'QUAke',
    documentation: 'Shake the screen for W ticks.',
    format: '<QUAWWWW',
    insertText: 'QUA${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<RMU',
    label: '<RMU',
    detail: 'Resume MUsic',
    documentation: 'Resume the song last played.',
    format: '<RMU',
    insertText: 'RMU',
    nargs: 0
  },
  {
    key: '<SAT',
    label: '<SAT',
    detail: 'Speed-up All Text',
    documentation: 'Instantly display text. Use before a <MSG/2/3; works until <END. Same command as <CAT. (glitches scrolling text)',
    format: '<SAT',
    insertText: 'SAT',
    nargs: 0
  },
  {
    key: '<SIL',
    label: '<SIL',
    detail: 'Show ILlustration',
    documentation: 'Show illustration W (during credits).',
    format: '<SILWWWW',
    insertText: 'SIL${1:0000}',
    nargs: 1,
    argtype: [ "illustration" ]
  },
  {
    key: '<SK+',
    label: '<SK+',
    detail: 'SKipflag +',
    documentation: 'Set skipflag W. (remains set until program exits, to avoid repeating cutscenes/dialogue after retrying)',
    format: '<SK+WWWW',
    insertText: 'SK+${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<SK-',
    label: '<SK-',
    detail: 'SKipflag -',
    documentation: 'Clear skipflag W.',
    format: '<SK-WWWW',
    insertText: 'SK-${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<SKJ',
    label: '<SKJ',
    detail: 'SKipflag Jump',
    documentation: 'Jump to event Y if skipflag X is set',
    format: '<SKJWWWW:XXXX',
    insertText: 'SKJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<SLP',
    label: '<SLP',
    detail: 'Show Location Portals',
    documentation: 'Show the teleporter menu.',
    format: '<SLP',
    insertText: 'SLP',
    nargs: 0
  },
  {
    key: '<SMC',
    label: '<SMC',
    detail: 'Show My Character',
    documentation: 'Unhides the PC.',
    format: '<SMC',
    insertText: 'SMC',
    nargs: 0
  },
  {
    key: '<SMP',
    label: '<SMP',
    detail: 'Shift MaP tile',
    documentation: 'Jump to event X if skipflag W is set. Does not create smoke.',
    format: '<SMPWWWW:XXXX',
    insertText: 'SMP${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<SNP',
    label: '<SNP',
    detail: 'Set NPc',
    documentation: 'Create an entity of type W at coordinates X:Y with direction Z.',
    format: '<SNPWWWW:XXXX:YYYY:ZZZZ',
    insertText: 'SNP${1:0000}:${2:0000}:${3:0000}:${4:0000}',
    nargs: 4,
    argtype: [ "number", "number", "number", "direction" ]
  },
  {
    key: '<SOU',
    label: '<SOU',
    detail: 'SOUnd',
    documentation: 'Play sound effect W.',
    format: '<SOUWWWW',
    insertText: 'SOU${1:0000}',
    nargs: 1,
    argtype: [ "sfx" ]
  },
  {
    key: '<SPS',
    label: '<SPS',
    detail: 'Start Prop. Sound',
    documentation: 'Start the propeller sound.',
    format: '<SPS',
    insertText: 'SPS',
    nargs: 0
  },
  {
    key: '<SSS',
    label: '<SSS',
    detail: 'Start Stream Sound',
    documentation: 'Start the stream sound with volume W. (from River area - normal pitch is 0400)',
    format: '<SSSWWWW',
    insertText: 'SSS${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<STC',
    label: '<STC',
    detail: 'Save Time Counter',
    documentation: 'Saves current time to 290.rec.',
    format: '<STC',
    insertText: 'STC',
    nargs: 0
  },
  {
    key: '<SVP',
    label: '<SVP',
    detail: 'SaVe Profile',
    documentation: 'Saves current game.',
    format: '<SVP',
    insertText: 'SVP',
    nargs: 0
  },
  {
    key: '<TAM',
    label: '<TAM',
    detail: 'Trade ArMs',
    documentation: 'Trade weapon W for weapon X and set max ammo to Y. Use 0000 to keep the same amount of ammo. (GLITCH: first weapon 0000)',
    format: '<TAMWWWW:XXXX:YYYY',
    insertText: 'TAM${1:0000}:${2:0000}:${3:0000}',
    nargs: 3,
    argtype: [ "weapon", "weapon", "number" ]
  },
  {
    key: '<TRA',
    label: '<TRA',
    detail: 'TRAnsport',
    documentation: 'Travel to map W, run event X, and move the PC to coordinates Y:Z.',
    format: '<TRAWWWW:XXXX:YYYY:ZZZZ',
    insertText: 'TRA${1:0000}:${2:0000}:${3:0000}:${4:0000}',
    nargs: 4,
    argtype: [ "map", "number", "number", "number" ]
  },
  {
    key: '<TUR',
    label: '<TUR',
    detail: '[Text UnRead?]',
    documentation: 'Instantly display text. Use after a <MSG/2/3; works until another <MSG/2/3 or an <END.',
    format: '<TUR',
    insertText: 'TUR',
    nargs: 0
  },
  {
    key: '<UNI',
    label: '<UNI',
    detail: 'UNIverse',
    documentation: 'Set character movement type. Use 0000 for normal, 0001 for zero-G (disables focus commands) and 0002 to disallow movement (can still fire).',
    format: '<UNIXXXX',
    insertText: 'UNI${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<UNJ',
    label: '<UNJ',
    detail: 'UNiverse Jump',
    documentation: 'Jump to event X if movement is of type W (0000 for normal, 0001 for zero-G).',
    format: '<UNJWWWW:XXXX',
    insertText: 'UNJ${1:0000}:${2:0000}',
    nargs: 2,
    argtype: [ "number", "number" ]
  },
  {
    key: '<WAI',
    label: '<WAI',
    detail: 'WAIt',
    documentation: 'Pause script for W ticks.',
    format: '<WAIWWWW',
    insertText: 'WAI${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<WAS',
    label: '<WAS',
    detail: 'WAit until Standing',
    documentation: 'Pause script until character is on ground.',
    format: '<WAS',
    insertText: 'WAS',
    nargs: 0
  },
  {
    key: '<XX1',
    label: '<XX1',
    detail: 'XX1',
    documentation: 'Show the island falling in manner W. Use 0000 to have it crash and 0001 to have it stop midway.',
    format: '<XX1WWWW',
    insertText: 'XX1${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<YNJ',
    label: '<YNJ',
    detail: 'Yes/No Jump',
    documentation: 'Prompt Yes/No; jump to event W if No is selected.',
    format: '<YNJWWWW',
    insertText: 'YNJ${1:0000}',
    nargs: 1,
    argtype: [ "number" ]
  },
  {
    key: '<ZAM',
    label: '<ZAM',
    detail: 'Zero ArMs',
    documentation: 'Sets all weapon energy to zero.',
    format: '<ZAM',
    insertText: 'ZAM',
    nargs: 0
  }
];

export default definitions;
