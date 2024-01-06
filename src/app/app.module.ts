import { NgModule, SecurityContext } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { EditorComponent } from "./editor/editor.component";
import { FormsModule } from "@angular/forms";
import { MARKED_OPTIONS, MarkdownModule } from "ngx-markdown";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
  ],
  declarations: [AppComponent, EditorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
