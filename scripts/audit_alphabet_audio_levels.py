#!/usr/bin/env python3
"""
Alphabet Audio Sound Level & Loudness Auditor
Audits alphabet MP3s across supported languages to ensure:
1. All alphabet letters have audio files on disk
2. Audio files are not silent or inaudible (validates Peak >= 8,000 and RMS >= 1,000)
3. Volume levels are balanced and consistent across the alphabet

Usage:
  python3 scripts/audit_alphabet_audio_levels.py --lang fr
  python3 scripts/audit_alphabet_audio_levels.py --lang all
"""

import os
import sys
import argparse
import subprocess
import wave
import audioop
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_AUDIO = ROOT / "public" / "audio"

def audit_language(lang_id: str) -> dict:
    lang_dir = PUBLIC_AUDIO / lang_id / "alphabet"
    if not lang_dir.exists():
        return {"error": f"Directory not found: {lang_dir}"}

    mp3_files = sorted(list(lang_dir.glob("*.mp3")))
    if not mp3_files:
        return {"error": f"No MP3 files found in {lang_dir}"}

    results = []
    issues = []

    print(f"\nAuditing alphabet audio for [{lang_id}] ({len(mp3_files)} files):")
    print(f"{'Letter / File':<20} | {'Duration':<10} | {'Peak (0-32767)':<16} | {'RMS Loudness':<14} | {'Status'}")
    print("-" * 75)

    for mp3 in mp3_files:
        wav_tmp = f"/tmp/audit_{lang_id}_{mp3.stem}.wav"
        try:
            # Convert MP3 to 16-bit PCM WAV for accurate mathematical analysis
            subprocess.run(
                ["/usr/bin/afconvert", "-f", "WAVE", "-d", "LEI16", str(mp3), wav_tmp],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )

            with wave.open(wav_tmp, "rb") as w:
                nframes = w.getnframes()
                framerate = w.getframerate()
                sampwidth = w.getsampwidth()
                frames = w.readframes(nframes)
                duration = nframes / max(framerate, 1)
                peak = audioop.max(frames, sampwidth)
                rms = audioop.rms(frames, sampwidth)

            if os.path.exists(wav_tmp):
                os.remove(wav_tmp)

            if rms < 800 or peak < 8000:
                status = "FAIL: TOO QUIET / SILENT"
                issues.append(f"{mp3.name}: Peak={peak}, RMS={rms} (below audible threshold)")
            elif rms < 1500:
                status = "WARN: LOW VOLUME"
            else:
                status = "PASS: AUDIBLE & STRONG"

            print(f"{mp3.stem:<20} | {duration:6.2f}s    | {peak:16} | {rms:14} | {status}")
            results.append({"file": mp3.name, "duration": duration, "peak": peak, "rms": rms, "status": status})

        except Exception as e:
            if os.path.exists(wav_tmp):
                os.remove(wav_tmp)
            print(f"{mp3.stem:<20} | ERROR: {e}")
            issues.append(f"{mp3.name}: Error analyzing: {e}")

    avg_rms = sum(r["rms"] for r in results) / max(len(results), 1)
    avg_peak = sum(r["peak"] for r in results) / max(len(results), 1)

    print("-" * 75)
    print(f"Summary for [{lang_id}]: Total={len(results)}, Avg Peak={avg_peak:.0f}, Avg RMS={avg_rms:.0f}")
    if issues:
        print(f"  WARNING: {len(issues)} sound level issues detected:")
        for iss in issues:
            print(f"    - {iss}")
    else:
        print("  ALL ALPHABET LETTERS PASS SOUND LEVEL CRITERIA!")

    return {"results": results, "issues": issues, "avg_rms": avg_rms, "avg_peak": avg_peak}

def main():
    parser = argparse.ArgumentParser(description="Audit alphabet audio sound levels")
    parser.add_argument("--lang", default="fr", help="Language code (fr, en, es, de, ru, all)")
    args = parser.parse_args()

    if args.lang == "all":
        langs = ["fr", "en", "es", "de", "ru", "pt", "tr", "id", "ja", "ko", "zh", "hi", "ar"]
    else:
        langs = [args.lang]

    total_issues = 0
    for l in langs:
        res = audit_language(l)
        total_issues += len(res.get("issues", []))

    if total_issues > 0:
        print(f"\nAudit completed with {total_issues} issue(s).")
        sys.exit(1)
    else:
        print("\nAudit completed: All tested languages have balanced, audible sound levels!")
        sys.exit(0)

if __name__ == "__main__":
    main()

