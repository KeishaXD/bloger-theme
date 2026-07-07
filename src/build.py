"""
=========================================================
KeiScanlation
Build Script
=========================================================
"""

from pathlib import Path
from datetime import datetime

# =========================================================
# Config
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

CSS_DIR = BASE_DIR / "css"
JS_DIR = BASE_DIR / "js"

TEMPLATE = BASE_DIR / "template.xml"

OUTPUT_DIR = BASE_DIR.parent / "output"
OUTPUT_FILE = OUTPUT_DIR / "template.xml"

VERSION = "0.1.0"

CSS_FILES = [
    "root.css",
    "reset.css",
    "layout.css",
    "header.css",
    "footer.css",
    "components.css",
    "home.css",
    "post.css",
    "sidebar.css",
    "responsive.css"
]

JS_FILES = [
    "app.js",
    "darkmode.js",
    "menu.js",
    "reader.js"
]

# =========================================================
# Helpers
# =========================================================

def read_text(path: Path) -> str:
    """Read UTF-8 text file."""

    return path.read_text(
        encoding="utf-8"
    )


def merge_files(
    directory: Path,
    files: list[str],
    bundle_name: str
) -> str:
    """Merge files in order."""

    result = []

    result.append(
        "/* =========================================================\n"
        "   KeiScanlation Theme\n"
        f"   {bundle_name} Bundle\n"
        f"   Version   : {VERSION}\n"
        f"   Generated : {datetime.now():%Y-%m-%d %H:%M:%S}\n"
        "   ========================================================= */\n"
    )

    for filename in files:

        filepath = directory / filename

        if not filepath.exists():

            raise FileNotFoundError(
                f"Missing file:\n{filepath}"
            )

        print(f"  + {filename}")

        content = read_text(filepath)

        if not content.strip():

            print(
                f"    Warning: {filename} is empty."
            )

        result.append(
            "\n"
            "/* =========================================================\n"
            f"   {filename}\n"
            "   ========================================================= */\n\n"
            f"{content.strip()}\n"
        )

    return "\n".join(result)


# =========================================================
# Build
# =========================================================

def build():

    print("=" * 50)
    print(" KeiScanlation Builder")
    print("=" * 50)

    print("\nReading template...")

    if not TEMPLATE.exists():

        raise FileNotFoundError(
            f"Template not found:\n{TEMPLATE}"
        )

    template = read_text(TEMPLATE)

    print("\nReading CSS...")

    css = merge_files(
        CSS_DIR,
        CSS_FILES,
        "CSS"
    )

    print("\nReading JavaScript...")

    js = merge_files(
        JS_DIR,
        JS_FILES,
        "JavaScript"
    )

    print("\nReplacing placeholders...")

    if "{{KS_CSS}}" not in template:

        raise RuntimeError(
            "Placeholder {{KS_CSS}} not found."
        )

    if "{{KS_JS}}" not in template:

        raise RuntimeError(
            "Placeholder {{KS_JS}} not found."
        )

    template = template.replace(
        "{{KS_CSS}}",
        css
    )

    template = template.replace(
        "{{KS_JS}}",
        f"<script><![CDATA[\n{js}\n]]></script>"
    )

    print("\nCreating output...")

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    OUTPUT_FILE.write_text(
        template,
        encoding="utf-8"
    )

    size = OUTPUT_FILE.stat().st_size / 1024

    print("\nBuild completed successfully!")

    print(f"\nOutput  : {OUTPUT_FILE}")
    print(f"Version : {VERSION}")
    print(f"Size    : {size:.2f} KB")


# =========================================================
# Start
# =========================================================

if __name__ == "__main__":

    build()