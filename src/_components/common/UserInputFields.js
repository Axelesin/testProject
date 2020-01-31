import React from 'react';
import {DataPickers, SecurityQuestionInput, UploadButtons} from "./index";


export default function UserInputFields(props) {
    const {submitted, user, addPhoto, handleChange, addSecurityQuestion} = props;

    return (
        <React.Fragment>
            <div className={'form-group' + (submitted && !user.photo ? ' has-error' : '')}>
                <UploadButtons value={user.photo} onChange={addPhoto} name="photo"/>
                {submitted && !user.photo &&
                <div className="help-block">Photo is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={user.firstName}
                       onChange={handleChange}/>
                {submitted && !user.firstName &&
                <div className="help-block">First Name is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={user.lastName}
                       onChange={handleChange}/>
                {submitted && !user.lastName &&
                <div className="help-block">Last Name is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={user.username}
                       onChange={handleChange}/>
                {submitted && !user.username &&
                <div className="help-block">Username is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={user.password}
                       onChange={handleChange}/>
                {submitted && !user.password &&
                <div className="help-block">Password is required</div>
                }
            </div>

            <div className={'form-group' + (submitted && !user.phoneNumber ? ' has-error' : '')}>
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input type="number" className="form-control" name="phoneNumber" value={user.phoneNumber}
                       onChange={handleChange}/>
                {submitted && !user.phoneNumber &&
                <div className="help-block">Phone number is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.address ? ' has-error' : '')}>
                <label htmlFor="address">address</label>
                <input type="text" className="form-control" name="address" value={user.address}
                       onChange={handleChange}/>
                {submitted && !user.address &&
                <div className="help-block">Address is required</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                <label htmlFor="email">email</label>
                <input type="text" className="form-control" name="email" value={user.email}
                       onChange={handleChange}/>
                {submitted && !user.email &&
                <div className="help-block">E-mail is required</div>
                }
            </div>

            <div className={'form-group' + (submitted && !user.dateOfBirth ? ' has-error' : '')}>
                <DataPickers
                    value={user.dateOfBirth}
                    onChange={handleChange}
                    name="dateOfBirth"
                />
                {submitted && !user.dateOfBirth &&
                <div className="help-block">Date of birth is required</div>
                }
            </div>
            <fieldset>
                <legend>Security questions</legend>
                <SecurityQuestionInput
                    value={user.securityQuestions}
                    onChange={addSecurityQuestion}
                    submitted={submitted}
                    id={1}
                />
                <SecurityQuestionInput
                    value={user.securityQuestions}
                    onChange={addSecurityQuestion}
                    submitted={submitted}
                    id={2}
                    disabled={!user.securityQuestions[1].id}
                />
                <SecurityQuestionInput
                    value={user.securityQuestions}
                    onChange={addSecurityQuestion}
                    submitted={submitted}
                    id={3}
                    disabled={!user.securityQuestions[2].id}
                />
            </fieldset>
        </React.Fragment>
    );
}