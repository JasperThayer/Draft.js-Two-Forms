import React, { Component } from 'react';
import {Grid, Row, Col, FormGroup, InputGroup} from 'react-bootstrap';
import {convertToRaw} from 'draft-js';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import  'draft-js-static-toolbar-plugin/lib/plugin.css';
import  'draft-js-linkify-plugin/lib/plugin.css';

export default class extends Component {
  constructor(props) {
    super(props);
    const formOneToolbarPlugin = createToolbarPlugin();
    const formTwoToolbarPlugin = createToolbarPlugin();
    this.PluginComponents = {
      FormOneToolbar: formOneToolbarPlugin.Toolbar,
      FormTwoToolbar: formTwoToolbarPlugin.Toolbar
    };
    const linkifyPlugin = createLinkifyPlugin();
    this.formOnePlugins = [formOneToolbarPlugin, linkifyPlugin];
    this.formTwoPlugins = [formTwoToolbarPlugin, linkifyPlugin];
    this.state = {
      formOneState: createEditorStateWithText(''),
      formTwoState: createEditorStateWithText(''),
    };
  }

  async componentDidMount(){document.title ="Two Draft.js Forms";}

  formOneFocus = () => {this.formOne.focus();};
  formTwoFocus = () => {this.formTwo.focus();};
  changeFormOne = (editorState) => {this.setState({formOneState: editorState});};
  changeFormTwo = (editorState) => {this.setState({formTwoState: editorState});};

  // in form submit handler send the draft.js value stringified using convertToRaw as the following value...
  /*{
    body: {
      formOneValue: JSON.stringify(convertToRaw(this.state.formOneState.getCurrentContent()))
      formTwoValue: JSON.stringify(convertToRaw(this.state.formTwoState.getCurrentContent()))
    }
  }*/

  render() {

    const FormOneToolbar = this.PluginComponents.FormOneToolbar;
    const FormTwoToolbar = this.PluginComponents.FormTwoToolbar;

    return (
      <Grid className="page">
        <Row className="show-grid">

          <Col xs={12}>
            <h4>Draft.js Form #1</h4>
            {/* Draft.js Form #1 */}
            <FormGroup bsSize="small" style={{marginBottom:5}}>
              <InputGroup>
                <InputGroup.Addon><i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/></InputGroup.Addon>
                <div style={{height:'auto'}} className="form-control">
                  <div onClick={this.formOneFocus}>
                    <FormOneToolbar>
                      {
                        externalProps => (
                          <span>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <CodeButton {...externalProps} />
                            <Separator {...externalProps} />
                            <UnorderedListButton {...externalProps} />
                            <OrderedListButton {...externalProps} />
                            <BlockquoteButton {...externalProps} />
                            <CodeBlockButton {...externalProps} />
                          </span>
                        )
                      }
                    </FormOneToolbar>
                    <Editor
                      plugins={this.formOnePlugins}
                      editorState={this.state.formOneState}
                      onChange={this.changeFormOne}
                      ref={(element) => { this.formOne = element; }}
                      spellCheck={true}
                    />
                  </div>
                </div>
              </InputGroup>
            </FormGroup>
          </Col>

          <Col xs={12} style={{marginTop:30, marginBottom:20}}>
            <hr />
          </Col>

          <Col xs={12}>
            <h4>Draft.js Form #2</h4>
            {/* Draft.js Form #2 */}
            <FormGroup bsSize="small" style={{marginBottom:5}}>
              <InputGroup>
                <InputGroup.Addon><i className="fa fa-pencil-square-o fa-fw" aria-hidden="true"/></InputGroup.Addon>
                <div style={{height:'auto'}} className="form-control">
                  <div onClick={this.formTwoFocus}>
                    <FormTwoToolbar>
                      {
                        externalProps => (
                          <span>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <CodeButton {...externalProps} />
                            <Separator {...externalProps} />
                            <UnorderedListButton {...externalProps} />
                            <OrderedListButton {...externalProps} />
                            <BlockquoteButton {...externalProps} />
                            <CodeBlockButton {...externalProps} />
                          </span>
                        )
                      }
                    </FormTwoToolbar>
                    <Editor
                      plugins={this.formTwoPlugins}
                      editorState={this.state.formTwoState}
                      onChange={this.changeFormTwo}
                      ref={(element) => { this.formTwo = element; }}
                      spellCheck={true}
                    />
                  </div>
                </div>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}