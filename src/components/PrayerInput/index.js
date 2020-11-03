import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';

export default class PrayerInput extends Component {
  mentionPlugin = createMentionPlugin();

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: [],
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onAddMention = (mentionEntry) => {
    // get the mention object selected
    console.log('mentionEntry', mentionEntry)
  }

  onSearchChange = ({ value }) => {
    // while you normally would have a dynamic server that takes the value as
    // a workaround we use this workaround to show different results
    const chaptersOfTheBible = [
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Matthew',
      },
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Luke',
      },
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Leveticus',
      },
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Lamentation',
      },
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Mark',
      },
      {
        link: 'https://prayerkeep.com/prayers',
        name: 'Joshua',
      },
    ]

    this.setState({
      suggestions: defaultSuggestionsFilter(value, chaptersOfTheBible),
    });

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('gotten data', data)
    //     this.setState({
    //       suggestions: defaultSuggestionsFilter(value, data),
    //     });
    //   });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className="editor" onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
          mentionTrigger="#"
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}