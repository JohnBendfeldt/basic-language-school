#!/usr/bin/env python3
"""
Automated Multi-Language Curriculum Expander:
1. Expands every language's commonWords to 515+ words.
2. Updates EXTENDED_DICTIONARY in translationResolver.ts with full 10-language translations (including Korean and Japanese).
3. Adds high-frequency conversational phrases & dialogues for Russian, Spanish, and French so they join English in having > 1,000 recorded audio files.
"""

import os
import re
import json
from pathlib import Path

ROOT = Path('/Users/johnbendfeldt/Documents/basic-language-school')
DATA_DIR = ROOT / 'src' / 'data' / 'languages'

print("Script template ready.")

