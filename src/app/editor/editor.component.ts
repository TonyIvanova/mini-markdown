import { Component, ElementRef, HostListener } from "@angular/core";
import { MarkdownService } from "ngx-markdown";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent {
  protected isEditing = false;
  protected markdown: string =
    "# Mini Markdown \n Use \n - ```ctrl+s``` to save \n - ```ctrl+e``` to edit. \n - ```ctrl+d``` to checkout tasks \n - [ ] Create todo \n - [ ] Checkout todos";

  constructor(
    private markdownService: MarkdownService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.initMarkdownRenderer();
  }

  protected onReady() {
    this.addEventListeners();
  }

  private initMarkdownRenderer() {
    this.markdownService.renderer.listitem = (text: string) => {
      if (/<input.+type="checkbox"/.test(text)) {
        return (
          '<li style="list-style: none;" >' +
          text.replace("disabled", "class='todo'") +
          "</li>"
        );
      } else {
        return "<li>" + text + "</li>";
      }
    };
  }

  private addEventListeners() {
    const todos = this.elementRef.nativeElement.querySelectorAll(".todo");
    todos.forEach((todo: any) => {
      todo.addEventListener("click", (event: any) => this.onClick(event));
    });
  }

  private onClick(event: any) {
    const todoText = event.srcElement.nextSibling.nodeValue;
    if (this.markdown.includes("- [ ]" + todoText)) {
      this.markdown = this.markdown.replace(
        "- [ ]" + todoText,
        "- [x]" + todoText
      );
    } else {
      this.markdown = this.markdown.replace(
        "- [x]" + todoText,
        "- [ ]" + todoText
      );
    }
  }

  @HostListener("window:keydown.control.e", ["$event"])
  edit(event: KeyboardEvent) {
    event.preventDefault();
    this.isEditing = true;
  }

  @HostListener("window:keydown.control.s", ["$event"])
  save(event: KeyboardEvent) {
    event.preventDefault();
    this.isEditing = false;
  }

  @HostListener("window:keydown.control.d", ["$event"])
  done(event: KeyboardEvent) {
    event.preventDefault();
    this.markdown = this.markdown.replace("- [ ]", "- [x]");
  }
}
